import React, { Component } from 'react'
import { Container } from 'react-dom'
import { colors} from '../assets/config/colors';
import { View, StyleSheet, TouchableOpacity, Image, Pressable, Text, ActivityIndicator, FlatList,  ScrollView,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {default as FontAwesome} from 'react-native-vector-icons/FontAwesome';

import { getFontStyles, Utils } from '../services/utils';
import Api from '../services/api';
import * as GLOBAL from '../assets/config/constants';
import { API_CONSTANTS } from '../assets/config/constants';
import Header from '../components/Header';
import AppText from '../components/AppText';
import ListEmptyComponent from '../components/ListEmptyComponent';


import moment from 'moment/moment';
export default class EventList extends Component {

  constructor(props) {
    super(props);
    this.utils = new Utils;
    this.apiCtrl = new Api;
    this.getEventList(20)
  }
  state = {
    eventList: [],
    // filterBy: this.props.route.params.filterBy,
    // startDate: this.props.route.params.startDate,
    // endDate: this.props.route.params.endDate,
    refreshing: false,
    loading: false,
    pageStart: 0,
    pageLength: 2,
  }


  handleRefreshFromTop = () => {
    console.log("Coming to top");
    this.getEventList(this.state.pageLength+10);
  };

  handleLoadMoreFromBottom = () => {
    console.log("Coming to bottom");
    // this.getEventList(20);

    // this.setState({ loading: false });
    // this.getEventList(this.state.pageStart);
    // this.getOrderList("-1", this.state.startDate, this.state.endDate, this.state.pageStart)
  }

  getEventList( pageLength) {
    GLOBAL.loadingVisible.setState({ loading: true });
    this.apiCtrl.callAxios(API_CONSTANTS.eventVenueList, {   length: pageLength }).then(response => {
    // console.log('Responses', response.data.aaData);
    this.setState({ loading: false })
    if (response.data.aaData) {

      let finalEventList = [];
      response.data.aaData.map(item => {
        item.bgColor = this.utils.getRandomColor();
        finalEventList.push(item)
      })
      this.setState({ eventList: finalEventList.reverse() });


      // if (this.state.pageStart == 0) {
      //   let finalOrderList = [];
      //   response.data.data.aaData.map(item => {
      //     item.bgColor = this.utils.getRandomColor();
      //     finalOrderList.push(item)
      //   })
      //   this.setState({ orderList: finalOrderList.reverse(), pageStart: 1 });
      // } else {
      //   response.data.data.aaData.map(item => {
      //     item.bgColor = this.utils.getRandomColor();
      //     if (!this.handleCheckCategory(item.trans_no, this.state.orderList)) {
      //       this.state.orderList.push(item);
      //     }
      //   });
      //   // if (this.state.orderList > 5) {
      //   //   this.setState({ pageStart: this.state.pageStart + 1 });
      //   // }
      // }
      GLOBAL.loadingVisible.setState({ loading: false });
    } else {
      GLOBAL.loadingVisible.setState({ loading: false });
      //show popup
    }
  })
}


  renderLoader = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
        {this.state.loading ?
          <View style={{}}>
            <ActivityIndicator size="small" color="#000" />
          </View>
          :
          <View style={{}}>
            <ActivityIndicator size="small" color="#fff" animating={false} />
          </View>
        }
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <Header goBack={() => { this.props.navigation.navigate('Dashboard') }}  text={'Additional Claim'}  bckBtn={true} rightImage={true} />
                
        <FlatList
     
          data={this.state.eventList}
          // renderItem={item => this._renderOrderList(item)}
          renderItem={(item) => { return (

           
            <View style={[styles.card, styles.elevation]} >
            
            <TouchableOpacity onPress={() => this.props.navigation.push('AddVisitor', { venue_id: item.item.id, event_name: item.item.event_name })}  style={[styles.rows,{display:"flex", flexDirection:"row",}]} >
                <View style={[{width: "85%", padding:2, display:"flex", flexDirection:"row", justifyContent:"space-between"}]}>
                  <View style={[styles.roundContainer, { backgroundColor: this.utils.getRandomColor(), textAlign:"center" }]}>
                        <AppText style={[{color:"#1C1C1C",fontWeight:"bold", fontSize:22}]}>{item.item.event_name.charAt(0).toUpperCase()}</AppText>
                  </View>
                  <View style={[{width:"100%", display:"flex", flexDirection:"column",}]}>

                  <Text style={[styles.text,{width:"80%", padding:8}]}>{item.item.event_name}</Text>
                  <Text style={[{marginLeft:10,fontSize:13,marginBottom:2, color:"gray"}]}>Location: {item.item.area_name} </Text>
                  <Text style={[{marginLeft:10,fontSize:10, color:"gray"}]}>Start At: {moment(item.item.start_date).format('YYYY-MM-DD')} | Ends At: {moment(item.item.end_date).format('YYYY-MM-DD')}</Text>
                  </View>
                    
                </View>
                {/*    */}
                <View style={[{ borderWidth:StyleSheet.hairlineWidth, width:"0.01%", height:"100%",borderColor:"#939796"}]}></View>
                {
                  ((moment(item.item.start_date).format('YYYY-MM-DD') < moment().format("YYYY-MM-DD")) && (moment(item.item.end_date).format('YYYY-MM-DD') > moment().format("YYYY-MM-DD")))
                  
                    ?
                    
                      <View style={[{width: "15%", marginLeft:10, display:"flex", justifyContent:"center", borderRadius:10,height:60, backgroundColor:"#A6F8A3"}]} >
                      <Text style={[{alignSelf:"center", fontWeight:"bold", color:"white", fontSize:18}]}> Live</Text>
                      </View>

                    :
                      (
                        ((moment(item.item.start_date).format('YYYY-MM-DD') < moment().format("YYYY-MM-DD")) && (moment(item.item.end_date).format('YYYY-MM-DD') < moment().format("YYYY-MM-DD")))
                        
                        ?
                          <View style={[{width: "15%", marginLeft:10, display:"flex", justifyContent:"center", borderRadius:10,height:60, backgroundColor:"#FB8A8D"}]} >
                          <Text style={[{alignSelf:"center", fontWeight:"bold", color:"white", fontSize:15}]}> Closed</Text>
                          </View>
                        :
                          (
                            ((moment(item.item.start_date).format('YYYY-MM-DD') > moment().format("YYYY-MM-DD")) && (moment(item.item.end_date).format('YYYY-MM-DD') > moment().format("YYYY-MM-DD")))
                            ?
                            <View style={[{width: "15%", marginLeft:10, display:"flex", justifyContent:"center", borderRadius:10,height:60, backgroundColor:"#F8EEA3"}]} >
                            <Text style={[{alignSelf:"center", textAlign:"center", fontWeight:"bold", color:"white", fontSize:15}]}> Up coming</Text>
                            </View>
                            :
                             null
                            
                        )
                    )
                    

                }
                {/* <Input  multiline   numberOfLines={2}   style={{padding: 10, backgroundColor:"white", borderRadius:20}} editable /> */}
            </TouchableOpacity>
                {/* <Separator/> */}
            </View>

        ) }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={ListEmptyComponent()}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefreshFromTop}
          onEndReached={this.handleLoadMoreFromBottom}
          ListFooterComponent={this.renderLoader}
        />
      </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#E5E5E5"},
    row: {  flex:2, justifyContent: 'center', flexDirection: "row", flexWrap: "wrap"},
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      paddingVertical: 10,
      // alignSelf: "flex-start",
      // textAlign: "center",
      // paddingHorizontal: 25,
      // backgroundColor: "#37E9DA14",
      width: '96%',
      alignSelf:'center',
      marginBottom: 10,
      // marginRight: 10,
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
      marginTop:"-30%",

    },
    title: {
      fontSize: 20,
      color: "coral",
      textAlign: "center",
      marginBottom: "10%",
      flex: 3,
      fontWeight: '700',

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
    },

    rows: {
      width: "93%", 
      height:"auto", 
      padding:20, 
      flexDirection:"column",
      // alignSelf: "flex-start",
      // borderWidth: 4,
      borderRadius: 10,
      // backgroundColor: "#37E9DA14",
      padding:8,
      borderColor: "coral",
      // marginBottom: 10,
      marginTop: 10,
  },
 

    roundContainer: { height: 50, width: 50, borderRadius: 50 / 2, alignItems: 'center', justifyContent: 'center', marginRight: 10 },

    text: { marginTop:-20, fontSize: 20 },
    boldText: { ...getFontStyles({ weight: 'Bold' }) },
    orderListContainer: { borderRadius: 10, padding: 10, elevation: 2, backgroundColor: colors.WHITE, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, marginTop: 1 },
    icon: { color: colors.WHITE, fontSize: 35, marginRight: 10 },
  });

