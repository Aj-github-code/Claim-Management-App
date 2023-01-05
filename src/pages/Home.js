import React, { Component } from 'react'
import { colors} from '../assets/config/colors';
import { BackHandler, View, StyleSheet, TouchableOpacity, Image, Pressable, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {default as FontAwesome} from 'react-native-vector-icons/FontAwesome';
// import moment from 'moment';
import * as GLOBAL from '../assets/config/constants';
import Api from '../services/api';
import StorageController from '../services/storage';
import { getFontStyles, Utils } from '../services/utils';
import { API_CONSTANTS } from '../assets/config/constants';


import Header from '../components/Header';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.storageCtrl = new StorageController;
        this.apiCtrl = new Api;
        this.utils = new Utils;
        this.handleBackButton = this.handleBackButton.bind(this)
        const didFocusSubscription = this.props.navigation?.addListener(
          'focus',
          payload => {
            this.getStorageDate();
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
          }
        )
        const didBlurSubscription = this.props.navigation?.addListener(
          'blur',
          payload => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
          }
        );
        this.getStorageDate();
        // console.log('Role',value);
      }

      state = {
        showFilter: false,
        name: '',
  
        filterBy: '',
        // currentDate: moment().format("YYYY-MM-DD"),
    
  
        dashboardCount:{},
      }

      
      
  getStorageDate() {
    this.storageCtrl.getItem('user_details').then(res => {

      // console.log(JSON.parse(res));
      if (res) {
        var response =  JSON.parse(res)
        GLOBAL.userDetails =  response.data.user_details;
        GLOBAL.userDetails.access_token =  response.access_token;
        GLOBAL.userRole =  response.data.user_roles;
        this.setState({ name: GLOBAL.userDetails.name }, () => {
        //   this.getDashboardDetails(-1);
        });
      }
    })
  }

  
  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  }

  getDashboardDetails(){
    this.apiCtrl.callAxios(API_CONSTANTS.dashboardList, {filter: 'claim'}).then((response)=>{
      // console.log("respnse", response.data.data)
      if(response.success === true){
        this.setState({dashboardCount:{ 
          new:response.data.data.new_claim[0].StatusCount,
          inProgress:response.data.data.pending_claim[0].StatusCount,
          completed:response.data.data.completed_claim[0].StatusCount,
        }})
      }
    })
  }


  componentDidMount(){
    this.getDashboardDetails();
  }



  render() {
    // console.log('State Data', this.state)
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
            <Header rightImage={true} text={"Hello, " + this.state.name} bckBtn={false}
        // rightBtnPress={() => { this.setState({ showFilter: true }) }} 
        // rightBtnIcon="filter" 
        // iconType="FontAwesome" 
        // rightBtnIcon2="search" 
        // rightBtnPress2={() => { this.props.navigation.push('Search') }} 
        />
        <View style={[styles.row]}>
        <TouchableOpacity style={[styles.card, styles.elevation]} title="View Profile" onPress= {()=>  this.props.navigation.navigate("New Inspection")}>
   

            <Image  style={[{width:89, alignSelf:"center", marginTop:18, height:89.3}]} source={require('../assets/images/group-5434.png')} />

            <Text style={[{fontSize:50, color: colors.THEME, marginTop:20}]}>
            {this.state.dashboardCount.new?this.state.dashboardCount.new:0}
            </Text>
            <Text  adjustsFontSizeToFit style={[styles.title]}>
            New Inspection
            </Text>
    
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.elevation]} onPress={() => this.props.navigation.navigate("Inprogress")}>
            <Image style={[{width:89, alignSelf:"center", marginTop:18, height:89.3}]} source={require('../assets/images/group-5432.png')} />
            <Text style={[{fontSize:50, color: colors.THEME, marginTop:20}]}>
            {this.state.dashboardCount.inProgress?this.state.dashboardCount.inProgress:0}
            </Text>
            <Text style={[styles.title]}>
                Inprogress 
            </Text>
   
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.elevation]} onPress={() => this.props.navigation.navigate("Completed")}>
            <Image style={[{width:89, alignSelf:"center", marginTop:18, height:89.3}]} source={require('../assets/images/group-5431.png')} />
            <Text style={[{fontSize:50, color: colors.THEME, marginTop:20}]}>
            {this.state.dashboardCount.completed?this.state.dashboardCount.completed:0}
            </Text>
            <Text style={[styles.title]}>
                Completed
            </Text>
    
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.elevation]} onPress={() => this.props.navigation.navigate("Additional Claim")} >
    
            <Image style={[{width:89, alignSelf:"center", marginTop:18, height:89.3}]} source={require('../assets/images/group-5435.png')} />
            <Icon name={"user"} color={'white'}  light size={45} style={[{position:'absolute', alignSelf:"center",top:40, zIndex: 99}]} />
            <Text style={[{fontSize:50, color: colors.THEME, marginTop:20}]}>0</Text>
            <Text style={[styles.title]}>
            Additional Claim
            </Text>
            
   
        </TouchableOpacity>
      
        </View>
      </SafeAreaView>
    )
  }
}



const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center',height:"100%" },
    row: {  flex:2, justifyContent: 'center', marginTop:'20%' , alignItems:'center', flexDirection: "row", flexWrap: "wrap"},
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
    //   paddingVertical: 10,
    alignItems:"center",
      alignSelf: "flex-start",
      textAlign: "center",
      // paddingHorizontal: 25,
      width: '38%',
      margin: "2%",
      height:"auto",
    },
    elevation: {
      elevation: 20,
      shadowColor: '#52006A',
    },
    heading: {
      position:'relative',
      justifyContent:'center',
      alignItems:'center',
      padding:"10%",
      marginTop:"-20%",

    },
    title: {
      fontSize: 20,
      color: "#071A83",
      textAlign: "center",
      // marginTop: "-20%",
    //   flex: 3,
      fontWeight: '700',
      marginBottom:20,

    },   
     icon: {
      position: 'absolute', zIndex: 102,
      // alignSelf: 'flex-end',
      right:"-4%",
      borderRadius:60,
      backgroundColor: "#fff",
      marginBottom: "-50%",
      // zIndex: 5
    },
    iconcircle: {
      position: 'absolute', zIndex: 100,
      // alignSelf: 'flex-end',
      right:"-10%",
      borderRadius:60,
      backgroundColor: "#fff",
      marginBottom: "-50%",
    }
  });

