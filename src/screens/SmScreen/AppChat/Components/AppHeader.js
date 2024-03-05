import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";
import * as Constants from "../../../../components/helpers/Constants";
import { EventRegister } from "react-native-event-listeners";
import { getLocalData } from "../../../../components/helpers/AsyncMethods";
class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "",
    };
  }
  componentDidMount = async () => {
    console.log("componentDidMount AppHeader")
    this.setState({ role: this.props.role });
  };


  goBackToUserScreen = () => {
    this.props.navigation.goBack();
    EventRegister.emit("refreshSmDashboardScreen", true);
   
    
   
  };
  render() {
    const { title, onPress, navigation } = this.props;

    return (
      <View style={{ height: 100, width: "100%" }}>
        <View
          style={[
            styles.gradient,
            {
              paddingTop: 5,
              backgroundColor: "#3B71F7",
              width: "100%",
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 1,
            },
          ]}
        >
          <View style={styles.headerView}>
            {title === "Messages" ? (
              <View style={{ width: "10%" }}></View>
            ) : (
              
                <View style={{ alignItems: "flex-start" }}>
                  <TouchableOpacity
                    style={styles.iconView}
                    onPress={() => {
                      this.goBackToUserScreen();
                    }}
                  >
                    <Icons name="arrow-back" size={40} color="white" />
                  </TouchableOpacity>
                </View>
              
            )}
            <View style={{ width: "80%", alignItems: "center" }}>
              <Text
                style={[
                  styles.textView,
                  {
                    fontSize: 25,
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: Constants.Montserrat_Bold,
                  },
                ]}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Constants.Montserrat_Regular,
                  color: "white",
                }}
              >
                {this.props.role == "Student" && "Success Manager"}
                {this.props.role == "SM Manager" && "Student"}
              </Text>
            </View>
            {title === "Messages" ? (
              <View
                style={{ width: "10%", alignItems: "flex-end", marginLeft: 10 }}
              ></View>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    width: "100%",
  },
  iconView: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  textView: {
    fontSize: 20,
    lineHeight: 28,
    color: "#000",
  },
});

export default AppHeader;
