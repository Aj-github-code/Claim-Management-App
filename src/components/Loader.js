import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { colors } from '../assets/config/colors';
import * as GLOBAL from '../assets/config/constants'
class Loader extends React.Component {
  constructor(props) {
    super(props);
    GLOBAL.loadingVisible = this;
    this.state={
        loading:false
    }
  }

  render() {
    return (
      <ProgressDialog
      visible={this.state.loading}
      //title="Progress Dialog"
      message="Loading.."
      onTouchOutside={() => GLOBAL.loadingVisible.setState({ loading: false })}
      activityIndicatorColor={colors.TERTIARY}
      activityIndicatorStyle={{margin:0,padding:0}}
      activityIndicatorSize={'large'}
  />
    );
  }
}

export default Loader;
