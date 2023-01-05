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

  const Questionaire = ({ navigation, route }) =>{
    const { claim_code, assessment_id } = route.params;
    navigation.navigate('Upload Accident Images',{claim_code: claim_code, assessment_id: assessment_id});
  }

  export default Questionaire;