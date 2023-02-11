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
  import  Icon  from "react-native-vector-icons/EvilIcons";

// import * as ImagePicker from 'expo-image-picker'



  const UploadAssessmentImages = ({ navigation, route }) =>{
    

    const { claim_code, assessment_id } = route.params;
    const [Loading, setLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);

    const [Data, setData] = useState({});
    const [tempData, setTempData] = useState({});

    useEffect(()=>{
      
      NewApiController(
        API_CONSTANTS.getAssessmentDetailProduct,
        { assessment_id: assessment_id },
        "POST",
        userDetails.access_token
      )
        .then(({ data, status }) => {
          // console.log(data, "daaaa", status);
          if (status === 200 || status === 201) {

            setData(data.data);
            setTempData(data.data)
          }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error"); 
      });
  },[]);


  const handleImageUploadCheck = (data) => {
    var temp = tempData;
    delete temp[`${data}`];

    setTempData(temp);
  console.log(Object.keys(temp).length)
    if(Object.keys(temp).length === 0){
      ToastAndroid.show( `Estimation Updated Successfully!` , ToastAndroid.SHORT);
      navigation.navigate("Questionaire",{claim_code: claim_code, assessment_id: assessment_id})
      setIsDisabled(false)
    }
  }
  

    return(
      <>
        <View>
          <Header
            // goBack={() => {
            //   navigation.pop();
            // }}
            text={"Agent Review Images"}
            // rightBtnIcon="bell"
            // rightBtnIcon2="search"
            // bckBtn={true}
            rightImage={true}
          />
          <ScrollView style={[{width:"100%", flexGrow: 1}]} >
      
            {!Loading && (
              <>
                {Object.entries(Data).map(([ind, val]) => {
                  // console.log(ind, '>>>', val)
                  return (
                    <>
                     <ReviewImages {...val} key={ind} row_id={ind} assessment_id={assessment_id}  imageUploadCheck={handleImageUploadCheck} />
                    </>
                  );
                })}
              </>
            )}
        
            <TouchableOpacity
              disabled={isDisabled}
              // onPress={() =>
              //   navigation.navigate("Agent Inspection List", { claim_code, assessment_id })
              //   // navigation.navigate("Upload Assessment Images", { claim_code, assessment_id })
              // }
              style={{
                marginHorizontal: 16,
                marginVertical: 29,
                backgroundColor: (isDisabled == true) ? "lightgrey": colors.THEME,
                height: 48,
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: colors.WHITE }}>Submit</Text>
            </TouchableOpacity>
       
            <View style={{height:50}}></View>
          </ScrollView>
        </View>
      </>
    )
  }

  export default UploadAssessmentImages;


  const ReviewImages = (props) => {
    

  const [Loading, setLoading] = useState(true);
  const [cameraPhoto, setCameraPhoto] = useState(null);

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
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
        uploadReviewImage(`data:image/png;base64,${result.assets[0].base64}`);
      }
      
      console.log(result)
      return result;
    }
  }


  const uploadReviewImage = (image) => {
      
    NewApiController(
      API_CONSTANTS.uploadAssessmentImages,
      { 
        id: props.id, 
        images: image, 
        assessment_id:props.assessment_id,
        form_step:4, 
      },
      "POST",
      userDetails.access_token
    )
      .then(({ data, status }) => {
        console.log(data, "daaaa", status);
        if (status === 200 || status === 201) {
          props.imageUploadCheck(props.row_id)
          ToastAndroid.show( `${props.product_info.product} Image Uploaded Successfully!` , ToastAndroid.SHORT)
        }
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      console.log(err, "error"); 
    });
  }

  return(
    <View
    style={{
      flexDirection: "row",
      backgroundColor: colors.WHITE,
      marginBottom: 10,
      justifyContent: "space-between",
    }}
  >
    <View style={{ marginLeft: 16 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: colors.THEME,
          marginTop: 16,
          marginBottom: 5,
        }}
      >
        {props.product_info.product}
      </Text>

    </View>
    <View 
      style={{
        flexDirection: "row",
        backgroundColor: colors.WHITE,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        // onPress={captureImage}
        style={{
          width: 51,
          height: 47,
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `rgba(24, 56, 131, 0.09)`,
          marginVertical: 15,
          marginRight: 15,
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
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `rgba(24, 56, 131, 0.09)`,
          marginVertical: 15,
          marginRight: 15,
        }}
        // disabled={item.isChecked === false ? true : false}
      >
        <Icon name={'camera'} size={35} light color={colors.THEME} />
      </TouchableOpacity>
    {/* <Image source={{uri: cameraPhoto}} /> */}
    </View>
  </View>
  )
  }