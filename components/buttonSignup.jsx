import {View, Pressable, Text, Dimensions, StyleSheet} from "react-native";


const width = Dimensions.get("screen").width; //largura da tela
const height = Dimensions.get("screen").height; //altura da tela

export default function ButtonUp({text, onPress }) {
    return (
        <View style={style.ViewButton}>
            <Pressable  style={style.PressButton} onPress={onPress}>
                <Text style={style.PressText}>
                    {text}
                </Text>
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    ViewButton:{
        width: width,
        height: height * 0.1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent:'center',
    },
    PressButton:{
        width: width*0.5,
        height: height*0.06,
        backgroundColor: "#112D4E",
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    PressText:{
        color: "#fff",
        fontSize:18,
    },

});