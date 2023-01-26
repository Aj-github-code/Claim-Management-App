import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NewApiController from "../services/NewApiController";
import { API_CONSTANTS, userDetails } from "../assets/config/constants";
import { colors } from "../assets/config/colors";
import { SelectList } from 'react-native-dropdown-select-list';
import { Alert } from "react-native";

function AgentInspectionList({ navigation, route }) {
  const { claim_code, assessment_id } = route.params;
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState({});
  const [state, setState] = useState({
    estimationDetails:{},
  });



  // console.log(userDetails.access_token, "hala u", claim_code);
  useEffect(() => {
    NewApiController(
      API_CONSTANTS.getAssessmentDetailsNew,
      { assessment_id: assessment_id },
      "POST",
      userDetails.access_token
    )
      .then(({ data, status }) => {
        if (status === 200 || status === 201) {
          console.log(data.data, "daaaa", status);
          setData(data.data.assessmentDetails);
     
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err, "error"); 
      });
  }, []);


  const handleRemoveEstimation = (data) => {
    var temp = Data;
    delete temp[`${data}`];

    setData(temp);
  
    if(Object.keys(temp).length === 0){
      ToastAndroid.show( `Estimation Updated Successfully!` , ToastAndroid.SHORT);
      navigation.navigate("Upload Assessment Images",{claim_code: claim_code, assessment_id: assessment_id})
    }
  }

  return (
    <View>
      <Header
        goBack={() => {
          navigation.pop();
        }}
        text={"Agent Inspection List"}
        rightBtnIcon="bell"
        rightBtnPress={() => { navigation.navigate('notifications') }} 
        bckBtn={true}
        rightImage={true}
      />
       <ScrollView style={[{width:"100%", flexGrow: 1, marginTop: 5}]} >
      {!Loading && (
        <>
          {Object.entries(Data).map(([ind, val]) => {
            return (
              <Products 
                {...val} 
                key={ind}   
                assessment_id={assessment_id} 
                removeEstimation={handleRemoveEstimation} 
              />
            );
          })}
        </>
      )}
      <View style={{height:50}}></View>
      </ScrollView>
    </View>
  );
}

export default AgentInspectionList;


