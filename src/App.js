import React from 'react';

import StorageController from './services/storage';
import * as GLOBAL from './assets/config/constants'

import { NavigationContainer } from '@react-navigation/native';
import {  StyleSheet, Text, View } from 'react-native';

import Router from './navigation/root-switch';

import MyStatusBar from './components/StatusBar';
import Loader from './components/Loader';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading:false
    }
    

    this.storageCtrl = new StorageController;
    
    this.storageCtrl.getItem('user_details').then(res=>{
     console.log('Res',JSON.parse(res))
      if(res){       
        GLOBAL.userDetails = JSON.parse(res);

        this.setState({loading:false})
      } else{
        GLOBAL.userDetails = null;
        this.setState({loading:false})
      }
    })
    // OneSignal.setLogLevel(6, 0);
    // OneSignal.setAppId("aab2bd62-e542-4448-8244-e64b8ab66c8d");
    // OneSignal.promptForPushNotificationsWithUserResponse(response => {
    //   console.log("Prompt response:", response);
    // });
    
    // OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    //   console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
    //   let notification = notificationReceivedEvent.getNotification();
    //   console.log("notification: ", notification);
    //   const data = notification.additionalData
    //   console.log("additionalData: ", data);
    //   // Complete with null means don't show a notification.
    //   notificationReceivedEvent.complete(notification);
    // });
    
    // //Method for handling notifications opened
    // OneSignal.setNotificationOpenedHandler(notification => {
    //   console.log("OneSignal: notification opened:", notification);
    // });
  }

  render() {

    return (
      < >

        <MyStatusBar />
        
        {!this.state.loading ? 
          <NavigationContainer>
 
            <Loader/>
            <Router />
          </NavigationContainer>:null}

          

      </>
  
      
    );


  }
  
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});