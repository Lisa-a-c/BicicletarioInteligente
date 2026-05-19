import { View, TextInput, StyleSheet, Dimensions, Text} from "react-native";


const width = Dimensions.get("screen").width; 
const height = Dimensions.get("screen").height;

export default function InputField({label, placeholder, value,
    onChangeText}) {
    return(
        <View style={styles.viewInputField}>
            <Text style={styles.textLabel}>
                {label}
            </Text>
            <TextInput style={styles.Input} placeholder={placeholder} value={value} onChangeText={onChangeText}> 
            </TextInput>
        </View>
    );
}

const styles = StyleSheet.create({

    viewInputField:{
        width: width * 0.6,
        height: height * 0.11,
        flexDirection: 'column',
        backgroundColor:'#fff',
        justifyContent: 'space-around',
        alignItems:'center',
        display: 'flex',
    },
    textLabel:{
        width: width * 0.6,
        fontSize: 15,
        color: '#000',
    },
    Input:{
        width: width * 0.6,
        height: height * 0.05,
        color: '#424242',
        backgroundColor:  '#D9D9D9',
        borderRadius: 10,
    },

});