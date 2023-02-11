import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Alert,
    ToastAndroid,
    PermissionsAndroid,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import Header from "../components/Header";
  import { colors } from "../assets/config/colors";
  import * as ImagePicker from "expo-image-picker";
  import NewApiController from "../services/NewApiController";
  import { API_CONSTANTS, userDetails } from "../assets/config/constants";
  import Icon  from "react-native-vector-icons/EvilIcons";
  import ListEmptyComponent from "../components/ListEmptyComponent";
  const Questionaire = ({ navigation, route }) =>{
    
    const [Loading, setLoading] = useState(true);
    const [Data, setData] = useState({});
    const [tempData, setTempData] = useState({});

    const { claim_code, assessment_id } = route.params;
    // const claim_code = "oakSHA2iMu5v";

    const [range, setRange] = useState(5);
    const [page, setPage] = useState(1);
  
  
    // console.log(userDetails.access_token, "hala u", claim_code);
    useEffect(() => {
      
      NewApiController(
        API_CONSTANTS.qustionAnswerList,
        { claim_code: claim_code },
        "POST",
        userDetails.access_token
      )
        .then(({ data, status }) => {
          console.log('res')
          if (status === 200 || status === 201) {
            console.log(data.data, "daaaa", status);
            setData(data.data);
            setTempData(data.data)
            // console.log('On Start', 'Count', Object.keys(Data).length, 'Loading', Loading)
            setLoading(false);
          }
        })
        .catch((err) => {
          // setLoading(false);
          console.log(err, "error"); 
        });
    }, []);



    const handleRemovePoint = (data) => {
      var temp = tempData;
      delete temp[`${data}`];
  
      setTempData(temp);

     
    }

    const handleNextPage = () => {
      let count = 0;
      ((tempData != null) && (typeof tempData !== 'undefined')) && ((Object.keys(tempData).length > 0) &&    
     ( Object.entries(tempData).map(([ind, val]) => {
        // console.log('Max',(range*page))
        if(((range*page) > ind) && ( (range*(page-1)) <= ind )){
          count = count + 1;
        }
      })))
      console.log(count)
      if(count > 0){
        ToastAndroid.show( `All Inspection Checkup Points Are Compulsory!` , ToastAndroid.SHORT);
      } else {

        setPage((page+1))
      }

      if(Object.keys(tempData).length === 0){
        ToastAndroid.show( `Inspection Checkup Point Completed!` , ToastAndroid.SHORT);
        setTimeout(()=>{navigation.navigate("Upload Accident Images",{claim_code: claim_code, assessment_id: assessment_id}), 1500})
      }
    }
    
    const skipPage = () => {
      ToastAndroid.show( `No Records Found! Redirecting to next Page` , ToastAndroid.SHORT)
      setTimeout(()=>{
        navigation.navigate("Upload Accident Images",{claim_code: claim_code, assessment_id: assessment_id}), 1500})
    }
    return(
      <>
        <View>
          <Header
            // goBack={() => {
            //   navigation.pop();
            // }}
            text={"Inspection Checkup Points"}
            rightBtnIcon="bell"
            rightBtnPress={() => { navigation.navigate('notifications') }} 
            // bckBtn={true}
            rightImage={true}
          />

          <ScrollView style={[{width:"100%", flexGrow: 1, marginTop: 5}]} >
          {!Loading && (
            <>
              {
                ((Data != null) && (typeof Data !== 'undefined')) && 
                (Object.keys(Data).length > 0) ?
            
                (Object.entries(Data).map(([ind, val]) => {
                  // console.log('Max',(range*page))
                  if(((range*page) > ind) && ( (range*(page-1)) <= ind )){

                    return (
                      <QNA 
                        {...val} 
                        claim_code={claim_code}
                        key={ind}   
                        unique_id={ind}
                        // assessment_id={assessment_id} 
                        removepoint={handleRemovePoint} 
                      />
                    );
                  }
                  
              }))
              :
              
              skipPage()
                
              
            }
            </>
          )} 
          <TouchableOpacity
            onPress={() =>
              {
                handleNextPage()
               
              } 
            }
            style={{
              marginHorizontal: 16,
              marginVertical: 29,
              backgroundColor: colors.THEME,
              height: 50,
              width: "90%",
              // position:'absolute',
              // bottom:20,
              
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: colors.WHITE }}>Next</Text>
          </TouchableOpacity>
            <View style={{height:100}}></View>
          </ScrollView>
       </View>
      </>
    )

    // navigation.navigate('Upload Accident Images',{claim_code: claim_code, assessment_id: assessment_id});
  }

  export default Questionaire;



  const QNA = ({claim_code, question, campaign_answer,removepoint, unique_id}) => {

    const [radioSelected, setRadioSelected] = useState(0);
    const [answer, setAnswer] = useState(null);
    const radioClick = (id, answers) => {
      setRadioSelected(id)
      // setAnswer(answers)
      if(answers !== 'Safe'){
        openCamera(answers)
      }
      removepoint(unique_id)
      console.log(answers);
    }

    

    const [cameraPhoto, setCameraPhoto] = useState(null);

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const submit = (answer, image) => {
    var data = {inspection_details: { 
                  0:{
                    claim_code: claim_code,
                    image: image,
                    damage: answer,
                    category: question

                  }}}
                  console.log(data)
    NewApiController(
      API_CONSTANTS.storeInspectionDetails,
     data,
      "POST",
      userDetails.access_token
    )
      .then(({ data, status }) => {
        console.log('res', data, 'Status', status)
        if (status === 200 || status === 201) {
          console.log(data.data, "daaaa", status);
          ToastAndroid.show( `${question} Inspection Completed!` , ToastAndroid.SHORT);
          removepoint(unique_id)
          // console.log('On Start', 'Count', Object.keys(Data).length, 'Loading', Loading)
          // setLoading(false);
        } 
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err, "error"); 
      });
  }

  const openCamera = async (answer) => {
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA,
    // );
    // if(granted === PermissionsAndroid.RESULTS.GRANTED){
    //   const result = await launchCamera(options);
    //   setCameraPhoto(result.assets[0].uri);
    // }
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    // if (!result.canceled) {
    //   setCameraPhoto(result.assets[0].uri);
    // }
    const result = await ImagePicker.requestCameraPermissionsAsync();
    
    if (result.granted === false) {
      alert("You've refused to allow this app to access your photos!");

    } else {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
        base64: true,
        allowsMultipleSelection: false,
        selectionLimit: 0,
      });
  
      if (!result.canceled) {
        setCameraPhoto(`data:image/png;base64,${result.assets[0].base64}`);
        submit(answer, `data:image/png;base64,${result.assets[0].base64}`);
      }
      
      // console.log(result)
      return result;
    }
  }

    return(
      <>
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
              {question}
            </Text>
            <View style={{
              padding:17,
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between'

            }}>

              {
                ((campaign_answer != null) && (typeof campaign_answer !== 'undefined')) && (Object.keys(campaign_answer).length > 0) &&
              Object.entries(campaign_answer).map(([ind, val]) => {
                    
                return(<TouchableOpacity key={val.id} style={{alignItems:"center"}} onPress={()=>{radioClick(val.id, val.answers)}}>
                  <View style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {
                      val.id == radioSelected ?
                        <View style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor: '#000',
                        }} />
                        : null
                    }
                  </View>
                  <Text>{val.answers}</Text>
                </TouchableOpacity>)
                
              })}
              <View
                style={{
                  
                  display:'flex',
                  flexDirection:'row',
                  justifyContent:'space-around'
    
                }}>

              <TouchableOpacity
                // onPress={captureImage}
                style={{
                  width: 51,
                  // height: 47,
                  padding:1,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: `rgba(24, 56, 131, 0.09)`,
                  // marginVertical: 15,
                  // marginRight: 15,
                }}
                // disabled={item.isChecked === false ? true : false}
              >
                {(cameraPhoto !== null) ?
                <Image source={{uri: cameraPhoto}}  style={{
                  height: 40,
                  width: 40,
                }} />
                :
                  <>
                <Icon name={'image'} size={35} light color={colors.THEME} />
                <Text
                  style={{ fontSize: 10, marginTop: 2, color: colors.THEME }}
                  >
                  No Image
                </Text>
                  </>
                
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={openCamera}
                style={{
                  width: 51,
                  height: 47,
                  marginLeft:4,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: `rgba(24, 56, 131, 0.09)`,
                  // marginVertical: 15,
                  // marginRight: 15,
                }}
                // disabled={item.isChecked === false ? true : false}
              >
                <Icon name={'camera'} size={35} light color={colors.THEME} />
              </TouchableOpacity>
              </View>
                {/* <Image source={{uri: cameraPhoto}} /> */}
            </View>
          </View>
      </>
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
  