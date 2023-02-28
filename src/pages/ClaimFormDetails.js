import { StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import NewApiController from "../services/NewApiController";
import { API_CONSTANTS, userDetails } from "../assets/config/constants";
import Header from "../components/Header";
import { colors } from "../assets/config/colors";
import ClaimDetails from "./CommonComponents/ClaimDetails";

const LabelText = ({ label, value }) => (
  <Text
    style={{
      color: colors.THEME,
      fontSize: 14,
      fontWeight: "600",
      paddingVertical: 5,
      paddingHorizontal: 16,
    }}
  >
    {label} : <Text>{value}</Text>
  </Text>
);
const ClaimFormDetails = ({ route, navigation}) => {
  const { claim_code, assessment_id } = route.params;
  const [ClaimData, setClaimData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [
    isStartInvestigationButtonPressed,
    setIsStartInvestigationButtonPressed,
  ] = useState(route.params.claimForm);
  const formateDate = (date, isTimeToBeDisplayed = false) => {
    let dates;
    if((date !== null) && (date !== '')){

      if (date.toString().includes("T")) {
        dates = date.split("T");
      } else {
        dates = date.split(" ");
      }
  
      return isTimeToBeDisplayed ? dates[1] : dates[0];
    } else {
      return "00/00/0000 00:00"
    }
  };

  useEffect(() => {
    if(isStartInvestigationButtonPressed == true){
      NewApiController(
        API_CONSTANTS.updateAssignedClaimStatus,
        {
          claim_code: claim_code,
          status: 2 
        },
        "POST",
        userDetails.access_token
      )
        .then(({ data, status }) => {
         
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "Error from claim form details screen");
        });
    }
  }, [isStartInvestigationButtonPressed]);

  useEffect(() => {


    NewApiController(
      API_CONSTANTS.getClaimDetails,
      { claim_code },
      "POST",
      userDetails.access_token
    )
      .then(({ data, status }) => {
        if (status === 200 || status === 201) {
          setClaimData(data.data);
          console.log('Response Claim Details', data.data)
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "Error from claim form details screen");
      });
    

  }, [])

  const rejectInspection = () => {
    Alert.alert(
      'Reject Inspection',
      "These Changes won't be reverted!", // <- this part is optional, you can pass an empty string
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          NewApiController(
            API_CONSTANTS.updateAssignedClaimStatus,
            {
              claim_code: claim_code,
              status: 3
            },
            "POST",
            userDetails.access_token
          )
            .then(({ data, status }) => {
              setLoading(false);
              ToastAndroid.show(`Inspection Reject` , ToastAndroid.SHORT)
              
              setTimeout(()=>{navigation.navigate('Dashboard')},1500)
            })
            .catch((err) => {
              setLoading(false);
              console.log(err, "Error from claim form details screen");
            })
        
        }},
      ],
      {cancelable: false},
    );
   
  }

  return (
    <>
      {!loading && ClaimData !== null && !isStartInvestigationButtonPressed && (
        <View>
          <Header
            goBack={() => {
              navigation.pop();
            }}
            text={"Claim Form Details"}
            rightBtnIcon="bell"
            rightBtnPress={() => { navigation.navigate('notifications') }} 
            bckBtn={true}
            rightImage={true}
          />
          <View style={{ backgroundColor: colors.WHITE }}>
            <LabelText
              label={"Date Of Accident:"}
              value={formateDate(ClaimData.date_of_accident)}
            />
            <LabelText
              label={"Time Of Accident:"}
              value={formateDate(ClaimData.time_of_accident, true)}
            />
            <LabelText
              label={"Place Of Accident:"}
              value={ClaimData.place_of_accident}
            />
            <LabelText label={"Driver Name:"} value={ClaimData.driver_name} />
            <LabelText label={"Damage:"} value={ClaimData.damage} />
            <LabelText label={"Initial Estimate:"} value={"Random"} />
            <LabelText
              label={"Towing Required:"}
              value={ClaimData.towing === null ? "No" : "Yes"}
            />
            <LabelText
              label={"Vehicle Reported Date:"}
              value={formateDate(ClaimData.vehicle_reported_date)}
            />

            <TouchableOpacity
              onPress={() =>
                {
                  ToastAndroid.show( `Inspection Started!` , ToastAndroid.SHORT),
                  setTimeout(()=>{
                  setIsStartInvestigationButtonPressed(
                    !isStartInvestigationButtonPressed
                  )},1000)
                }
              }
              style={{
                marginHorizontal: 16,
                marginVertical: 29,
                backgroundColor: colors.THEME,
                height: 48,
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: colors.WHITE }}>Start Inspection</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                {
                  rejectInspection()
                }
              }
              style={{
                // marginHorizontal: 5,
                marginVertical: 5,
                backgroundColor: colors.THEME,
                height: 48,
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: colors.WHITE }}>Reject Inspection</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!loading && isStartInvestigationButtonPressed && (
        <ClaimDetails
          setIsStartInvestigationButtonPressed={
            setIsStartInvestigationButtonPressed
          }
          isStartInvestigationButtonPressed={isStartInvestigationButtonPressed}
          navigation={navigation}
          claim_code={claim_code}
          assessment_id={assessment_id}
          token={userDetails.access_token}
        />
      )}
    </>
  );
};

export default ClaimFormDetails;

const styles = StyleSheet.create({});
