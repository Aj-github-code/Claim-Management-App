import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFontStyles } from '../services/utils';

export default class AppText extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { children, style, ...otherprops } = this.props;
    // const textStyle = StyleSheet.flatten([styles.text,style])
    return (
      <Text {...otherprops} style={[styles.text, style]}>{children}</Text>

    );
  }
}
const styles = StyleSheet.create({
  text: {
    //color: theme.gray.lightest,
    // ...getFontStyles(),
  },
});