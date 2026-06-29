import { View, Pressable, Text, ActivityIndicator, Dimensions, StyleSheet } from "react-native";

const width  = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

// âââ Estados visuais do botÃ£o âââââââââââââââââââââââââââââââââââââââââââââ
const ESTADO = {
  buscando:    { bg: "#555",    label: "BUSCANDO ESP32...", opacity: 0.6, clicavel: false },
  semEsp32:    { bg: "#8B1A1A", label: "SEM CONEXÃO",       opacity: 0.8, clicavel: false },
  disabled:    { bg: "#413f3f", label: "MONITORAR",         opacity: 0.5, clicavel: false },
  idle:        { bg: "#112D4E", label: "MONITORAR",         opacity: 1,   clicavel: true  },
  ok:          { bg: "#285A48", label: "MONITORANDO",       opacity: 1,   clicavel: true  },
  aguardando:  { bg: "#7A6200", label: "VERIFICANDO",       opacity: 1,   clicavel: false },
  alerta:      { bg: "#8B1A1A", label: "RESETAR", opacity: 1,  clicavel: true  },
};

function resolveEstado({ buscando, esp32Conectado, disabled, monitorando, statusSensor }) {
  if (buscando)        return ESTADO.buscando;
  if (!esp32Conectado) return ESTADO.semEsp32;
  if (disabled)        return ESTADO.disabled;
  if (!monitorando)    return ESTADO.idle;
  return ESTADO[statusSensor] ?? ESTADO.ok;
}

const STATUS_LABEL = {
  ok:         "Bicicleta detectada na vaga",
  aguardando: "Verificando ausência...",
  alerta:     "Bicicleta removida da vaga!",
};

export default function ButtonMonitoring({
  onPress,
  disabled,
  monitorando,
  statusSensor,
  buscando,
  esp32Conectado,
  onReconectar, 
}) {
  const estado = resolveEstado({ buscando, esp32Conectado, disabled, monitorando, statusSensor });
  const podeClicar = !buscando && !disabled;

  return (
    <View style={style.ViewButton}>

      {/* ââ Indicador de conexÃ£o com ESP32 ââ */}
      <View style={style.conexaoRow}>
        <View style={[style.dot, { backgroundColor: esp32Conectado ? "#285A48" : buscando ? "#7A6200" : "#8B1A1A" }]} />
        <Text style={style.conexaoText}>
          {buscando
            ? "Buscando ESP32 na rede..."
            : esp32Conectado
            ? "ESP32 conectado"
            : "ESP32 não encontrado"}
        </Text>
        {!esp32Conectado && !buscando && (
          <Pressable onPress={onReconectar} style={style.btnReconectar}>
            <Text style={style.btnReconectarText}>Reconectar</Text>
          </Pressable>
        )}
      </View>

      {/* ââ BotÃ£o principal ââ */}
      <Pressable
        disabled={!estado.clicavel}
        style={[style.PressButton, { backgroundColor: estado.bg, opacity: estado.opacity }]}
        onPress={onPress}
      >
        {buscando
          ? <ActivityIndicator color="#fff" />
          : <Text style={style.PressText}>{estado.label}</Text>
        }
      </Pressable>

      {/* ââ Legenda de status do sensor ââ */}
      {monitorando && statusSensor && (
        <Text style={[style.statusText, { color: estado.bg }]}>
          {STATUS_LABEL[statusSensor] ?? ""}
        </Text>
      )}

    </View>
  );
}

const style = StyleSheet.create({
  ViewButton: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.02,
    backgroundColor: "#fff",
    gap: 10,
  },
  conexaoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  conexaoText: {
    fontSize: 12,
    color: "#555",
  },
  btnReconectar: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: "#112D4E",
  },
  btnReconectarText: {
    color: "#fff",
    fontSize: 11,
  },
  PressButton: {
    width: width * 0.5,
    height: height * 0.06,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  PressText: {
    color: "#fff",
    fontSize: 18,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
