import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getFontStyles } from '../services/utils';
import AppText from './AppText';

class NoData extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
          <Image style={{height:30,width:30}} resizeMode="contain" source={require('../assets/images/potli2.png')} />
          <AppText style={styles.noDataText}>{this.props.text}</AppText>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20%'
    },
    noDataText: {
      textAlign: 'center',
      marginTop: 5,
      fontSize: 16,
      // ...getFontStyles({ weight: 'Bold' })
    },
  })
export default NoData;
