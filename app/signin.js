import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import styles from "./signinStyles";
import Header from '../components/header';

export default function singin() {
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
            <Header></Header>
            <View style={styles.ViewSignIn}>
                <View style={styles.Viewlabels}>

                </View>
            </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}