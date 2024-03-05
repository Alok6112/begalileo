import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {IC_LOCATION} from '../../assets/images';
import {CustomBackButton} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import {normalize, Card} from 'react-native-elements';
import {listAddress, removeAddress} from '../../actions/dashboard';
import NoRecordFoundComponent from '../../components/NoRecordFoundComponent';
import {BackHandler} from 'react-native';

class MoreMyAddressScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      cart_address: [
        {
          addressName: 'Ranbir Shah',
          addressType: 'Home',
          addressDetail:
            ' 401 / Sunrise Mention, E Moses Road,Marin Drive, Mumbai - 400001,Maharashtra, India Phone Number: +91 9773451243',
          deliveryDate: '15-Feb-2020',
          deliveryCharge: 0,
        },
      ],
      selectedAddress: 0,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      // call your refresh method here

      this.getAddressList();
    });
  }

  addAnotherAddress = () => {
    this.props.navigation.navigate(Constants.AddAddress);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.remove_address_status != this.props.remove_address_status) {
      console.log('REmove Address Update');
      this.getAddressList();
    }
  }

  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  onRemoveAddress = item => {
    Alert.alert(
      'Are you Sure want to remove address?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.onRemoveConfiramtion(item.address_id),
        },
      ],
      {cancelable: false},
    );
  };

  onRemoveConfiramtion = addressId => {
    console.log('Remove Address ' + addressId);
    this.props.removeAddress(addressId);
  };

  getAddressList = () => {
    console.log('hey therereee');
    getLocalData(Constants.ParentUserId).then(parentId => {
      console.log('Parent Id in more_my_address ' + parentId);
      this.props.listAddress(parentId, 'India');
    });
  };
  onEditAddress = item => {
    console.log('on edit Adress');
    console.log(item);
    this.props.navigation.navigate(Constants.AddAddress, {
      addressItem: item,
    });
  };

  onSelectAddress = item => {
    console.log('selected Address ' + item.address_id);
    this.setState({
      selectedAddress: item.address_id,
    });
  };
  renderAddressList() {
    const {list_address_response} = this.props;
    const {selectedAddress} = this.state;

    return list_address_response.address_details.map((item, index) => (
      <View>
        <TouchableOpacity
          onPress={() => this.onSelectAddress(item)}
          style={
            item.address_id == selectedAddress
              ? styles.addressSelectedContianer
              : styles.addressContianer
          }>
          <View
            style={{
              marginTop: normalize(16),
              marginStart: normalize(16),
              marginEnd: normalize(16),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={[CommonStyles.text_12__semi_bold, {flex: 3}]}>
              {item.address}
            </Text>
            <Text
              style={[
                CommonStyles.text_8_regular,
                {flex: 1, color: COLOR.TEXT_ALPHA_GREY, textAlign: 'right'},
              ]}>
              {item.address_type}
            </Text>
          </View>

          <Text
            style={[
              CommonStyles.text_12_Regular,
              {
                color: COLOR.TEXT_ALPHA_GREY,
                marginStart: normalize(16),
                marginEnd: normalize(48),
                marginTop: normalize(8),
              },
            ]}>
            {item.city}
          </Text>
          <Text
            style={[
              CommonStyles.text_12_Regular,
              {
                color: COLOR.TEXT_ALPHA_GREY,
                marginStart: normalize(16),
                marginEnd: normalize(48),
                marginTop: normalize(8),
              },
            ]}>
            {item.state}
          </Text>
          <Text
            style={[
              CommonStyles.text_12_Regular,
              {
                color: COLOR.TEXT_ALPHA_GREY,
                marginStart: normalize(16),
                marginEnd: normalize(48),
                marginTop: normalize(8),
              },
            ]}>
            {item.pincode}
          </Text>
          <Text
            style={[
              CommonStyles.text_12_Regular,
              {
                color: COLOR.TEXT_ALPHA_GREY,
                marginStart: normalize(16),
                marginEnd: normalize(48),
                marginTop: normalize(8),
                marginBottom: normalize(8),
              },
            ]}>
            {item.landmark}
          </Text>
          {/* <View style={{ margin: normalize(16), marginTop: normalize(8) }}>
                    <Text style={[CommonStyles.text_9_bold]}>Get delivered by 5 feb 2020</Text>
                    <Text style={[CommonStyles.text_9_bold, { marginTop: normalize(2) }]}>Delivery Charge Rs. 0 (FREE)</Text>
                </View> */}
        </TouchableOpacity>

        {item.address_id == selectedAddress ? (
          <View style={{flexDirection: 'row', marginTop: normalize(12)}}>
            <TouchableOpacity onPress={() => this.onRemoveAddress(item)}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {color: COLOR.TEXT_COLOR_GREEN},
                ]}>
                Remove Address
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                CommonStyles.text_12_bold,
                {
                  color: COLOR.TEXT_COLOR_GREY,
                  marginStart: normalize(8),
                  marginEnd: normalize(8),
                },
              ]}>
              {' '}
              |{' '}
            </Text>
            <TouchableOpacity onPress={() => this.onEditAddress(item)}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {color: COLOR.TEXT_COLOR_GREEN},
                ]}>
                Edit Address
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
      </View>
    ));
  }

  render() {
    const {loading} = this.props;

    console.log(
      'this.props.list_address_status',
      this.props.list_address_status,
    );
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.PRIMARY_BG,
        }}>
        <ScrollView>
          <View
            style={{
              marginStart: normalize(20),
              marginEnd: normalize(20),
              marginTop: normalize(10),
            }}>
            <CustomBackButton onPress={this.onPressBack} />
            {loading && (
              <ActivityIndicator
                size="large"
                color="black"
                style={CommonStyles.loadingIndicatior}
              />
            )}
            <Text
              style={[
                CommonStyles.text_18_semi_bold,
                {color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(12)},
              ]}>
              Saved Address
            </Text>
            {this.props.list_address_status &&
            this.props.list_address_response.address_details.length > 0 ? (
              this.renderAddressList()
            ) : (
              <NoRecordFoundComponent title="No address saved" sub_title="" />
            )}
            <TouchableOpacity
              onPress={() => {
                this.addAnotherAddress();
              }}
              style={{flexDirection: 'row', marginTop: normalize(12)}}>
              <Image
                style={{
                  borderRadius: 100,
                  height: normalize(16),
                  width: normalize(16),
                  resizeMode: 'stretch',
                }}
                source={IC_LOCATION}
              />
              <Text
                style={[
                  CommonStyles.text_12__semi_bold,
                  {color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8)},
                ]}>
                Add Another Address
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    list_address_status: state.dashboard.list_address_status,
    list_address_response: state.dashboard.list_address_response,
  };
};

const mapDispatchToProps = {
  listAddress,
  removeAddress,
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 15,
    textAlign: 'left',
    color: COLOR.TEXT_COLOR_BLUE,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  textLighter: {
    fontSize: 13,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    color: COLOR.TEXT_COLOR_BLUE,
    fontFamily: 'Montserrat-Regular',
  },
  addressSelectedContianer: {
    marginTop: normalize(24),
    borderWidth: normalize(1),
    borderColor: COLOR.BORDER_COLOR_GREEN,
    borderRadius: normalize(24),
  },
  addressContianer: {
    marginTop: normalize(24),
    borderWidth: normalize(1),
    borderColor: COLOR.BORDER_COLOR_GREY,
    borderRadius: normalize(24),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoreMyAddressScreen);
