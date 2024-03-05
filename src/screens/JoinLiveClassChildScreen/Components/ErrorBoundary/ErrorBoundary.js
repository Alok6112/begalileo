import { View, Text, StyleSheet, Modal, Pressable, Image } from "react-native";
import React, { useState } from "react";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../config/configs";
import { normalize } from "react-native-elements";

import ErrorImage from "../../assets/Images/Error-image.png";
import { COLOR, CommonStyles } from "../../../../config/styles";
import { callTechSupport } from "../../../../actions/dashboard";
import * as Constants from "../../../../components/helpers/Constants";
import { showMessage } from "react-native-flash-message";

import { connect } from "react-redux";
function ErrorBoundary(props) {
  const [modalVisible, setModalVisible] = useState(true);

  const {
    error,
    liveClassID,
    studentID,
    navigation,
    callTechnicalSupportResponse,
  } = props;

  const callTechSupportFn = async () => {
    if (liveClassID != "" && studentID != "") {
      await props?.callTechSupport(liveClassID, studentID);
      const response = await props?.callTechnicalSupportResponse;
      console.log("response", response);
      showMessage({
        message: response?.message,
        type: "success",
      });
      console.log("Call tech Support ");
    }
  };

  const goBackFn = () => {
    navigation.navigate(Constants.Dashboard);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   this.setState({
        //     modalVisible: !this.state.modalVisible,
        //   });
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.errorInfo}>
              <Text
                style={[
                  CommonStyles.text_14_bold,
                  {
                    color: "indigo",
                    textAlign: "center",
                    marginTop: normalize(10),
                  },
                ]}
              >
                Uh Ohhhh
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  { textAlign: "center", marginTop: normalize(10) },
                ]}
              >
                {error || ""}
              </Text>
              <Image
                style={{ width: 300, height: 300 }}
                source={ErrorImage}
              ></Image>
            </View>
            <View style={styles.techSupportBtns}>
              <View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => callTechSupportFn()}
                >
                  <Text style={styles.textStyle}>Call Tech Support</Text>
                </Pressable>
              </View>
              <View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => goBackFn()}
                >
                  <Text style={styles.textStyle}>Go Back</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    callTechnicalSupportStatus: state.dashboard.call_technical_support_status,
    callTechnicalSupportResponse:
      state.dashboard.call_technical_support_response,
  };
};

const mapDispatchToProps = {
  callTechSupport,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // position: "absolute",
  },
  modalView: {
    margin: 20,
    marginTop: normalize(30),
    backgroundColor: "white",
    borderRadius: 20,
    width: SCREEN_WIDTH - 50,
    height: SCREEN_HEIGHT / 1.5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  techSupportBtns: {
    marginTop: normalize(10),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    maxWidth: 400,
    height: 50,
    justifyContent: "space-evenly",
    padding: normalize(2),
  },

  errorInfo: {
    padding: normalize(10),
    justifyContent: "center",
    alignItems: "center",
  },
});
