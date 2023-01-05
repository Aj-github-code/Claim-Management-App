import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import { colors } from "../../assets/config/colors";
import * as ImagePicker from "expo-image-picker";
import NewApiController from "../../services/NewApiController";
import { API_CONSTANTS } from "../../assets/config/constants";
const ClaimDetails = ({
  setIsStartInvestigationButtonPressed,
  isStartInvestigationButtonPressed,
  navigation,
  claim_code,
  assessment_id,
  token,
}) => {
  const claimQuestions = [
    {
      id: "1",
      question: "Has punchanama been carried out?",
      isChecked: false,
      isImageUploaded: false,
      imageUrl: "",
    },
    {
      id: "2",
      question: "Injury to driver/Occupant(If any)",
      isChecked: false,
      isImageUploaded: false,
      imageUrl: "",
    },
    {
      id: "3",
      question: "Was any third party involved in accident?",
      isChecked: false,
      isImageUploaded: false,
      imageUrl: "",
    },
    {
      id: "4",
      question: "Particular of third party injury/Loss?",
      isChecked: false,
      isImageUploaded: false,
      imageUrl: "",
    },
  ];

  const [ClaimQuestions, setClaimQuestions] = useState(claimQuestions);
  const [isDisabled, setIsDisabled] = useState(true);
  const renderItem = (item, index) => {
    const captureImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
        base64: true,
        allowsMultipleSelection: false,
        selectionLimit: 0,
      });

      if (result.assets.length > 0) {
        let promotionIndex = ClaimQuestions.findIndex(
          (val) => val.id === item.id
        );
        if (promotionIndex > -1) {
          let newArray = [
            ...ClaimQuestions.slice(0, promotionIndex),
            {
              ...ClaimQuestions[promotionIndex],
              isImageUploaded: item.isImageUploaded === false ? true : false,
              imageUrl: result.assets[0].uri,
            },
            ...ClaimQuestions.slice(promotionIndex + 1),
          ];
          setClaimQuestions(newArray);
        }

        let imageKey;
        if (item.id == "1") {
          // punchname
          imageKey = "punchnama_carried_out_image";
        } else if (item.id == "2") {
          // injury to driver
          imageKey = "injury_to_driver_occupant_image";
        } else if (item.id == "3") {
          // was any third party involve in accident
          imageKey = "third_party_involved_in_accident_image";
        } else {
          // particulars of third party image or loss
          imageKey = "particulars_of_third_party_injury_loss_image";
        }

        NewApiController(
          API_CONSTANTS.addImagesToClaimQuestion,
          {
            claim_code,
            image: {
              [imageKey]: `data:image/png;base64,${result.assets[0].base64}`,
            },
          },
          "POST",
          token
        )
          .then((res) => {
            if (res.status == 200) {
              // check if all keys have image uploaded to true
              const isAllImagesUploaded = ClaimQuestions.filter(
                (val) => val.isImageUploaded === true
              );
              if (isAllImagesUploaded.length >= 3) {
                setIsDisabled(false);
              }
            }
            console.log(res.data, res.status);
          })
          .catch((err) => {
            console.log(err, "error");
          });
      }
    };

    return (
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
              fontSize: 14,
              fontWeight: "600",
              color: colors.THEME,
              marginTop: 16,
              marginBottom: 5,
            }}
          >
            {item.question}
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => {
                let promotionIndex = ClaimQuestions.findIndex(
                  (val) => val.id === item.id
                );
                if (promotionIndex > -1) {
                  let newArray = [
                    ...ClaimQuestions.slice(0, promotionIndex),
                    {
                      ...ClaimQuestions[promotionIndex],
                      isChecked: item.isChecked === false ? true : false,
                    },
                    ...ClaimQuestions.slice(promotionIndex + 1),
                  ];
                  setClaimQuestions(newArray);
                }
              }}
            >
              {item.isChecked ? (
                <Image
                  style={{ tintColor: colors.THEME, height: 19, width: 19 }}
                  source={require("../../assets/images/check.png")}
                />
              ) : (
                <Image
                  style={{ tintColor: colors.THEME, height: 19, width: 19 }}
                  source={require("../../assets/images/uncheck.png")}
                />
              )}
            </TouchableOpacity>
            <Text style={{ marginLeft: 10, color: colors.THEME }}>
              {item.isChecked ? "Yes" : "No"}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={captureImage}
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
            disabled={item.isChecked === false ? true : false}
          >
            {item.isImageUploaded ? (
              <>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                />
              </>
            ) : (
              <>
                <Image source={require("../../assets/images/noimage.png")} />
                <Text
                  style={{ fontSize: 10, marginTop: 2, color: colors.THEME }}
                >
                  No Image
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Header
        goBack={() => {
          setIsStartInvestigationButtonPressed(
            !isStartInvestigationButtonPressed
          );
        }}
        text={"Claim Details"}
        rightBtnIcon="bell"
        rightBtnIcon2="search"
        bckBtn={true}
        rightImage={true}
      />
      <FlatList
        data={ClaimQuestions}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={({ id }) => id}
      />
      <TouchableOpacity
        // disabled={isDisabled}
        onPress={() =>
          navigation.navigate("Agent Inspection List", { claim_code, assessment_id })
          // navigation.navigate("Upload Accident Images", { claim_code, assessment_id })
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
        <Text style={{ color: colors.WHITE }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClaimDetails;

const styles = StyleSheet.create({});
