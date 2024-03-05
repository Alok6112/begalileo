import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import Accordion from "react-native-collapsible/Accordion";
import * as Constants from "../../components/helpers/Constants";
import { COLOR } from "../../config/styles";

const SECTIONS = [
  {
    title: "What do I get inside the beGalileo Math box?",
    content: "All activity details",
  },
];

class FaqScreen extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = (section) => {
    return <View>{/* <Text>{section.content}</Text> */}</View>;
  };

  _renderHeader = (section) => {
    return (
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View style={styles.textContentContainer}>
        <Text style={styles.textContent}>{section.content}</Text>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
        <Text
          style={{
            fontFamily: Constants.Montserrat_Bold,
            color: COLOR.TEXT_COLOR_BLUE,
            fontSize: 20,
            marginStart: 20,
            marginTop: 10,
          }}
        >
          FAQs
        </Text>

        <Accordion
          sections={SECTIONS}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          underlayColor={COLOR.BG_FAQ_GRERY}
          onChange={this._updateSections}
        />
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
  textContentContainer: {
    backgroundColor: COLOR.BG_FAQ_GRERY,
    marginTop: 10,
    paddingStart: 20,
    paddingEnd: 20,
    paddingBottom: 10,
  },
  textTitleContainer: {
    backgroundColor: COLOR.BG_FAQ_GRERY,
    padding: 20,
    marginTop: 10,
  },
  textContent: {
    fontFamily: Constants.Montserrat_Regular,
  },
  textTitle: {
    fontFamily: Constants.Montserrat_Bold,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FaqScreen);
