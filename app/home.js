import { View, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
const logo = require("../assets/bikeLOGO.png");

import styles from "./homeStyles";
import Droplist from "../components/droplist";
import ButtonMonitoring from "../components/buttonMonitoring";


export default function home() {

  const [selected, setSelected] = useState(null);

  function handleMonitor() {

    if (selected == null) {
      Alert.alert("Selecione uma vaga antes");
      return;
    }

    console.log("Monitorando:", selected);

  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.ViewHeader}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.HeaderText}>Monitoramento</Text>
        </View>
        <View style={styles.ViewDrop}>
            <Text style={styles.textDroplabel}>
                SELECIONE A VAGA :
            </Text>
            
        <Droplist
            selected={selected}
            setSelected={setSelected}
        />
        </View>
        <ButtonMonitoring
            onPress={handleMonitor}
            disabled={selected == null}
        />    
       </SafeAreaView>
    </SafeAreaProvider>
  );
}
