import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { COLOR, CommonStyles } from "../config/styles";
import { normalize } from "../components/helpers";
import { showMessage, hideMessage } from "react-native-flash-message";
