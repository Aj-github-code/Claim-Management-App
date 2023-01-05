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
    Video,
    PermissionsAndroid,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import Header from "../components/Header";
  import { colors } from "../assets/config/colors";
  import * as ImagePicker from "expo-image-picker";
  import NewApiController from "../services/NewApiController";
  import { API_CONSTANTS, userDetails } from "../assets/config/constants";
  import  Icon  from "react-native-vector-icons/EvilIcons";
//   import Video from "react-native-video";

  const UploadAccidentImages = ({ navigation, route }) =>{
    // navigation.navigate('Upload Accident Images',{claim_code: claim_code, assessment_id: assessment_id});
    const [Loading, setLoading] = useState(true);
    const { claim_code, assessment_id } = route.params;
    const [photos, setPhotos] = useState([]);
    const [video, setVideo] = useState(null);

    const RecordVideo = async () => {
    
        const result = await ImagePicker.requestCameraPermissionsAsync();
        
        if (result.granted === false) {
          alert("You've refused to allow this app to access your photos!");
    
        } else {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            aspect: [1, 1],
            quality: 1,
            base64: true,
            allowsMultipleSelection: false,
            selectionLimit: 0,
          });
      
          if (!result.canceled) {
            setVideo( `data:video/mp4;base64,${result.assets[0].base64}`);
            // setVideo(result.assets[0].uri);
            uploadAccidentImage(`data:video/mp4;base64,${result.assets[0].base64}`, 'video');
          }
          
        //   console.log(result.assets[0].uri)
          return result;
        }
      }

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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [1, 1],
            quality: 1,
            base64: true,
            allowsMultipleSelection: false,
            selectionLimit: 0,
          });
      
          if (!result.canceled) {
            setPhotos([...photos, `data:image/png;base64,${result.assets[0].base64}`]);
            uploadAccidentImage(`data:image/png;base64,${result.assets[0].base64}`, 'image');
          }
          
        //   console.log(result)
          return result;
        }
      }

      const uploadAccidentImage = (image, category) => {
      console.log(userDetails.access_token + '  ', claim_code+'  ', image)
        NewApiController(
          API_CONSTANTS.uploadAccidentImage,
          { 
            accident_details:{
                0:{
                    claim_code:claim_code,
                    image:image,
                    category:category,
                }
            },
            // id: props.id, 
            // images: image, 
            // assessment_id:props.assessment_id,
            form_step:4, 
          },
          "POST",
          userDetails.access_token
        )
          .then(({ data, status }) => {
            console.log(data, "daaaa", status);
            if (status === 200 || status === 201) {
              
              ToastAndroid.show(`Accident ${category.toUpperCase()} Uploaded Successfully!` , ToastAndroid.SHORT)
            }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "error"); 
        });
      }

      const handleRedirect =() =>{
        navigation.navigate('New Inspection')
      }
    return(
  
           <View>
                <Header
                    goBack={() => {
                    navigation.pop();
                    }}
                    text={"Upload Accident Images"}
                    rightBtnIcon="bell"
                    rightBtnIcon2="search"
                    bckBtn={true}
                    rightImage={true}
                />
                <ScrollView style={[{width:"100%", flexGrow: 1}]} >
                    <View style={{ backgroundColor: colors.WHITE, paddingBottom:30, padding:20 }}>
                        <View style={{flexDirection:'row', flexWrap:"wrap", width:"100%"}} >

                            {photos.map((value, index)=>{
                                // <Image source={uri:}
                                return  <Image source={{uri: value}}  style={{
                                    height: 80,
                                    width: 110,
                                    margin:8,
                                    borderRadius:10,
                                }} />
                            })}
                        </View>
          
                        <TouchableOpacity
                            onPress={openCamera}
                            style={{
                            width: 100,
                            height: 90,
                            borderRadius: 4,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf:"center",
                            backgroundColor: `rgba(24, 56, 131, 0.09)`,
                            marginVertical: 15,
                            marginRight: 15,
                            }}
                            // disabled={item.isChecked === false ? true : false}
                        >
                            <Icon name={'camera'} size={80} light color={colors.THEME} />
                            <Text style={[styles.boldText]} >Add Images</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: colors.WHITE, paddingBottom:30, padding:20, marginTop:10 }}>
    
                   {/* {(video !== null) ? <Video style={{height:200, width:400}} source={{uri: video}} /> : ''} */}
                        <TouchableOpacity
                            onPress={RecordVideo}
                            style={{
                            width: 100,
                            height: 90,
                            borderRadius: 4,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf:"center",
                            backgroundColor: `rgba(24, 56, 131, 0.09)`,
                            marginVertical: 15,
                            marginRight: 15,
                            }}
                            // disabled={item.isChecked === false ? true : false}
                        >
                            <Icon name={'play'} size={80} light color={colors.THEME} />
                            <Text style={[styles.boldText]} >Record Video</Text> 
                        </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            
                            onPress={
                            handleRedirect
                            }
                            style={{
                                
                                backgroundColor: colors.THEME,
                                height: 48,
                                width: "80%",
                                marginTop:10,
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                borderRadius: 5,
                            }} >
                            <Text style={{ color: colors.WHITE }}>Complete Inspection</Text>
                        </TouchableOpacity >

                        <View style={{height:50}}></View>
                </ScrollView>
            </View>
    
    )
  }

  export default UploadAccidentImages;

  
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
  