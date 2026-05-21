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
    display: 'flex',
    width: width,
    height: height * 0.4,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems:'center',
    justifyContent: 'center',
  },
   ViewHeader: {
      width: width * 0.65,
      height: height * 0.15,
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

    //VIEW DROPDOWN
    ViewDrop:{
        width: width * 0.7,
        height: height * 0.3, 
      //  backgroundColor:'#554422',
        justifyContent: 'center',
       // alignItems: 'center',
    },  
    textDroplabel: {
        height: height * 0.04,
        width: width * 0.5,
        color: '#000',
  //      backgroundColor: '#223355',
        fontSize: 18,
        textAlign:'center',
    },
    dropdown: {
        width: width * 0.7,
        height: height * 0.05,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

  dropdownText: {
    fontSize: 16,
    color: '#333',
  },

  icon: {
    fontSize: 14,
    color: '#666',
  },

  listContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    backgroundColor: '#FFF',
    maxHeight: 200,
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
