import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { colors} from '../assets/config/colors';
import AppText from './AppText';

// export interface HeaderProps {
//     iconName?:string,
//     text?:string,
//     iconType?:"AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial",
//     rightBtnIcon?:string
// }


class Header extends React.Component {
  constructor(props) {
    super(props);

  }
  goBack() {
    this.props.goBack();
  }
  render() {
    return (
      <View style={style.container}>
        {this.props.bckBtn ? <TouchableOpacity>
          <Icon onPress={() => { this.goBack() }} style={{ color: colors.WHITE, marginLeft:10 }} name="arrow-left" size={18} type="Ionicons" />
        </TouchableOpacity> : null}
        <AppText style={style.titleText}>{this.props.text}</AppText>
        {this.props.rightImage ? (<Pressable style={style.prevRightButton}>
          {/* <Image style={{height:25,width:190,borderRadius:8}} source={require('../assets/images/logo4.png')} /> */}
        </Pressable>) : null}
        {this.props.rightBtnIcon ? (<Pressable onPress={this.props.rightBtnPress} style={style.prevRightButton}>
          <Icon type={this.props.iconType} name={this.props.rightBtnIcon} style={style.icon} />
        </Pressable>) : null}
        {this.props.rightBtnIcon2 ? (<Pressable onPress={this.props.rightBtnPress2} style={style.prevRightButton2}>
          <Icon type={this.props.iconType} name={this.props.rightBtnIcon2} style={style.icon} />
        </Pressable>) : null}
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    //  justifyContent:"center",
    flexDirection: "row",
    paddingVertical: 15,
   // elevation: 2,
    backgroundColor: colors.THEME,//PRIMARY,
    width: "100%",
    // marginBottom: 10
  },
  titleText: {
    //fontFamily: APPSTYLE.fontBold,
    color: colors.WHITE,//WHITE,
    fontSize: 18,
    //alignSelf:'flex-start',
    paddingHorizontal: 10,
    fontWeight:'700',
    //  lineHeight: 22,
  },
  prevRightButton: {
    position: "absolute",
    right: 5,
    padding: 5,
    zIndex: 5,
    marginRight: 10,
  },
  prevRightButton2: {
    position: "absolute",
    right: 35,
    padding: 5,
    zIndex: 5,
    marginRight: 20,
  },
  icon: {
    color: colors.WHITE,//WHITE,//GRAY_LIGHT,
    fontSize: 20
  },
})
export default Header;