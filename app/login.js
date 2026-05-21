import {View, Text} from 'react-native';
import { useState } from 'react';
import styles from './loginStyles';
import { router } from 'expo-router';

import Header from '../components/header';
import InputField from '../components/inputfield';
import react from 'react';
import ButtonUp from '../components/buttonSignup';

export default function login() {
    const [email, setEmail] = react.useState("");

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
            <ButtonUp text="LOGIN" onPress={() => {console.log(email) , router.push("/home")}}></ButtonUp>
        </View>       
    );
}