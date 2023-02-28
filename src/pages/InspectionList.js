import React, { useState , useContext} from 'react';
import { Text, StatusBar, Button, StyleSheet, View, Image, TouchableOpacity, Switch,ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { colors } from '../assets/config/colors';
import Header from '../components/Header';
import Api from '../services/api';
import { getFontStyles, Utils } from '../services/utils';
import * as GLOBAL from '../assets/config/constants';
import { API_CONSTANTS } from '../assets/config/constants';
import moment from 'moment';

import { userDetails } from '../assets/config/constants';

import ListEmptyComponent from '../components/ListEmptyComponent';

export default class InspectionList extends React.Component{
    constructor(props) {
        super(props);

        this.utils = new Utils;
        this.apiCtrl = new Api;
        this.state = {
            claimLists: [],  

            // filterBy: this.props.route.params.filterBy,
            // startDate: this.props.route.params.startDate,
            // endDate: this.props.route.params.endDate,
            refreshing: false,
            loading: false,
            pageStart: 0,
            pageLength: 0,
            totalRecords: 0,
        }
    }


    handleRefreshFromTop = () => {
        console.log("Coming to top");
        this.getInspectionList(this.state.pageLength+10);
      };
    
      handleLoadMoreFromBottom = () => {
        console.log("Coming to bottom");
        this.getInspectionList(this.state.pageLength+10);
        // this.getEventList(20);
    
        // this.setState({ loading: false });
        // this.getEventList(this.state.pageStart);
        // this.getOrderList("-1", this.state.startDate, this.state.endDate, this.state.pageStart)
      }

    getInspectionList(pageLength){  
        GLOBAL.loadingVisible.setState({ loading: true });
       if(this.state.totalRecords >= this.state.pageLength){
        this.apiCtrl.callAxios(API_CONSTANTS.claimList, {   length: pageLength, status:this.props.status, claim_type:this.props.type }).then(response => {
            console.log('Responses', response);
            // this.setState({ loading: false })
            if (response.data.aaData) {

                let finalClaimList = [];
                response.data.aaData.map(item => {
                    item.bgColor = this.utils.getRandomColor();
                    finalClaimList.push(item)
                })
                GLOBAL.loadingVisible.setState({ loading: false });
                //console.log('loading false')
                this.setState({ pageLength: pageLength});
                this.setState({ totalRecords: response.data.iTotalRecords});
                this.setState({ claimLists: finalClaimList });
            } else {
                GLOBAL.loadingVisible.setState({ loading: false });
            //show popup
            }
        })
    } else {
        GLOBAL.loadingVisible.setState({ loading: false }); 
    }
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
    componentDidMount() {
        this.getInspectionList(10);
    }
    
    render(){
        var timer = '';
        function secondsToTime(date){
           var x = moment(date);
           var y = moment();

           let seconds = y.diff(x)/1000;
          //  console.log("seconds: "+seconds)
           seconds = Number(seconds);
           var d = Math.floor(seconds / (3600*24));
           var h = Math.floor(seconds % (3600*24) / 3600);
           var m = Math.floor(seconds % 3600 / 60);
           var s = Math.floor(seconds % 60);
           
           var dDisplay = d > 0 ? d + (d == 1 ? " day " : " Days ") : "";
           var hDisplay = h > 0 ? h + (h == 1 ? "": "") : "";
           var mDisplay = m > 0 ? m + (m == 1 ? " min " : " Min ") : "";
           var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
          //  console.log('TIme '+ dDisplay + hDisplay + mDisplay + sDisplay)
          if(dDisplay !== "")  {
            return {time:dDisplay , color: "#FFA6A6"}
          } else if(hDisplay !== "" && hDisplay > 2.5) {
             return {time:hDisplay+" Hour", color: "#FFE7C5"} 
            // if(hDisplay >2 ){
            // } else {
            //   return {time:hDisplay , color: "lightgreen"} 
            // }
          }else if(hDisplay !== "" && hDisplay < 2.5) {
            return {time:hDisplay+" Hour", color: "#A9FFBC"} 
          } else{
            if(hDisplay !== ""){
              return {time: hDisplay+' Hour '+mDisplay , color: "#A9FFBC"}   
            } else {

              return {time:mDisplay , color: "#A9FFBC"}   
            }
          }
           return dDisplay + hDisplay + mDisplay + sDisplay;
       }

       const handleClick = (data) => {

        console.log('Handle Click: ',data)
        console.log(this.props.status)
        switch (this.props.status){
          case '1':
            this.props.navigation.navigate("New Vehicle Detail",{params:data}) 
            break
          case '2':
            switch (data.assessment_form_step){
              case 1:
              this.props.navigation.navigate("Upload Assessment Images", { claim_code: data.claim_code, assessment_id: data.assessment_id })
              break;
              case 2:
                this.props.navigation.navigate("Questionaire",{claim_code: data.claim_code, assessment_id: data.assessment_id})
                break;
              case 3:
                this.props.navigation.navigate("Upload Accident Images",{claim_code: data.claim_code, assessment_id: data.assessment_id})
                break;
              default:
                if(data.accident_reported_to_police === 0 && data.punchnama_carried_out === 0 && data.injury_to_driver_occupant === 0 && data.third_party_involved_in_accident === 0 && data.particulars_of_third_party_injury_loss === 0){
                  this.props.navigation.navigate("Claim Form Details",{claimForm:true, claim_code: data.claim_code, assessment_id: data.assessment_id}) 
                } else {
                  // navigation.navigate("Agent Inspection List", { claim_code, assessment_id })
                  this.props.navigation.navigate("Agent Inspection List",{ claim_code: data.claim_code, assessment_id: data.assessment_id})
                }
              break;
            }
        }
       }
      //  console.log('Naviagtion', this.props)
  return (
    <View style={[styles.container]}>
        <Header goBack={() => { this.props.navigation.navigate('Dashboard') }}  
        text={'Inspection List'} 
        rightBtnIcon='bell' 
        rightBtnPress={() => { this.props.navigation.navigate('notifications') }} 
        // rightBtnIcon2='search' 
        
        bckBtn={true} 
        rightImage={true} />
        

        <FlatList
          data={this.state.claimLists}
          renderItem={(item ,key) => {   
            return (
              <TouchableOpacity style={[styles.row]} title="View Profile" onPress= {()=> handleClick(item.item) }>
                <View style={[styles.details]}>
                  <View style={[{display:"flex",flexDirection:"row",marginBottom:5, width:'50%'}]}> 
                    <Text style={{ width:80, fontWeight:'bold', fontSize:14}}>Claim No</Text> 
                    <Text>:&nbsp;&nbsp;</Text>  
                    <Text >{item.item.claim_code}</Text>
                  </View>
                  <View style={[{display:"flex",flexDirection:"row",marginBottom:5, width:'50%'}]}> 
                    <Text style={{ width:80, fontWeight:'bold', fontSize:14}}>Reg No</Text> 
                    <Text >:&nbsp;&nbsp;</Text>  
                    <Text >{item.item.vehicle_registration_no}</Text>
                  </View>
                  <View style={[{display:"flex",flexDirection:"row",marginBottom:5, width:'50%'}]}> 
                    <Text style={{ width:80, fontWeight:'bold', fontSize:14}}>Work Shop</Text> 
                    <Text >:&nbsp;&nbsp;</Text>  
                    <Text >Nano</Text>
                  </View>
                  <View style={[{display:"flex",flexDirection:"row",marginBottom:5, width:'50%'}]}> 
                    <Text style={{ width:80, fontWeight:'bold', fontSize:14}}>Location</Text> 
                    <Text >:&nbsp;&nbsp;</Text>  
                    <Text >{item.item.place_of_accident}</Text>
                  </View>
                    {this.props.status === '2'
                      ?
                        <>
                          <View style={[{display:"flex",flexDirection:"row",marginBottom:5, width:'50%'}]}> 
                            <Text style={{ width:80, fontWeight:'bold', fontSize:14}}>Status</Text> 
                            <Text >:&nbsp;&nbsp;</Text>  
                            <Text style={[{color:"#FFC804"}]} >InProgress</Text>
                          </View>
                          <View style={[{position:'absolute',top:0, right:20, padding:5, paddingLeft:15,borderBottomLeftRadius:10,borderTopLeftRadius:10, backgroundColor:"#FFA6A6", width:"auto"}]}>
                            <Text>{secondsToTime(item.item.created_at).time}</Text>
                          </View>
                        </>
                      :
                        this.props.status === '4' 
                        ?
                          <View style={[{display:"flex",flexDirection:"row",marginBottom:5, width:'50%'}]}> 
                            <Text style={{ width:80, fontWeight:'bold', fontSize:14}}>Status</Text> 
                            <Text >:&nbsp;&nbsp;</Text>  
                            <Text style={[{color:"#189333"}]} >Completed</Text>
                          </View>
                        :
                          <View style={[{position:'absolute',top:0, right:20, padding:5, paddingLeft:15,borderBottomLeftRadius:10,borderTopLeftRadius:10, backgroundColor:secondsToTime(item.item.created_at).color, width:"auto"}]}>
                            <Text>{secondsToTime(item.item.created_at).time}</Text>
                          </View>
                    }
                </View>
                
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<ListEmptyComponent />}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefreshFromTop}
          onEndReached={this.handleLoadMoreFromBottom}
          ListFooterComponent={this.renderLoader}
        />
        <View style={[{height:60}]}></View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:"center",
        // alignItems:"center",
        backgroundColor:'#E5E5E5'
   
    },
    text:{
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 20
    },
    button:{
        paddingTop: 20
    },
    row: {
        
        // borderWidth: 4,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        // padding:20,
        // borderColor: "coral",
        // marginBottom: 8,
        // alignItems: "right",
        width:"95%",
        marginTop: 10,
        // textAlign:"left",
        // justifyContent: 'center',
        alignSelf: 'center',
        
        flexDirection:"row",
        display:"flex",
        position: 'relative',

        // justifyContent:"space-evenly"
       
    },
    details:{ margin:"5%", width:"100%"}
})

const imgStyles = StyleSheet.create({
    container: {
      paddingTop: 10,
    },
    img: {
        width: "30%",
        height: "100%",
        alignSelf: 'flex-start'
    },
    tinyLogo: {
      width: 66,
      height: 58,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });