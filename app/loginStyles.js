import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("screen").width; 
const height = Dimensions.get("screen").height;

export default StyleSheet.create({
// FORMATAÇÃO  DO BLOCO QUE CONTEM TODA A TELA
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    //justifyContent: 'center',
  },
//formatação do bloco que contem os textbox e labels
  ViewLogin:{
    display: 'flex',
    width: width,
    height: height * 0.14,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems:'center',
    justifyContent: 'center',
  },
  ViewInstruction:{
    display: 'flex',
    width: width * 0.7,
    height: height * 0.2,
    flexDirection: 'column',
    backgroundColor: '#112D4E',
    justifyContent:'space-around',
    borderRadius:50,
    alignItems:  'center',
  },
  textinstruction:{
    width: width * 0.5,
    height: height * 0.15,
    color:'#fff',
    fontSize: 24,
  },
});