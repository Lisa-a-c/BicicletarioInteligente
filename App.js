import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <Pressable  onPress={() => router.push('/singin')}>
        <Text>CLIQUE TESTE</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#463939',
    alignItems: 'center',
    justifyContent: 'center',
  },
  press:{
    width:"50%",
    height: "20%",
    backgroundColor: '#fd0707',
    alignItems: 'center',
  },
});
