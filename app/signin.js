import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Pressable,  KeyboardAvoidingView,  Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from 'expo-router';

import styles from "./signinStyles";
import Header from "../components/header";
import InputField from "../components/inputfield";
import ButtonUp from "../components/buttonSignup";
import react from "react";

export default function singin() {
  const [nome, setNome] = react.useState("");
  const [telefone, setTelefone] = react.useState("");
  const [email, setEmail] = react.useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header></Header>
         <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.ViewSignIn}>
          <InputField  label="NOME COMPLETO:"  placeholder="nome"  value={nome}  onChangeText={setNome}>
          </InputField>
          <InputField label="TELEFONE:" placeholder="(xx)yyyyy-yyyy" value={telefone}  onChangeText={setTelefone}>
          </InputField>
          <InputField label="E-MAIL: " placeholder="fulano123@gmail.com"  value={email}  onChangeText={setEmail}>
          </InputField>
    
      </KeyboardAvoidingView>
          
        <ButtonUp
          text="CADASTRAR"
          onPress={() => {
            console.log(nome);
            console.log(telefone);
            console.log(email);
            router.push('/login');
          }}
        ></ButtonUp>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
