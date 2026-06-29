import { View, Text, Image, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect, useRef } from "react";

const logo = require("../assets/bikeLOGO.png");

import styles from "./homeStyles";
import Droplist from "../components/droplist";
import ButtonMonitoring from "../components/buttonMonitoring";

const POLLING_INTERVAL_MS   = 1000;
const DELAY_ALERTA_ROUBO_MS = 3000;
const DISCOVERY_TIMEOUT_MS  = 30000;

const DEBUG_IP = null; // ex: "http://192.168.0.101" ip da minha casa em cps

// definição da area de busca do arduino

const SUBNETS    = ["192.168.0", "192.168.1", "192.168.43", "192.168.4", "10.0.0"];
const IP_RANGE   = Array.from({ length: 254 }, (_, i) => i + 1); 
const BATCH_SIZE = 10;    // limitando requisições, IOS aguenta no máximo 10
const TIMEOUT_MS = 1500;  // timeout por host

// testa um ip e ve se acha o arduino

async function testarIP(base) {
  try {
    const res = await Promise.race([
      fetch(`${base}/ping`),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS)
      ),
    ]);
    const data = await res.json();
    if (data.device === "bicicletario") return base;
  } catch {
    //ip incorreto ou sem retorno ignora
  }
  return null;
}

async function descobrirESP32() {
  if (DEBUG_IP) return DEBUG_IP;

  const candidatos = SUBNETS.flatMap((sub) =>
    IP_RANGE.map((n) => `http://${sub}.${n}`)
  );

  // varre os ip de 10 em 10 para n atingir o limite de requisição do IOS

  for (let i = 0; i < candidatos.length; i += BATCH_SIZE) {
    const lote       = candidatos.slice(i, i + BATCH_SIZE);
    const resultados = await Promise.all(lote.map(testarIP));
    const encontrado = resultados.find((r) => r !== null);
    if (encontrado) return encontrado;
  }

  return null;
}

export default function home() {
  const [selected, setSelected]         = useState(null);
  const [monitorando, setMonitorando]   = useState(false);
  const [statusSensor, setStatusSensor] = useState(null);
  const [esp32Url, setEsp32Url]         = useState(null);
  const [buscando, setBuscando]         = useState(false);

  const ausenciaTimerRef = useRef(null);
  const pollingRef       = useRef(null);
  const esp32UrlRef      = useRef(null);
  const alertaDisparadoRef = useRef(false); 

  useEffect(() => { esp32UrlRef.current = esp32Url; }, [esp32Url]);

  useEffect(() => {
    buscarESP32();
  }, []);

  async function buscarESP32() {
    setBuscando(true);
    setEsp32Url(null);

    const discovery = descobrirESP32();
    const timeout   = new Promise((_, r) =>
      setTimeout(() => r(new Error("timeout geral")), DISCOVERY_TIMEOUT_MS)
    );

    try {
      const url = await Promise.race([discovery, timeout]);
      if (url) {
        setEsp32Url(url);
        console.log("ESP32 encontrado em:", url);
      } else {
        throw new Error("não encontrado");
      }
    } catch {
      Alert.alert(
        "ESP32 não encontrado",
        "Certifique-se de que o celular e o ESP32 estão na mesma rede Wi-Fi.",
        [{ text: "Tentar novamente", onPress: buscarESP32 }]
      );
    } finally {
      setBuscando(false);
    }
  }

  async function avisoESP32(ativo) {
    const url = esp32UrlRef.current;
    if (!url) return;
    try {
      await fetch(`${url}/monitor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monitoring: ativo }),
      });
    } catch (e) {
      console.warn("não foi possível avisar o ESP32:", e.message);
    }
  }

  async function consultarSensor() {
    const url = esp32UrlRef.current;
    if (!url) return;
    try {
      const res  = await fetch(`${url}/status`);
      const data = await res.json();

      if (!data.detected) {
        // bicicleta parou de ser detectada, espera o delay de margem e então dispara roubo
        if (!ausenciaTimerRef.current && !alertaDisparadoRef.current) {
          setStatusSensor("aguardando");
          ausenciaTimerRef.current = setTimeout(() => {
            // Para o polling, dps q o roubo foi confirmado não tem mais porque ficar requerindo
            if (pollingRef.current) {
              clearInterval(pollingRef.current);
              pollingRef.current = null;
            }
            alertaDisparadoRef.current = true;
            ausenciaTimerRef.current   = null;
            setStatusSensor("alerta");
            Alert.alert(
              "ALERTA DE ROUBO",
              `Bicicleta removida da vaga ${selected?.label ?? ""}!`,
              [{ text: "OK" }]
            );
          }, DELAY_ALERTA_ROUBO_MS);
        }
      } else {
        // bicicleta voltou dentro do delay cancela timer e volta ao normal
        if (ausenciaTimerRef.current) {
          clearTimeout(ausenciaTimerRef.current);
          ausenciaTimerRef.current = null;
        }
        setStatusSensor("ok");
      }
    } catch (e) {
      console.warn("Erro ao consultar sensor:", e.message);
    }
  }

  useEffect(() => {
    if (monitorando) {
      consultarSensor();
      pollingRef.current = setInterval(consultarSensor, POLLING_INTERVAL_MS);
    } else {
      if (pollingRef.current)       { clearInterval(pollingRef.current); pollingRef.current = null; }
      if (ausenciaTimerRef.current) { clearTimeout(ausenciaTimerRef.current); ausenciaTimerRef.current = null; }
      alertaDisparadoRef.current = false; // reseta para próximo monitoramento
      setStatusSensor(null);
    }
    return () => {
      if (pollingRef.current)       clearInterval(pollingRef.current);
      if (ausenciaTimerRef.current) clearTimeout(ausenciaTimerRef.current);
    };
  }, [monitorando]);

  async function handleMonitor() {
    if (selected == null) {
      Alert.alert("Selecione uma vaga antes");
      return;
    }

    if (!esp32Url) {
      Alert.alert(
        "ESP32 não conectado",
        "Aguarde a descoberta ou tente reconectar.",
        [{ text: "Buscar", onPress: buscarESP32 }]
      );
      return;
    }

    if (statusSensor === "alerta") {
      await avisoESP32(false);
      setMonitorando(false);
      return;
    }

    if (!monitorando) {
      try {
        const res  = await fetch(`${esp32Url}/status`);
        const data = await res.json();
        if (!data.detected) {
          Alert.alert("Vaga vazia", "Nenhuma bicicleta detectada. Posicione a bike antes de monitorar.");
          return;
        }
      } catch {
        Alert.alert("Sem conexão com o sensor", "Verifique se o ESP32 e o celular estÃ£o na mesma rede.");
        return;
      }
      await avisoESP32(true);
      setMonitorando(true);
    } else {
      await avisoESP32(false);
      setMonitorando(false);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.ViewHeader}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.HeaderText}>Monitoramento</Text>
        </View>

        <View style={styles.ViewDrop}>
          <Text style={styles.textDroplabel}>SELECIONE A VAGA :</Text>
          <Droplist selected={selected} setSelected={setSelected} />
        </View>

        <ButtonMonitoring
          onPress={handleMonitor}
          disabled={selected == null}
          monitorando={monitorando}
          statusSensor={statusSensor}
          buscando={buscando}
          esp32Conectado={!!esp32Url}
          onReconectar={buscarESP32}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
