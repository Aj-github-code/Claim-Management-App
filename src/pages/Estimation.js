import React from 'react'

import { Text, StatusBar, Button, StyleSheet, View, SafeAreaView, TouchableOpacity, Pressable , ScrollView, TextInput  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SelectList } from 'react-native-dropdown-select-list';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {default as FontAwesome} from 'react-native-vector-icons/FontAwesome';

export default function Estimation(props) {
    
    const navigation = useNavigation();
    const [selected, setSelected] = React.useState("");
    const remark = [{
                        key:1,
                        value:"Repair",
                    },
                    {
                        key:2,
                        value:"Replacement",
                    }];
    let count = 0;

    const Data = {
   
            "Metal":[{
                    "title":"Wheel Rim LHS FR",
                    "estimated_amt":"15400",
                    "dealer_remark":"replacement",

            
            }],
            "Labour Charges": [{
                "title":"Tie Rod End LHS",
                "estimated_amt":"6661",
                "dealer_remark":"repair",
            },
            {
                "title":"Resonator Box",
                "estimated_amt":"640",
                "dealer_remark":"repair",
            },
            {
                "title":"W/S Glass Laminated FR",
                "estimated_amt":"6000",
                "dealer_remark":"repair",
            },
            {
                "title":"Tie Rod End LHS",
                "estimated_amt":"1500",
                "dealer_remark":"repair",
            }]
            
        
    }
  return (
      <SafeAreaView style={[styles.container]}>
    
         <ScrollView style={[{width:"100%", flexGrow: 1}]} >
             <View style={[styles.container]} >

            {Object.entries(Data).map(([key, value])=>{
                return(
                    
                    <View style={[{width:"100%"}]}>
                        
                            <Text style={[styles.text,{padding:8, marginLeft:10,fontSize:18}]}>
                                {key}
                            </Text>
                            {Object.entries(value).map(([keys, values])=>{
                                
                                count = count+1;
                                return(
                                    <View style={[styles.container]}>

                                        <View style={[styles.rows]}>

                                            <View style={[{display:"flex", flexDirection:"row"}]}>

                                                <Text style={[{width:35, padding:10, fontSize:15,fontWeight:"bold", textAlign:"center", borderRadius:12, backgroundColor:"#F7C266"}]}>{count}</Text>
                                                <Text style={[{marginLeft:10, fontWeight:"bold", fontSize:18, marginVertical:"1%"}]}>{values.title}</Text>

                                            </View>
                                            <View style={[{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:20, padding:10}]}>

                                                <View style={[styles.categoryContainer,{width:"48.99%"}]}>

                                                    <View style={[styles.categoryContainer,{height:55}]}>

                                                        <Text style={[styles.label]}>Estimated (Amt Rs)</Text>
                                                        <Text style={[{fontSize:18,fontWeight:"bold", padding:10}]}>{values.estimated_amt}</Text>

                                                    </View>
                                                    <View style={[styles.categoryContainer,{marginTop:2,height:70}]}>

                                                        <Text style={[styles.label]}>Dealer Remark</Text>
                                                        <Text style={[{fontSize:18,fontWeight:"bold", paddingLeft:10, paddingTop:20}]}>{values.dealer_remark}</Text>

                                                    </View>
                                                    <View style={[styles.categoryContainer,{marginTop:10,height:55}]}>

                                                        <Text style={[styles.label]}>Remove Refit</Text>
                                                        <TextInput  multiline   numberOfLines={1}   style={{width:"93%", borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor:"#F7C266"}} editable />

                                                    </View>
                                                </View>
                                                
                                                <View style={[{ borderWidth:StyleSheet.hairlineWidth, width:"0.01%", height:"100%",borderColor:"#F95D61"}]}></View>
                                                <View style={[styles.categoryContainer,{width:"50%", marginLeft:12}]}>

                                                    <View style={[styles.categoryContainer,{height:55}]}>

                                                        <Text style={[styles.label]}>Estimated (Amt Rs)</Text>
                                                        <TextInput  multiline numberOfLines={1}   style={{width:"100%", borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor:"#F7C266"}} editable />
                                                  
                                                    </View>
                                                    <View style={[styles.categoryContainer,{marginTop:4,height:70}]}>

                                                        <Text style={[styles.label]}>Agent Remark</Text>
                                                        <SelectList data={remark}
                                                        setSelected={setSelected} 
                                                        placeholder="Select Remark"
                                                        boxStyles={{marginTop:10,marginBottom:10}}
                                                        dropdownStyles={{height:80, width:"100%",bottom:60, right:0,position:"absolute", backgroundColor:"rgba( 255, 255, 255, 0.65 )"}}
                                                        maxHeight={150}
                                                        />
                                                    </View>
                                                    <View style={[styles.categoryContainer,{marginTop:10,height:55}]}>
                                                        
                                                        <Text style={[styles.label]}>Painting</Text>
                                                        <TextInput  multiline   numberOfLines={1}   style={{width:"100%", borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor:"#F7C266"}} editable />

                                                    </View>
                                                </View>
                                            </View>

                            
                                        </View>
                                    </View>
                                )
                            })}
                            </View>
           
           )
        })}
            </View>
            <View style={[{height:80}]}></View>
        </ScrollView>
            <View style={[styles.footer]}>
                <TouchableOpacity style={[styles.button]} onPress= {() => navigation.navigate("Agent Review Images")}>
                    <Text style={[styles.buttonText]}>Submit</Text>
                </TouchableOpacity>
            </View>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        
        
    },
    categoryContainer: {
        display:"flex", flexDirection:"column",
    },
    separator: {
        
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text:{
        fontWeight: "bold",
        fontSize: 16,
        paddingBottom: 10,
        width:"100%",
    },
    label: {
        fontSize:12, 
        color:"#939796",
    },
    footer:{
        position:"absolute", 
        left:0, 
        right:0, 
        bottom:0,
        flex:0.1, 
        display: "flex", 
        justifyContent:"space-around",
        backgroundColor:"#333333", 
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
    row: {
        width: "100%", 

    },
    rows: {
        width: "95%", 
        height:"auto", 
        padding:20, 
        flexDirection:"column",
        // alignSelf: "flex-start",
        // borderWidth: 4,
        borderRadius: 10,
        backgroundColor: "#FFF7E8",
        padding:8,
        // borderColor: "coral",
        // marginBottom: 10,
        marginTop: 10,
    },
   
})

