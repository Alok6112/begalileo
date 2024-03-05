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
  SafeAreaView,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import * as Constants from "../../components/helpers/Constants";
import { COLOR, CommonStyles } from "../../config/styles";
import { IC_SWITCH_PROFILE, IC_EDIT_PEN } from "../../assets/images";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusbar from "../../components/CustomStatusBar";
import { CustomBackButton } from "../../components";
import Orientation from "react-native-orientation";
import Custom3dButton from "../../components/Custom3dButton";
import { lottie_puzzle } from "../../assets/lottieAssets";
import LottieView from "lottie-react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../config/configs";
import { MATH_PATTER } from "../../assets/images/Math_Pattern.png";

const THEME_COLOR = "#285E29";
class MidasHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const initial = Orientation.getInitialOrientation();
    console.log("Initial Orientation", initial);
    Orientation.lockToLandscapeLeft();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  onPressBack = () => {
    const { goBack } = this.props.navigation;

    goBack();
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
        {/* <CustomBackButton onPress={this.onPressBack} /> */}
        <CustomStatusbar barStyle="dark-content" />
        <Text
          style={[
            CommonStyles.text_14_semi_bold,
            { textAlign: "center", marginTop: 20 },
          ]}
        >
          Midas Test
        </Text>
        {/* <View>
                    <Custom3dButton />
                </View> */}
        {/* <Image style={{ height: normalize(400), width: normalize(400), resizeMode: "stretch" }} source={MATH_PATTER} /> */}
        <View
          style={{ height: 200, width: SCREEN_WIDTH, justifyContent: "center" }}
        >
          <LottieView source={lottie_puzzle} autoPlay loop />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.authenticate,
  };
};

const mapDispatchToProps = {};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: THEME_COLOR,
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MidasHomeScreen);
