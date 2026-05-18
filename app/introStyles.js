 import { Dimensions, Pressable, StyleSheet } from "react-native"; 

    const width = Dimensions.get("screen").width; //
    const height = Dimensions.get("screen").height;

 export default StyleSheet.create({
  // FORMATAÇÃO  DO BLOCO QUE CONTEM TODA A TELA
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },



  //FORMATAÇÃO DO BLOCO QUE CONTEM A INTRODUÇÃO
  ViewCentro:{
    width: width * 0.9,
    height: height * 0.35,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewTextoIntro:{
    width: width * 0.7,
    height: height * 0.25,
    alignItems: 'center',
    backgroundColor: "#DBE2EF",
    borderRadius: 45,
    justifyContent: 'center',
  },
  IntroText:{
    width: width * 0.5,
    height: height * 0.18,
    fontSize: 20,
    color: "#000",
    fontFamily: "Strait" ,
    textAlign: 'left',
  },

  // FORMATAÇÃO DO BLOCO QUE CONTEM OS BOTÕES

  ViewButton:{
    width: width,
    height: height * 0.25,
    //backgroundColor: "#DBE2EF",
    justifyContent: 'center',
    alignItems: 'center', 
  },
  PressableCadastro:{
    width: width * 0.5,
    height: height * 0.08,
    backgroundColor: "#112D4E",
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  PressableText:{
    fontSize: 20,
    color: "#fff",
    fontFamily: "Strait" ,
    textAlign: 'justify',
  },

//formatação do textinho caso alguem já tenha cadastro
  ViewLogin:{
    width:width * 0.7,
    height: height * 0.055,
    backgroundColor: "#fff",
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  LoginText:{
    height: height * 0.035,
    fontSize: 15,
    color: "#000",
    fontFamily: "Strait" ,
    textAlign: 'justify',
    backgroundColor: "#fff",
  },
  PressableLogin:{
    height: height * 0.035,
    width: width * 0.12,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center', 
  },
  PressLoginText:{
    height: height * 0.03,
    width: width * 0.1,
    fontSize: 15,
    color: "#3F72AF",
    fontFamily: "Strait" ,
    textAlign: 'justify',
    backgroundColor: "#fff",
  },
 });
 