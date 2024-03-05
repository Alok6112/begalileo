import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  VirtualizedList,
  ColorPropType,
  Platform,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {CheckBox} from 'react-native-elements';
import {COLOR, CommonStyles} from '../../config/styles';
import {
  IMG_SHAKSHI,
  IC_REMOVE_ITEM,
  IC_CLOSE_BLUE,
  CART_INDICATOR_ADDRESS,
  IC_CURRENT_LOCATION,
} from '../../assets/images';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {removeFromCart, addAddress, editAddress} from '../../actions/dashboard';
import CustomGradientButton from '../../components/CustomGradientButton';
import Modal from 'react-native-modal';
import {normalize} from 'react-native-elements';
import RadioForm, {RadioButton} from 'react-native-simple-radio-button';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

Geocoder.init('AIzaSyCLJ8eLdOh0HezxlyyKDRLCkQSCrmQSsE4');

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHouseDetailsInvalid: false,
      defaultDeliveryAddress: false,
      currentLongitude: 'unknown',
      currentLatitude: 'unknown',
      mAddress: '',
      mPincode: '',
      mHouseDetails: '',
      mState: '',
      mCity: '',
      mLandMark: '',
      mOfficeType: 'Home',
      isEdit: false,
      editAddressItem: [],
      mDefaultAddress: false,
      isLocalLoading: false,
      radio_props: [
        {label: 'Home', value: 0},
        {label: 'Office', value: 1},
      ],
    };
  }
  componentDidMount() {
    var addressItem = getParamNavigationV5(this.props, 'addressItem', null);

    if (addressItem == null) {
      this.setState({
        isEdit: false,
      });
    } else {
      var radioProps = [];

      console.log(radioProps);

      this.setState({
        isEdit: true,
        editAddressItem: addressItem,
        mAddress: addressItem.address,
        mPincode: addressItem.pincode,
        mCity: addressItem.city,
        mState: addressItem.state,
        mLandMark: addressItem.landmark,
        mDefaultAddress: addressItem.default_address,
        mOfficeType: addressItem.address_type,
        defaultDeliveryAddress: addressItem.default_address,
      });
    }
    console.log(addressItem);
  }

  componentDidUpdate(prevProps) {
    console.log('Component Update Add Address');
    console.log(
      prevProps.addAddressStatus + ' - - ' + this.props.addAddressStatus,
    );
    if (prevProps.addAddressStatus != this.props.addAddressStatus) {
      if (this.props.addAddressStatus) {
        console.log('Address Added Successfully');
        this.onPressBack();
      }
    }
    if (prevProps.editAddressStatus != this.props.editAddressStatus) {
      if (this.props.editAddressStatus) {
        console.log('Edit Address Successfully');
        this.onPressBack();
      }
    }
  }

  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  isValidationSucess = () => {
    var validationStatus = true;
    const {mAddress, mCity, mPincode, mState, mLandMark} = this.state;

    if (mAddress == '') {
      this.setState({
        isAddressInvalid: true,
      });
      validationStatus = false;
    } else {
      this.setState({
        isAddressInvalid: false,
      });
    }
    if (mCity == '') {
      this.setState({
        isCityInvalid: true,
      });
      validationStatus = false;
    } else {
      this.setState({
        isCityInvalid: false,
      });
    }
    if (mState == '') {
      this.setState({
        isStateInvalid: true,
      });
      validationStatus = false;
    } else {
      this.setState({
        isStateInvalid: false,
      });
    }
    if (mPincode == '') {
      this.setState({
        isPinCodeInvalid: true,
      });
      validationStatus = false;
    } else {
      this.setState({
        isPinCodeInvalid: false,
      });
    }

    return validationStatus;
  };

  onSaveAddress = () => {
    console.log('Save Address');
    if (this.isValidationSucess()) {
      console.log('Validation Success');
      this.saveAddressInServer();
    } else {
      console.log('Validation Failed');
    }

    // this.props.navigation.navigate(Constants.CartAddress);
  };

  saveAddressInServer = () => {
    getLocalData(Constants.ParentUserId).then(parentId => {
      console.log('Parent Id ' + parentId);
      console.log('Addres ' + this.state.mAddress);
      console.log('City ' + this.state.mCity);

      console.log('Pincode ' + this.state.mPincode);
      console.log('Address type : ' + this.state.mOfficeType);

      if (this.state.isEdit) {
        //console.log(this.state.editAddressItem.address_id);
        this.props.editAddress(
          this.state.editAddressItem.address_id,
          parentId,
          this.state.mAddress,
          this.state.mCity,
          this.state.mState,
          this.state.mPincode,
          this.state.mOfficeType,
          this.state.mLandMark,
          this.state.defaultDeliveryAddress,
        );
      } else
        this.props.addAddress(
          parentId,
          this.state.mAddress,
          this.state.mCity,
          this.state.mState,
          this.state.mPincode,
          this.state.mOfficeType,
          this.state.mLandMark,
          this.state.defaultDeliveryAddress,
        );
    });
  };

  onUserLocation = () => {
    var that = this;
    if (Platform.OS === 'ios') {
      this.currentLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.currentLocation(that);
          } else {
            alert('Permission Denied');
          }
        } catch (err) {
          alert('err', err);
          console.warn(err);
        }
      }
      requestLocationPermission();
    }
  };

  addressExtraction = addressComponent => {
    var postalCode = '';
    var city = '';
    var state = '';
    var address = '';
    addressComponent.map(item => {
      console.log(item);
      console.log(item.types.indexOf('postal_code') > -1);
      if (item.types.indexOf('postal_code') > -1) {
        postalCode = item.long_name;
      }
      if (item.types.indexOf('administrative_area_level_1') > -1) {
        state = item.long_name;
      }
      if (item.types.indexOf('locality') > -1) {
        city = item.long_name;
      }
    });
    address =
      addressComponent[1].long_name + ',' + addressComponent[2].long_name;
    console.log(address + ' -- ' + city + ' -- ' + state + ' -- ' + postalCode);
    this.setState({
      mAddress: address,
      mCity: city,
      mState: state,
      mPincode: postalCode,
    });
  };

  reverseGeoCoding = (latitude, longitude) => {
    //  latitude = "12.884510";
    //  longitude = "77.603554";
    console.log('Reverse GeoCoding');
    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressComponent = json.results[0].address_components;

        this.setState({
          isLocalLoading: false,
        });
        // console.log("Address : "+addressComponent[1].long_name+","+addressComponent[2].long_name);
        this.addressExtraction(addressComponent);
        // console.log("City : "+addressComponent[5].long_name);
        // console.log("State : "+addressComponent[7].long_name);
        // console.log("PinCode : "+addressComponent[9].long_name);
      })
      .catch(error => {
        this.setState({
          isLocalLoading: false,
        });
        console.warn(error);
      });
  };

  currentLocation(that) {
    this.setState({
      isLocalLoading: true,
    });
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        that.setState({
          currentLongitude: currentLongitude,
          currentLatitude: currentLatitude,
        });

        this.reverseGeoCoding(currentLatitude, currentLongitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => {
        this.setState({
          isLocalLoading: false,
        });
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 40000, maximumAge: 1000},
    );
    //   that.watchID = Geolocation.watchPosition((position) => {
    //     //Will give you the location on location change
    //       console.log(position);
    //       const currentLongitude = JSON.stringify(position.coords.longitude);
    //       //getting the Longitude from the location json
    //       const currentLatitude = JSON.stringify(position.coords.latitude);
    //       //getting the Latitude from the location json
    //      that.setState({ currentLongitude:currentLongitude });
    //      //Setting state Longitude to re re-render the Longitude Text
    //      that.setState({ currentLatitude:currentLatitude });
    //      //Setting state Latitude to re re-render the Longitude Text
    //   });
  }

  onDefaultDeliveryPress = () => {
    this.setState({
      defaultDeliveryAddress: !this.state.defaultDeliveryAddress,
    });
  };

  onAddressTypeChange = value => {
    console.log('Address Type ' + value);
    if (value)
      this.setState({
        mOfficeType: 'Office',
      });
    else
      this.setState({
        mOfficeType: 'Home',
      });
  };

  render() {
    const {loading} = this.props;
    const {isEdit, isLocalLoading, radio_props} = this.state;

    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
          backgroundColor: COLOR.WHITE,
        }}>
        <View
          style={{
            marginStart: normalize(20),
            marginEnd: normalize(20),
            marginTop: normalize(12),
            marginBottom: normalize(20),
          }}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="black"
              style={CommonStyles.loadingIndicatior}
            />
          )}
          {isLocalLoading && (
            <ActivityIndicator
              size="large"
              color="black"
              style={CommonStyles.loadingIndicatior}
            />
          )}
          <Text
            style={[
              CommonStyles.text_18_semi_bold,
              {color: COLOR.TEXT_COLOR_BLUE},
            ]}>
            {isEdit ? 'Edit Address' : 'Add New Address'}
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.onUserLocation();
            }}
            style={{flexDirection: 'row', marginTop: normalize(12)}}>
            <Image
              style={{
                borderRadius: 100,
                height: normalize(16),
                width: normalize(16),
                resizeMode: 'stretch',
              }}
              source={IC_CURRENT_LOCATION}
            />
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                {color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8)},
              ]}>
              Use Current Location
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: normalize(1),
              backgroundColor: COLOR.BORDER_COLOR_GREY,
              marginTop: normalize(20),
            }}
          />

          {/* <View style={{ marginTop: normalize(20) }}>
                        <Text style={[CommonStyles.text_11_bold, styles.textSubHeader]}>House Details</Text>
                        {this.state.isHouseDetailsInvalid && <Text style={styles.errorMessage}>Please enter house details</Text>}
                        <TextInput 
                            onChangeText={(text) => this.setState({
                                                        mHouseDetails : text
                                                    })}
                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                            placeholder="House no., Building Name"
                            keyboardType='default'
                            style={[CommonStyles.text_14_Regular, styles.textInputBorderedGrey]}

                            value={this.state.mHouseDetails}
                            blurOnSubmit={false}

                        />
                    </View> */}

          <View style={{marginTop: normalize(20)}}>
            <Text style={[CommonStyles.text_11_bold, styles.textSubHeader]}>
              Address
            </Text>
            {this.state.isAddressInvalid && (
              <Text style={styles.errorMessage}>Please enter Address</Text>
            )}
            <TextInput
              onChangeText={text =>
                this.setState({
                  mAddress: text,
                })
              }
              placeholderTextColor={COLOR.TEXT_COLOR_HINT}
              placeholder="Street Name, Area, Colony"
              keyboardType="default"
              style={[
                CommonStyles.text_14_Regular,
                styles.addressTextInputBorderedGrey,
              ]}
              multiline={true}
              value={this.state.mAddress}
              blurOnSubmit={true}
            />
          </View>

          <View style={{marginTop: normalize(20)}}>
            <Text style={[CommonStyles.text_11_bold, styles.textSubHeader]}>
              Pin Code
            </Text>
            {this.state.isPinCodeInvalid && (
              <Text style={styles.errorMessage}>
                Please enter valid pin code
              </Text>
            )}
            <TextInput
              onChangeText={text =>
                this.setState({
                  mPincode: text,
                })
              }
              placeholderTextColor={COLOR.TEXT_COLOR_HINT}
              placeholder="Pin Code"
              keyboardType="default"
              style={[
                CommonStyles.text_14_Regular,
                styles.textInputBorderedGrey,
              ]}
              value={this.state.mPincode}
              blurOnSubmit={true}
            />
          </View>

          <View style={{marginTop: normalize(20)}}>
            <Text style={[CommonStyles.text_11_bold, styles.textSubHeader]}>
              State
            </Text>
            {this.state.isStateInvalid && (
              <Text style={styles.errorMessage}>Please enter State</Text>
            )}
            <TextInput
              onChangeText={text =>
                this.setState({
                  mState: text,
                })
              }
              placeholderTextColor={COLOR.TEXT_COLOR_HINT}
              placeholder="State"
              keyboardType="default"
              style={[
                CommonStyles.text_14_Regular,
                styles.textInputBorderedGrey,
              ]}
              value={this.state.mState}
              blurOnSubmit={false}
            />
          </View>

          <View style={{marginTop: normalize(20)}}>
            <Text style={[CommonStyles.text_11_bold, styles.textSubHeader]}>
              City
            </Text>
            {this.state.isCityInvalid && (
              <Text style={styles.errorMessage}>Please enter City</Text>
            )}
            <TextInput
              onChangeText={text =>
                this.setState({
                  mCity: text,
                })
              }
              placeholderTextColor={COLOR.TEXT_COLOR_HINT}
              placeholder="City"
              keyboardType="default"
              style={[
                CommonStyles.text_14_Regular,
                styles.textInputBorderedGrey,
              ]}
              value={this.state.mCity}
              blurOnSubmit={true}
            />
          </View>

          <View style={{marginTop: normalize(20)}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[CommonStyles.text_11_bold, styles.textSubHeader]}>
                Landmark
              </Text>
              <Text
                style={[
                  CommonStyles.text_9_regular,
                  {color: COLOR.TEXT_COLOR_GREY, alignSelf: 'center'},
                ]}>
                Optional
              </Text>
            </View>

            <TextInput
              onChangeText={text =>
                this.setState({
                  mLandMark: text,
                })
              }
              placeholderTextColor={COLOR.TEXT_COLOR_HINT}
              placeholder="Landmark"
              keyboardType="default"
              style={[
                CommonStyles.text_14_Regular,
                styles.textInputBorderedGrey,
              ]}
              value={this.state.mLandMark}
              blurOnSubmit={true}
            />
          </View>

          <View style={{marginTop: normalize(20)}}>
            <Text style={[CommonStyles.text_11_bold, styles.textSubHeader]}>
              Address Type {this.state.mOfficeType}
            </Text>
            {this.state.isAddressTypeValid && (
              <Text style={styles.errorMessage}>Address Type</Text>
            )}
            <View
              style={{flexDirection: 'row', marginStart: 30, marginTop: 10}}>
              <RadioForm
                radio_props={radio_props}
                initial={this.state.mOfficeType == 'Home' ? 0 : 1}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={COLOR.BORDER_COLOR_GREEN}
                selectedButtonColor={COLOR.BORDER_COLOR_GREEN}
                animation={true}
                labelStyle={{
                  fontSize: 15,
                  color: COLOR.TEXT_COLOR_BLACK,
                  marginEnd: 30,
                  fontFamily: 'Montserrat-Regular',
                }}
                onPress={value => {
                  this.onAddressTypeChange(value);
                  //this.setState({ value: value })
                }}
              />
            </View>
          </View>
          <View style={styles.checkBoxStyle}>
            <CheckBox
              textStyle={{fontSize: 12}}
              containerStyle={{backgroundColor: COLOR.WHITE}}
              center
              title="Make this my default delivery address"
              checked={this.state.defaultDeliveryAddress}
              onIconPress={this.onDefaultDeliveryPress}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginTop: normalize(30),
              marginBottom: normalize(30),
              marginStart: normalize(20),
              marginEnd: normalize(20),
            }}>
            <CustomGradientButton
              style={{
                paddingTop: normalize(10),
                paddingBottom: normalize(10),
                alignItems: 'center',
              }}
              children="Save Address"
              onPress={this.onSaveAddress}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textSubHeader: {
    textAlign: 'left',
    margin: 5,
  },
  textInputBorderedGrey: {
    textAlign: 'left',
    width: '100%',
    padding: normalize(18),
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1.5,
    marginTop: normalize(8),
    borderColor: COLOR.BORDER_COLOR_GREY,
    backgroundColor: COLOR.WHITE,
  },
  addressTextInputBorderedGrey: {
    textAlign: 'left',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 10,
    paddingEnd: 10,
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1.5,
    marginTop: normalize(8),
    borderColor: COLOR.BORDER_COLOR_GREY,
    backgroundColor: COLOR.WHITE,
  },
  errorMessage: {
    color: COLOR.RED,
  },
  checkBoxStyle: {
    marginTop: normalize(20),
    marginBottom: 2,
    borderRadius: 0,
    borderRightWidth: 0,
  },
  submitButton: {
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 15,
    fontFamily: 'Montserrat-Regular',
    paddingBottom: 15,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.dashboard.loading,
    cartItems: state.dashboard.cartItems,
    addAddressStatus: state.dashboard.add_address_status,
    editAddressStatus: state.dashboard.edit_address_status,
    editAddressResponse: state.dashboard.edit_address_response,
  };
};

const mapDispatchToProps = {
  addAddress,
  editAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