export function Products(props){

  const [disable, setDisable] = React.useState(false)
  const [Loading, setLoading] = useState(true);
  const [selected, setSelected] = React.useState(props.remark.toLowerCase());
  const remark = [{
      key:"repair",
      value:"Repair",
    },
    {
        key:'replace',
        value:"Replace",
    },{
      key:'open',
      value:"Kept Open",
    }
  ];

  const [request, setRequest] = React.useState({});
  const [assessed, setAssessed] = React.useState(Math.floor(props.amount_after_tax).toFixed(0));

  
  useEffect(()=>{
    setRequest((prev) =>({...prev, 
      product:{...prev.product, 
        0:{
          product_id:props.product_id,
          assessment_detail_id:props.id,
          remark: selected,
          amount_after_tax:`${assessed}`
        }
      }}))
      
  },[assessed]);

  const handleServices = (data) =>{
    setRequest((prev) =>({...prev, 
      product:{...prev.product, 
        [data.position]:{
        product_id:data.product_id,
        assessment_detail_id:data.id,
        amount_after_tax:data.amount_after_tax
      }
    }}))
  }


  const handleSubmit = () => {
    Alert.alert(
      'Update Assessment',
      "These Changes won't be reverted!", // <- this part is optional, you can pass an empty string
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          console.log(request);
          NewApiController(
            API_CONSTANTS.updateAssessmentDetails,
            { assessment_id: props.assessment_id, product :request.product, form_step:3},
            "POST",
            userDetails.access_token
            )
            .then(({ data, status }) => {
              console.log(data, "Assessment Update", status);
              if (status === 200 || status === 201) {
               
               setDisable(true);
               ToastAndroid.show( `${props.product_info.product} Updated Successfully!` , ToastAndroid.SHORT)
               
               props.removeEstimation(props.batch_code);
              }
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err, "error"); 
            });
        }},
      ],
      {cancelable: false},
    );
  }


  return(
    <View
    style={{
      backgroundColor: colors.WHITE,
      marginBottom: 10,
      borderRadius: 12,
    }}
  >
    <Text
      style={{
        backgroundColor: colors.SUBHEADERBACKGROUND,
        padding: 10,
        fontSize: 16,
        fontWeight: "600",
        color: colors.WHITE,
        paddingLeft: 7,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    >
      {props.category}
    </Text>
    <View style={{
      padding:17,
      display:'flex',
      flexDirection:'column',

    }}>
      <Text
        style={{
          color: colors.THEME,
          fontSize: 12,
        }}
      >
        HSN Code: {props.hsn_code}
      </Text>
      <Text
        style={{
          color: colors.THEME,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {props.product_info.product}
      </Text>


      <View style={{
          backgroundColor: colors.SUBBOXBACKGROUND,
          padding:17,  
          marginTop:10,
          display:'flex',
          justifyContent:'space-between',
          flexDirection:'row',}}>
        <View style={{
          
          display:'flex',
          flexDirection:'column',

        }}>

          <Text style={[styles.boldText,{
       
          }]}>
            Estimate Amt (&#8377;)
          </Text>
          <Text style={[
            styles.text
            ]}>
              {Math.floor(props.estimate_amt)}/-
          </Text>
        </View>
        <View style={{

          display:'flex',
          flexDirection:'column',

        }}>
          <Text style={[styles.boldText,{
          }]}>Dealer Remark</Text>
          <Text style={[styles.text,{
          }]}>{props.remark.toUpperCase()}</Text>
        </View>
      </View>
      <View style={{marginTop:10}}>
        <View style={{  
               display:'flex',
               flexDirection:'row',
               justifyContent:'space-between',
               marginBottom:6,
            }}>
            <Text style={[
                styles.boldText
            ]}> 
              Agent Remark
            </Text>
            <SelectList data={remark}
              setSelected={setSelected} 
              dropdownTextStyles={[{textAlign:'center'}]}
              boxStyles={[styles.TextInput]}
              placeholder={props.remark ? props.remark.toUpperCase() : 'Select Remark'}
              dropdownStyles={[styles.dropdownStyles]}
              onSelect={() => console.log(selected)} 
              maxHeight={150}
              />
        </View>
        <View style={{
               display:'flex',
               flexDirection:'row',
               justifyContent:'space-between',
               marginBottom:6,
            }}>
            <Text style={[
                styles.boldText
            ]}> 
               Assessed Amt (&#8377;) 
            </Text> 
            <Text style={[styles.descriptionText]}> QTY: {props.qty } || GST: {props.gst} % </Text>
            <TextInput style={[
                styles.TextInput
              ]}  
              keyboardType='numeric'
              value={assessed}
              placeholder="Amount"
              onChangeText={text => setAssessed(text)}
              editable />
        </View>
        {
          
        Object.entries(props.services).map(([_, vals]) => {
          
          return(
            <>
              <Services {...vals} key={_} func={handleServices} position={(++_)} /> 
            </>
          )
        })}

        <TouchableOpacity 
          disabled={disable}
          onPress={
            handleSubmit 
          }
          style={{
            
            backgroundColor: (disable == true) ? "lightgrey": colors.THEME,
            height: 48,
            width: "100%",

            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 5,
          }} >
          <Text style={{ color: colors.WHITE }}>Submit</Text>
        </TouchableOpacity >
      </View>
    </View>
  </View>
  );
};


export const Services = (props) => {


  
  const [amt, setAmt] = React.useState((props.amount_after_tax !== '') ? Math.floor(props.amount_after_tax).toFixed(0) : null)


  useEffect(()=>{
    props.func({
      position: props.position, 
      product_id:props.product_id, 
      id:props.id, 
      amount_after_tax:amt
    })
  },[amt])


  return(
    
    <View style={{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:6,
   }}>

      <Text style={[
         styles.boldText
         ]}> {props.product_info.product} Charges (&#8377;)</Text>
      <Text style={[styles.descriptionText]}> GST: {props.gst} % </Text>
      <TextInput  
        name={props.product_info.product} 
        // defaultValue={} 
        value={amt}
        keyboardType='numeric' 
        onChangeText={text => setAmt(text)} 
        style={[styles.TextInput]}  
        placeholder="Amount" 
        editable 
      />
   </View>
  )
}
const styles = StyleSheet.create({
  boldText:{
    color: colors.THEME,
    fontWeight:"600",
    alignSelf:"center",
    
  },
  text:{
    color: colors.THEME,
    alignSelf:"center",
  },
  TextInput:{
    width:200, 
    height:45, 
    borderRadius:4,
     borderWidth:1,  
     textAlign:"center", 
     borderColor:colors.THEME
  },
  dropdownStyles:{
    height:"auto", 
    width:"100%",
    bottom:60, 
    right:0,
    position:"absolute", 
    backgroundColor:"rgba( 255, 255, 255, 0.65 )"
  },
  descriptionText:{
    fontSize:8, 
    fontStyle:'italic', 
    color:"lightgrey", 
    alignSelf:"center",
  }
});
