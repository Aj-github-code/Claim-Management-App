import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../assets/config/colors';
import AppText from './AppText';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.btnContainer, this.props.btnstyle]}>
        <TouchableOpacity onPress={this.props.onChange} style={styles.button}>
          <AppText style={styles.btnText}>{this.props.lblName}</AppText>
        </TouchableOpacity>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.THEME,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 18,
    color: colors.WHITE
  }
})
export default Button;
