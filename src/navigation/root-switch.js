import React, { Component } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
// import { Icon } from 'native-base';
import { colors } from "../assets/config/colors";
import { userDetails } from "../assets/config/constants";

import AppText from "../components/AppText";
import { getFontStyles } from "../services/utils";

import Icon from "react-native-vector-icons/FontAwesome5";

import EventList from "../pages/EventList";
import Login from "../pages/Authentication/Login";
import Home from "../pages/Home";
import AddVisitor from "../pages/AddVisitor";
import EventVenueList from "../pages/EventVenueList";
import InspectionList from "../pages/InspectionList";

import NewVehicleDetail from "../pages/NewVehicleDetail";
import ClaimFormDetails from "../pages/ClaimFormDetails";
import AgentInspectionList from "../pages/AgentInspectionList";

import UploadAssessmentImages from "../pages/UploadAssessmentImages";
import Questionaire from "../pages/Questionaire";
import UploadAccidentImages from "../pages/UploadAccidentImages";
import Notifications from "../pages/Notifications";
 function InProgress(props) {
  return <InspectionList {...props} status="2" />
 }
 
 function NewInspection(props) {
   return <InspectionList {...props} status="1" />
  }
 
  function Completed(props) {
   return <InspectionList {...props} status="4" />
  }



const Stack = createNativeStackNavigator();
const Router = () => (
  <Stack.Navigator
    initialRouteName={userDetails ? "HomeTabs" : "Login"}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="HomeTabs" component={HomeTabs} />
    <Stack.Screen name="notifications" component={Notifications} />
    <Stack.Screen name="EventList" component={EventList} />
    <Stack.Screen name="AddVisitor" component={AddVisitor} />
    <Stack.Screen name="EventVenueList" component={EventVenueList} />
    <Stack.Screen name="New Vehicle Detail" component={NewVehicleDetail} />
    <Stack.Screen name="Claim Form Details" component={ClaimFormDetails} />
    <Stack.Screen name="InProgess" component={InProgress} />
    <Stack.Screen name="Upload Assessment Images" component={UploadAssessmentImages} />
    <Stack.Screen name="Questionaire" component={Questionaire} />
    <Stack.Screen name="Upload Accident Images" component={UploadAccidentImages} />
    {/* <Stack.Screen name="Completed" component={Completed} />
    <Stack.Screen name="New Inspection" component={NewInspection} /> */}
    <Stack.Screen
      name="Agent Inspection List"
      component={AgentInspectionList}
    />
  </Stack.Navigator>
);

// const Home = () => {

//   return(
//     <View style={[{flex:1, justifyContent:"center", alignItems: "center"}]} ><Text>Helsnkssmal</Text></View>
//   )
// }


const Tab = createBottomTabNavigator();
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        unmountOnBlur: true,
        tabBarStyle: { ...styles.tabBar, ...styles.shadowEffect },
      }}
      backBehavior="initialRoute"
      // tabBarOptions={{
      //   showLabel: false,
      //   style: { ...styles.tabBar, ...styles.shadowEffect }

      // }}
    >
      <Tab.Screen
        name={"Dashboard"}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerAligned}>
              <Icon
                name="home"
                type="MaterialCommunityIcons"
                size={focused ? 18 : 15}
                style={{
                  ...styles.tabIcon,
                  color: focused ? colors.WHITE : colors.BLACK,
                }}
              ></Icon>
              <AppText
                style={[
                  { color: focused ? colors.WHITE : colors.BLACK },
                  focused ? { ...getFontStyles({ weight: "Bold" }) } : {},
                ]}
              >
                Home
              </AppText>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"New Inspection"}
        component={InspectionList}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerAligned}>
              <Icon
                name="clipboard-list"
                type={"regular"}
                size={focused ? 18 : 15}
                style={{
                  ...styles.tabIcon,
                  color: focused ? colors.WHITE : colors.BLACK,
                }}
              ></Icon>
              <AppText
                style={[
                  { color: focused ? colors.WHITE : colors.BLACK },
                  focused ? { ...getFontStyles({ weight: "Bold" }) } : {},
                  { textAlign: "center" },
                ]}
              >
                New Inspection
              </AppText>
            </View>
          ),
        }}
      />
        <Tab.Screen name={'Inprogress'} component={InProgress} options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.centerAligned}>
            <Icon name="spinner" size={focused ? 18 :15} style={{ ...styles.tabIcon, color: focused ? colors.WHITE : colors.BLACK }}></Icon>
            <AppText style={[{ color: focused ? colors.WHITE: colors.BLACK },focused ? {...getFontStyles({weight:'Bold'})} : {}, {alignItems:"center"}]}>Inprogress</AppText>
          </View>
        )

      }} />
       <Tab.Screen name={'Completed'} component={Completed} options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.centerAligned}>
            <Icon name="check-circle" size={focused ? 18 :15} style={{ ...styles.tabIcon, color: focused ? colors.WHITE : colors.BLACK }}></Icon>
            <AppText style={[{ color: focused ? colors.WHITE: colors.BLACK },focused ? {...getFontStyles({weight:'Bold'})} : {}]}>Completed</AppText>
          </View>
        )

      }} />
       <Tab.Screen name={'Additional Claim'} component={EventList} options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.centerAligned}>
            <Icon name="list" type="MaterialCommunityIcons" size={focused ? 18 :15} style={{ ...styles.tabIcon, color: focused ? colors.WHITE : colors.BLACK }}></Icon>
            <AppText style={[{ color: focused ? colors.WHITE: colors.BLACK },focused ? {...getFontStyles({weight:'Bold'})} : {}, {textAlign:"center"}]}>Additional Claim</AppText>
          </View>
        )

      }} />

      {/* <Tab.Screen name={'Scan'}  options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.centerAligned}>
            <Icon name="barcode-scan" type="MaterialCommunityIcons" style={{ ...styles.tabIcon, color: focused ? colors.SECONDARY : colors.TERTIARY }}></Icon>
            <AppText style={[{ color: focused ? colors.SECONDARY: colors.TERTIARY },focused ? {...getFontStyles({weight:'Bold'})} : {}]}>Scan</AppText>
          </View>
        )

      }} />
      <Tab.Screen name={'Profile'} options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.centerAligned}>
            <Icon name="account" type="MaterialCommunityIcons" style={{ ...styles.tabIcon, color: focused ? colors.SECONDARY : colors.TERTIARY }}></Icon>
            <AppText style={[{ color: focused ? colors.SECONDARY: colors.TERTIARY },focused ? {...getFontStyles({weight:'Bold'})} : {}]}>Profile</AppText>
          </View>
        )

      }} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadowEffect: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 3,
  },
  tabBar: {
    position: "absolute",
    // bottom: 5,
    // left: 5,
    // right: 5,
    backgroundColor: colors.TERTIARY, //'#ffffff',
    //  borderRadius: 10,
    height: 65,
  },
  tabIcon: {
    //  height: 25,
    // width: 25
  },
  tabText: {
    fontSize: 12.5,
  },
  centerAligned: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarButton: {
    top: -30,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});

export default Router;
