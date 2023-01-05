import React, { useState, useContext } from "react";
import {
  Text,
  StatusBar,
  Button,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { default as FontAwesome } from "react-native-vector-icons/FontAwesome";
import { colors } from "../assets/config/colors";
import Header from "../components/Header";
import Api from "../services/api";
import { getFontStyles, Utils } from "../services/utils";
import { userDetails } from "../assets/config/constants";
import { API_CONSTANTS } from "../assets/config/constants";
import moment from "moment";
import { Linking } from "react-native";

export default class NewVehicleDetail extends React.Component {
  constructor(props) {
    super(props);

    this.utils = new Utils();
    this.apiCtrl = new Api();
    this.state = {
      claimLists: [],
      details: this.props.route.params.params,

      // filterBy: this.props.route.params.filterBy,
      // startDate: this.props.route.params.startDate,
      // endDate: this.props.route.params.endDate,
      refreshing: false,
      loading: false,
      pageStart: 0,
      pageLength: 0,
      totalRecords: 0,
    };
  }

  render() {
    console.log("PROPS DATA", this.state.details);
    // console.log(userDetails, ">>>>>>>");
    return (
      <View style={[styles.container]}>
        <Header
          goBack={() => {
            this.props.navigation.pop();
          }}
          text={"Inspection Details"}
          rightBtnIcon="bell"
          rightBtnIcon2="search"
          bckBtn={true}
          rightImage={true}
        />
        <View
          style={{
            display: "flex",
            backgroundColor: colors.WHITE,
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: -10,
            width: "100%",
            height: "15%",
          }}
        >
          <TouchableOpacity
            style={[
              styles.row,
              styles.elevation,
              styles.imageTab,
              { marginLeft: 20 },
            ]}
            title="View Profile"
            // onPress={() => this.props.navigate("New Vehicle")}
          >
            {/* <Image style={[imgStyles.img]} source={car}/> */}
            <Icon
              name="car"
              size={55}
              style={[{ alignSelf: "center", color: "white" }]}
            />
          </TouchableOpacity>
          <View
            style={[
              {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: 30,
              },
            ]}
          >
            <View
              style={[{ width: "62%", display: "flex", flexDirection: "row" }]}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", width: 100 }}>
                Name:{" "}
              </Text>
              <Text style={{ fontSize: 20 }}>
                {this.state.details.insured_name}
              </Text>
            </View>
            <View
              style={[{ width: "62%", display: "flex", flexDirection: "row" }]}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", width: 100 }}>
                Location:{" "}
              </Text>
              <Text style={{ fontSize: 20 }}>
                {this.state.details.place_of_accident}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            backgroundColor: colors.WHITE,
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 10,
            width: "100%",
            height: "55%",
          }}
        >
          <TouchableOpacity
            style={[styles.row, styles.elevation, styles.detailTab]}
            title="View Profile"
            // onPress={() => this.props.navigate("New Vehicle")}
          >
            {/* <Image style={[imgStyles.img]} source={car}/> */}

            <View
              style={[
                {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: 30,
                },
              ]}
            >
              <View
                style={[
                  { width: "62%", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 180,
                    marginTop: 5,
                  }}
                >
                  Claim No:{" "}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.state.details.claim_code}
                </Text>
              </View>
              <View
                style={[
                  { width: "62%", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 180,
                    marginTop: 5,
                  }}
                >
                  Reg No:{" "}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.state.details.vehicle_registration_no}
                </Text>
              </View>
              <View
                style={[
                  { width: "62%", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 180,
                    marginTop: 5,
                  }}
                >
                  Chassis No:{" "}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.state.details.vehicle_chassis_no}
                </Text>
              </View>
              <View
                style={[
                  { width: "62%", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 180,
                    marginTop: 5,
                  }}
                >
                  Engine No:{" "}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.state.details.vehicle_engine_no}
                </Text>
              </View>
              <View
                style={[
                  { width: "62%", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 180,
                    marginTop: 5,
                  }}
                >
                  Make:{" "}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.state.details.vehicle_make}
                </Text>
              </View>
              <View
                style={[
                  { width: "62%", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 180,
                    marginTop: 5,
                  }}
                >
                  Model:{" "}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.state.details.vehicle_model}
                </Text>
              </View>
              <View
                style={[
                  { width: "62%", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 180,
                    marginTop: 5,
                  }}
                >
                  Odometer Reading:{" "}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.state.details.vehicle_odometer_reading}
                </Text>
              </View>

              <View
                style={[
                  { width: "62%", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 180,
                    marginTop: 5,
                  }}
                >
                  Assignment Date:{" "}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.state.details.assignment_date}
                </Text>
              </View>
              <View
                style={[
                  { width: "62%", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 180,
                    marginTop: 5,
                  }}
                >
                  Workshop:{" "}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.state.details.workshop_name}
                </Text>
              </View>
              <View
                style={[
                  { width: "62%", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 180,
                    marginTop: 5,
                  }}
                >
                  Location:{" "}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.state.details.place_of_accident}
                </Text>
              </View>
            </View>

            {/* <Text  style={{fontSize:20, fontWeight:"bold"}}>Claim No        :  </Text>
            <Text  style={{fontSize:20, fontWeight:"bold"}}>Reg No            :   MH 06 98</Text>
            <Text  style={{fontSize:20, fontWeight:"bold"}}>Work Sho        :   Nano</Text>
              <Text  style={{fontSize:20, fontWeight:"bold"}}>Location          :   Western Express</Text>
              <View style={[styles.details]}>
              </View>
            <View style={[styles.details]}>
              </View>
              <View style={[styles.details]}>
              </View>
              <View style={[styles.details]}>
              </View> */}
            {/* </View>
              <View style={[]}> */}
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "95%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <TouchableOpacity
            style={[styles.button, {}]}
            onPress={() => {
              Linking.openURL(`tel:` + this.state.details.insured_mobile_no);
            }}
          >
            <FontAwesome name={"phone"} size={30} color={colors.WHITE} />
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: colors.WHITE }}
            >
              Call User
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              Linking.openURL(`tel:` + this.state.details.workshop_mobile_no);
            }}
          >
            <FontAwesome name={"phone"} size={30} color={colors.WHITE} />
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: colors.WHITE }}
            >
              Call Dealer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() =>
              this.props.navigation.navigate("Claim Form Details", {
                claim_code: this.state.details.claim_code,
                assessment_id: this.state.details.assessment_id,
              })
            }
          >
            <FontAwesome name={"list-alt"} size={30} color={colors.WHITE} />

            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: colors.WHITE }}
            >
              Claim Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"center",
    alignItems: "center",
    width: "100%",
    // padding:10
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 20,
  },
  button: {
    // paddingTop: 20,
    borderRadius: 8,
    width: "32%",
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    backgroundColor: colors.THEME,
    display: "flex",
    justifyContent: "space-around",
    // flexDirection:"row",
  },
  row: {
    // alignSelf: "flex-start",
    // borderWidth: 4,
    borderRadius: 10,
    // backgroundColor: "#FCC89F",
    padding: 8,
    borderColor: "coral",
    marginBottom: 15,
    marginTop: 18,
  },
  imageTab: {
    width: "25%",
    // height:"auto",
    padding: 20,
    alignItems: "center",
    backgroundColor: colors.THEME,
  },
  detailTab: {
    width: "95%",
    height: "50%",
    alignSelf: "center",
  },
  details: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    // alignItems:"right",
    marginLeft: "5%",
  },
});

const imgStyles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    // alignSelf: 'flex-start'
  },
  tinyLogo: {
    width: 66,
    height: 58,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
