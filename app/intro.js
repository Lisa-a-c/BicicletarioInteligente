import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable} from 'react-native';
import styles from './introStyles';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../components/header';
import ButtonUp from '../components/buttonSignup';
const logo = require("../assets/bikeLOGO.png");

export default function intro() {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}> 
            <Header></Header>
            <View style={styles.ViewCentro}>
                <View style={styles.ViewTextoIntro}>
                    <Text style={styles.IntroText}> 
                        Utilize o bicicletário inteligente para garantir mais segurança para sua bicicleta dentro da UNESP.
                    </Text>
                </View>
            </View>
            <ButtonUp text="CADASTRE-SE" onPress={() => router.push("/signin")}></ButtonUp>
            <View style={styles.ViewLogin}>
                <Text style={styles.LoginText}>
                    Já possui cadastro ?
                </Text>
                <Pressable style={styles.PressableLogin} onPress={() => router.push("/login")}>
                    <Text style={styles.PressLoginText}>
                        login
                    </Text>
                </Pressable>

            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

