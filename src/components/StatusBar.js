import * as React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { colors } from '../assets/config/colors';



export default class MyStatusBar extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;
    return (
      <View style={{height:STATUSBAR_HEIGHT,backgroundColor:colors.WHITE}}>{/**color.sideMenu */}
      <StatusBar translucent backgroundColor={colors.THEME} />
      </View>
    );
  }
}
