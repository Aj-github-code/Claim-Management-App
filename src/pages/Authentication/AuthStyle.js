import { StyleSheet } from "react-native";
import { colors } from "../../assets/config/colors";
import { getFontStyles } from "../../services/utils";

const AuthStyles = StyleSheet.create({
    inputBox : {
        marginBottom : 10,
        borderWidth: 1,
        height : 45,
        borderColor : '#cacaca',
        alignContent :"flex-start"
      },
      circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.TERTIARY,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:5,
    },
    checkedCircle: {
        width: 12,
        height: 12,
        borderRadius: 12 / 2,
        backgroundColor: colors.TERTIARY,//"#00478F",
    },
    logo: {
        // marginTop: 40,
        width: 300,
        height: "100%",
        alignSelf: 'center',
        justifyContent: 'center',
        // merginBottom:40,
      },
    bottomContainer: {
        backgroundColor: colors.WHITE,
        elevation: 2,
        padding: 20,
        // flex:1,
        // justifyContent:"center",

        // marginTop: '-20%',
        // bottom:10,
       // borderTopLeftRadius: 20,
      //  borderTopRightRadius: 20,
        height: '100%',
      },
      signUpText: { textAlign: 'center', padding: 10, fontSize: 15, marginBottom: '20%' },
      bold:{
      ...getFontStyles({ weight: 'Bold' }),
        
      },
      header:{
         textAlign: 'center', fontWeight: '700', fontSize: 28,color:colors.BLACK 
      },
      regContainer:{ backgroundColor: colors.WHITE, padding: 20,},
      regText:{ textAlign: 'center',color:colors.BLACK,marginBottom:25 }
})

export default AuthStyles;