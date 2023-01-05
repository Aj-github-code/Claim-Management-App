import React, { Component } from 'react'

import { colors} from '../assets/config/colors';


import { BackHandler, View, StyleSheet, TouchableOpacity, Image, Pressable, Text, ScrollView,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { API_CONSTANTS } from '../assets/config/constants';
import * as GLOBAL from '../assets/config/constants';
import Api from '../services/api';
import StorageController from '../services/storage';
import { getFontStyles, Utils } from '../services/utils';
import AuthStyles from './Authentication/AuthStyle';
import Input from '../components/Input';
import Header from '../components/Header';

export default class AddVisitor extends Component {
    constructor(props) {
        super(props);
        this.apiCtrl = new Api;
        this.storageCtrl = new StorageController;
        this.state = {
        name:'',
        email: '',
        mobile: '',
        area_name: '',
        pincode: '',

        //  password: ''
        };
        // console.log('Role',value);

      }

    
    state = {
        showFilter: false,
        name: '',
        orderList: [],
        pendingOrderList: [],
        userSavings: [
          {
            amount: '',
            company_discount: ''
          }
        ],
        startdate: '',
        enddate: '',
        filterBy: '',
        // currentDate: moment().format("YYYY-MM-DD"),
        showStartDateModal: false,
        showEndDateModal: false,
      }

      
      
  getStorageDate() {
    this.storageCtrl.getItem('user_details').then(res => {
      console.log('RESSS', res);
      if (res) {
        GLOBAL.userDetails = JSON.parse(res);
        this.setState({ name: GLOBAL.userDetails.name }, () => {
        //   this.getDashboardDetails(-1);
        });
      }
    })
  }
  
  addVisitor() {
    if (this.state.name && this.state.mobile && this.state.email) {
      GLOBAL.loadingVisible.setState({ loading: true });
      const request = { name: this.state.name, email: this.state.email, area: this.state.area_name, mobile: this.state.mobile, venue_id:  this.props.route.params.venue_id, pincode: this.state.pincode, };
      console.log(request);
      this.apiCtrl.callAxios(API_CONSTANTS.addVisitor, request).then(response => {
       console.log(response.data);
        if (response.data.success == "true") {
          Alert.alert('Success', 'Visitor Added Successfully');
          // this.storageCtrl.setItem('user_details', JSON.stringify(response.data.data));
          // GLOBAL.userDetails = response.data.data;
          GLOBAL.loadingVisible.setState({ loading: false });
          // Toast.show('Detail updated successfully');
          // this.props.navigation.pop();
        } else {
          Alert.alert('Error', response.data.message);
          GLOBAL.loadingVisible.setState({ loading: false });
          
        }
      })
    } else {
      Toast.show('Please enter details');
    }

  }

  
  handleBackButton = () => {
  
    BackHandler.exitApp();
    return true;
  }
  render() {
      return (
 
        <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
            <Header goBack={() => { this.props.navigation.pop() }} text={'Add Visitor ' + this.props.route.params.venue_id} bckBtn={true} rightImage={true}/>
            

          <View style={[styles.card, styles.elevation]}>
            <View style={[styles.cardHeader,{width:"100%", backgroundColor:colors.THEME}]}>

            <Text style={[{fontSize:25,padding:2, fontWeight:"bold", color:"white"}]}>Event : {this.props.route.params.event_name}</Text>
            </View>
            <View style={[styles.cardBody]}>

            {/* <Image style={styles.profileImage} resizeMode="contain" source={require('../../assets/images/person.png')} /> */}
            {/* <Icon name="camera" type="Ionicons" style={{position: 'absolute',top:'27.5%',right:'34%',fontSize:35,color:'gray'}}/> */}
            <Input
              lblName="Name"
            //   value={this.state.name}
              style={[ styles.input]}
              onChange={(text) => this.setState({ name: text })}
            />
            <Input
              lblName="Mobile No"
            //   value={this.state.mobile}
              style={[styles.input]}
              keyboardType={'numeric'}
              maxLength={10}
              onChange={(text) => this.setState({ mobile: text })}
            />
            <Input
              lblName="Email"
            //   value={this.state.email}
              style={[styles.input]}
              keyboardType={'email-address'}
              onChange={(text) => this.setState({ email: text })}
            />

            <Input
              lblName="Pincode"
            //   value={this.state.address}
              style={[ styles.input]}
              numberOfLines={2}
              keyboardType={'numeric'}
              onChange={(text) => this.setState({ pincode: text })}
            />
                <Input
              lblName="Area Name"
            //   value={this.state.address}
              style={[styles.input]}
              numberOfLines={2}
              multiline={true}
              onChange={(text) => this.setState({ area_name: text })}
            />
            {/* <Input
              lblName="Password"
            //   value={this.state.password}
              style={AuthStyles.inputBox}
              secureTextEntry={true}
              onChange={(text) => this.setState({ password: text })}
            /> */}
         
            </View>
          </View>
  
            <View  style={[styles.footer]}>
                <TouchableOpacity style={[styles.button]} onPress={() => { this.addVisitor() }} >
                    <Text style={[styles.buttonText]}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
    container: { flex: 1  },
    footer:{
        position:"absolute", 
        left:0, 
        right:0, 
        bottom:0,
        flex:0.1, 
        display: "flex", 
        justifyContent:"space-around",
        backgroundColor:colors.THEME, 
        width:"100%", 
        height:70, 
        flexDirection:"row", 
        borderTopRightRadius: 40, 
        borderTopLeftRadius: 40,
        paddingTop : "-2%",
        paddingBottom : "-2%"
    },
    button:{
        alignItems:"center",
        display:"flex",
        justifyContent:"space-around",
        flexDirection:"row",
        height:"100%",
        width:"100%",
    
    },
    buttonText:{
        fontSize:20, 
        fontWeight:"bold", 
        color:"white", 
        margin:10
    },
    input: {
      
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor:colors.THEME,
      marginBottom:10,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      // paddingVertical: 40,
      alignSelf: "flex-start",
      textAlign: "center",
      // 
      width: '95%',
      margin: "2%",
      height:"auto",
    },
    cardHeader:{
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      padding:10,
      
    },
    cardBody: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 40,
      alignSelf: "flex-start",
      textAlign: "center",
      // 
      width: '95%',
      margin: "2%",
      height:"auto",
      paddingHorizontal: 25,
    },
    elevation: {
      elevation: 20,
      shadowColor: '#2278FE',
    },
  });

