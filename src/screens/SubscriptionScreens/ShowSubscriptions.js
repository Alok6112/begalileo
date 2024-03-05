import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { IC_BUY_NOW, IC_ADD_TO_CART } from "../../assets/images";
import * as Constants from "../../components/helpers/Constants";
import CustomGradientButtonIcon from "../../components/CustomGradientButtonIcon";
import { COLOR, CommonStyles } from "../../config/styles";
import { CustomBackButton } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";
import SubscriptionTabs from "../../components/subscription_tab";
import { BackHandler } from "react-native";
//import CustomBackButton from "../../components";

class ShowSubscriptons extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      mDuration: null,
    };
  }

  componentDidMount() {}
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "space-between",
            backgroundColor: COLOR.WHITE,
            marginStart: 10,
            marginEnd: 10,
          }}
        >
          <View style={{ marginTop: normalize(10) }}>
            <CustomBackButton onPress={this.onPressBack} />
          </View>
          <Text
            style={[
              CommonStyles.text_18_semi_bold,
              { color: COLOR.TEXT_COLOR_BLUE },
            ]}
          >
            Available subscriptions
          </Text>

          <SubscriptionTabs
            goToCartList={this.goToCartList}
            onlyBuyNow={true}
          />
        </ScrollView>
      </View>
    );
  }

  goToCartList = () => {
    this.props.navigation.navigate(Constants.CartListScreen);
  };

  onPressBack = () => {
    const { goBack } = this.props.navigation;
    console.log("Go Back From Renew");
    goBack();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
});

const mapStateToProps = (state) => {
  return {
    dashboardResponse: state.dashboard.dashboard_response,
    dashboardStatus: state.dashboard.dashboard_status,
    currentSelectedKid: state.dashboard.current_selected_kid,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShowSubscriptons);
