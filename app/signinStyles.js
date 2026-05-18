import { Dimensions, StyleSheet } from "react-native"; 

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
  ViewSignIn:{
    width: width * 0.5,
    height: height * 0.3,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems:'center',
    backgroundColor:'#ad40aa',
  },
  Viewlabels:{
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor:'#552244',
  },
});
