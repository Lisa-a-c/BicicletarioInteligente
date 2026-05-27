import {View, Text, Alert} from 'react-native';
import { useState } from 'react';
import styles from './loginStyles';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/header';
import InputField from '../components/inputfield';
import react from 'react';
import ButtonUp from '../components/buttonSignup';

export default function login() {
    const [email, setEmail] = react.useState("");

    const handleLogin = async () => {
        const emailCadastro =  await AsyncStorage.getItem("userEmail");

        if(email === ""){
            Alert.alert("CAMPO VAZIO", "Preencha o campo e-mail para realizar o login");
            return;
        }

        if(email === emailCadastro){
            router.push("/home")
        }
        else{
            Alert.alert("EMAIL NÃO ENCONTRADO", "Utilize o e-mail previamente cadastrado para realizar o login");
        }
    }

    return(
        <View style={styles.container}>
            <Header></Header>
            <View style={styles.ViewInstruction}>
                <Text style={styles.textinstruction}>
                    Insira o Email cadastrado para acessar o monitoramento
                </Text>
            </View>
            <View style={styles.ViewLogin}>
                <InputField label='E-MAIL:' placeholder="e-mail" value={email} onChangeText={setEmail}></InputField>
            </View>
            <ButtonUp text="LOGIN" onPress={() => {handleLogin()}}></ButtonUp>
        </View>       
    );
}