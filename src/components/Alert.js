
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ProgressDialog } from 'react-native-simple-dialogs';
import * as GLOBAL from '../assets/config/constants'
class AlertDialog extends Component {
  constructor(props) {
    super(props);
    GLOBAL.alertVisible = this;
    this.state={
        showAlert:false
    }
  }

  render() {
    return (
    //     <ProgressDialog
    //     visible={this.state.loading}
    //     //title="Progress Dialog"
    //     message="Loading.."
    //     onTouchOutside={() => GLOBAL.loadingVisible.setState({ loading: false })}
    //     activityIndicatorColor={PRIMARY}
    //     activityIndicatorStyle={{margin:0,padding:0}}
    //     activityIndicatorSize={'large'}
    // />
    <ConfirmDialog
    title="Confirm Dialog"
    message="Are you sure about that?"
    visible={this.state.showAlert}
   // onTouchOutside={() => this.setState({dialogVisible: false})}
    positiveButton={{
        title: "YES",
        onPress: () => alert("Yes touched!")
    }}
    negativeButton={{
        title: "NO",
        onPress: () => alert("No touched!")
    }}
/>
    );
  }
}

export default AlertDialog;

