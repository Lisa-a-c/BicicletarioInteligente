import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("screen").width; //
const height = Dimensions.get("screen").height;
const logo = require("../assets/bikeLOGO.png");

export default function Header(){
    return(
        <View style={style.ViewHeader}>
            <Image style={style.logo} source={logo}>
            </Image>
            <Text style={style.HeaderText}>BICICLETÁRIO INTELIGENTE</Text>
        </View>
    );
    
}

const style = StyleSheet.create({

    // FORMATAÇÃO DO HEADER
  ViewHeader: {
    width: width * 0.9,
    height: height * 0.15,
    backgroundColor: "#fff",
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderText: {
    fontSize: 22,
    color: "#112D4E",
    fontFamily: "Strait" ,
  },
   logo: {
    width: 60,
    height: 60,
  },
});