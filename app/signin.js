import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Pressable,  KeyboardAvoidingView,  Platform, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from 'expo-router';

import styles from "./signinStyles";
import Header from "../components/header";
import InputField from "../components/inputfield";
import ButtonUp from "../components/buttonSignup";
import react from "react";
import { getUserEmailAsync, setUserEmail } from "../services/emailAsync";
import { getUserNameAsync, setUserNameAsync } from "../services/nameAsync";


export default function singin() {
  const [nome, setNome] = react.useState("");
 // const [telefone, setTelefone] = react.useState("");
  const [email, setEmail] = react.useState("");

  const handleSingin = async() => {
    if( nome === "" ||  email === ""){
      Alert.alert("PREENCHA TODOS OS CAMPOS", "Algum dos campos obrigatorios para cadastro não foi preenchido");
      return;
    }
    await AsyncStorage.setItem("userEmail", String(email)); //salva o email
    await AsyncStorage.setItem("userName", nome); //salva o nome

    /*const testemail = await AsyncStorage.getItem("userEmail");
    console.log("email", testemail);
    const testenome = await AsyncStorage.getItem("userName");
    console.log("nome", testenome);*/
    
    router.push('/login');
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header></Header>
         <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.ViewSignIn}>
          <InputField  label="NOME COMPLETO:"  placeholder="nome"  value={nome}  onChangeText={setNome}>
          </InputField>
          <InputField label="E-MAIL: " placeholder="fulano123@gmail.com"  value={email}  onChangeText={setEmail}>
          </InputField>
    
      </KeyboardAvoidingView>
          
        <ButtonUp
          text="CADASTRAR"
          onPress={() => {
           handleSingin()
          }}
        ></ButtonUp>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

