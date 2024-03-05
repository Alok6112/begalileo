/* eslint-disable */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ActivityIndicator,
  PanResponder,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {
  RAZOR_PAY_TEST_KEY,
  RAZOR_PAY_TEST_SECRET,
  SCREEN_WIDTH,
} from '../../config/configs';
import {
  IMG_SHAKSHI,
  IC_REMOVE_ITEM,
  IC_CLOSE_BLUE,
  CART_INDICATOR_MY_CART,
} from '../../assets/images';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  removeFromCart,
  getCartItemList,
  doApplyCoupon,
  doRemoveCoupon,
  createPaymentOrder,
  updatePaymentStatus,
} from '../../actions/dashboard';
import CustomGradientButton from '../../components/CustomGradientButton';

import {getLocalData} from '../../components/helpers/AsyncMethods';
import {
  payWithRazorPayFromCart,
  payWithStripe,
} from '../../components/helpers/payment_methods';
import {normalize} from 'react-native-elements';
import RNRazorpayCheckout from 'react-native-razorpay';
import {CustomBackButton} from '../../components';
import PaymentDoScreen from '../PaymentScreens/payment_do_screen';

class CartListScreen extends Component {
  constructor(props) {
    super(props);
    this.updateCartPaymentStatus = this.updateCartPaymentStatus.bind(this);
    this.paymentDoScreen = React.createRef();
    this.handleBackButton = this.handleBackButton.bind(this);
    this.state = {
      cartItems: [],
      confirmCancelDialog: false,
      currentProduct: null,
      applyCouponDialog: false,
      userCouponCode: '',
      isValidCouponCode: true,
      isCouponApplied: false,
      netTotalPrice: 0,
      cartTotalPrice: 0,
      cartDiscountPrice: 0,
      couponDiscount: 0,
      mathBoxPrice: 0,
      mLocalCountry: '',
      mParentId: 0,
      isCouponApplied: false,
      finalAmountAfterCoupon: 0,
      currency: Constants.INDIA_CURRENCY,
    };
  }

  componentWillUnmount() {
    if (Platform.OS == 'android')
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButton,
      );
  }

  componentDidMount() {
    if (this.props.dashboardStatus) {
      let parentDetail = this.props.dashboardResponse.parent_details[0];
      let parentCurrency =
        parentDetail.currency == Constants.INDIA
          ? Constants.INDIA_CURRENCY
          : Constants.OTHER_CURRENCY;
      this.setState({
        localParentName: parentDetail.first_name + ' ' + parentDetail.last_name,
        localParentEmail: parentDetail.email,
        localParentContactNumber: parentDetail.mobile,
        currency: parentDetail.currency,
        mLocalCountry: parentDetail.country,
        mParentId: parentDetail.id,
      });

      //this.calculatePriceDetails();
      this.getCartListScreen();
    }
    if (Platform.OS == 'android')
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    this.onPressBack();
  }

  getCartListScreen = () => {
    if (this.props.dashboardStatus)
      this.props.getCartItemList(
        this.props.dashboardResponse.parent_details[0].id,
        this.props.dashboardResponse.parent_details[0].country,
      );
  };

  componentDidUpdate(prevProps) {
    console.log(
      prevProps.apply_coupon_status + '---' + this.props.apply_coupon_status,
    );

    if (prevProps.cartItems != this.props.cartItems) {
      console.log('Cart items changed');
    }
    if (prevProps.create_order_status != this.props.create_order_status) {
      if (this.props.create_order_status) {
        this.proceedToPayment(this.props.create_order_response);
      }
    }
    if (prevProps.get_cart_list_status != this.props.get_cart_list_status) {
      if (this.props.get_cart_list_status) {
        if (this.props.get_cart_list_response.coupon_discount > 0) {
          this.setState(
            {
              isCouponApplied: true,
              couponDiscount: this.props.get_cart_list_response.coupon_discount,
            },
            this.calculatePriceDetails,
          );
        } else {
          this.setState(
            {
              isCouponApplied: false,
              couponDiscount: this.props.get_cart_list_response.coupon_discount,
            },
            this.calculatePriceDetails,
          );
        }
      }
    }
    if (prevProps.apply_coupon_status != this.props.apply_coupon_status) {
      if (this.props.apply_coupon_status) {
        this.setState(
          {
            isValidCouponCode: true,
            couponDiscount: this.props.apply_coupon_response.coupon_discount,
            isCouponApplied: true,
          },
          this.calculatePriceDetails,
        );
      } else {
        if (this.props.apply_coupon_status != null) {
          this.setState(
            {
              isValidCouponCode: false,
              couponDiscount: 0,
            },
            this.calculatePriceDetails,
          );
        }
      }
    }
    if (prevProps.remove_coupon_status != this.props.remove_coupon_status) {
      if (this.props.remove_coupon_status) {
        this.setState(
          {
            isValidCouponCode: true,
            couponDiscount: this.props.remove_coupon_response.coupon_discount,
            isCouponApplied: false,
          },
          this.calculatePriceDetails,
        );
      }
    }
    if (
      prevProps.remove_from_cart_status != this.props.remove_from_cart_status
    ) {
      if (this.props.remove_from_cart_status) {
        this.getCartListScreen();
      }
    }
    if (prevProps.update_payment_status != this.props.update_payment_status) {
      if (this.props.update_payment_status != null) {
        if (this.props.update_payment_status) {
          this.props.navigation.navigate(Constants.PaymentSuccessScreen);
        } else this.props.navigation.navigate(Constants.PaymentFailedScreen);
      }
    }
  }

  updateCartPaymentStatus = (razorpay_payment_id, isFrom) => {
    console.log('Create order response', this.props.create_order_response);

    if (isFrom == 'cart')
      this.props.updatePaymentStatus(
        razorpay_payment_id,
        this.state.mParentId,
        this.props.get_cart_list_response.mathbox_order_id,
        this.state.localParentContactNumber,
        this.state.localParentEmail,
        'stripe',
        JSON.stringify(this.props.create_order_response.user_subscription_ids),
        this.props.create_order_response.paid_amount,
      );
  };

  proceedToPayment = order_response => {
    console.log('Order response', order_response);
    this.paymentDoScreen.current.initiatePayment(
      order_response.customer,
      order_response.ephemeralkey,
      order_response.payment_intent_id,
      order_response.payment_intent_secret,
      'cart',
    );

    // var customerId = 'cus_M8R0picPtCyHJY';
    // var ephermalKey = 'ek_test_YWNjdF8xSWhDRmFTQk83MGtLUXRKLDhpYktheW10c3d3Q3JaSlBBZkR0aml0ZUhETFZuSGM_00nB99gM2I';
    // var paymentintentSecret = 'pi_3LQA9tSBO70kKQtJ0tJxewlx_secret_ljSn6je1y8hmGSP1fcM4oCM6D';
    // payWithStripe(customerId,ephermalKey,paymentintentSecret)

    // payWithRazorPayFromCart(order_response, this.state.netTotalPrice,
    //     this.props.dashboardResponse.parent_details[0].country,
    //     this.props.dashboardResponse.parent_details[0].email,
    //     this.props.dashboardResponse.parent_details[0].mobile,
    //     this.props.dashboardResponse.parent_details[0].first_name,
    //     this.props.navigation,
    //     this.updateCartPaymentStatus
    // )

    return;
  };

  calculatePriceDetails = () => {
    var mathBoxPriceTotal = 0;
    var cartPriceTotal = 0;
    var cartDiscountTotal = 0;
    var netPriceTotal = 0;
    this.props.cartItems.map(item => {
      var cartDiscount = item.display_amount - item.amount;
      var mathBoxPricePerPack = item.boxes * 500;

      if (!item.mathbox_required) mathBoxPriceTotal += mathBoxPricePerPack;
      cartPriceTotal += item.display_amount;
      cartDiscountTotal += cartDiscount;
    });

    netPriceTotal += 0;
    if (this.props.get_cart_list_status)
      netPriceTotal = this.props.get_cart_list_response.net_amount;

    if (this.props.apply_coupon_status && this.state.isCouponApplied)
      netPriceTotal = this.props.apply_coupon_response.net_amount;

    this.setState({
      cartTotalPrice: cartPriceTotal,
      cartDiscountPrice: cartDiscountTotal,
      mathBoxPrice: mathBoxPriceTotal,
      netTotalPrice: netPriceTotal,
    });
  };

  removeCartItem = () => {
    // console.log(this.state.currentProduct);
    this.props.removeFromCart(
      this.state.currentProduct.mathbox_order_item_id,
      this.state.mLocalCountry,
    );
    this.closeConfirmationdemo();
  };
  closeConfirmationdemo = () => {
    this.setState({
      confirmCancelDialog: false,
    });
  };
  openConfirmationDemo = item => {
    this.setState({
      currentProduct: item,
      confirmCancelDialog: true,
    });
  };
  openApplyCoupon = () => {
    this.setState({
      applyCouponDialog: true,
    });
  };
  closeApplyCoupon = () => {
    this.setState({
      applyCouponDialog: false,
    });
  };
  proceedToCart = () => {
    this.closeApplyCoupon();
  };
  applyCouponCode = () => {
    const {userCouponCode, mLocalCountry} = this.state;

    this.props.doApplyCoupon(
      userCouponCode,
      this.props.get_cart_list_response.mathbox_order_id,
      mLocalCountry,
    );
  };

  onRemoveCoupon = () => {
    this.onRemoveCouponConfirmation();
    // Alert.alert(
    //     "Are you Sure want to remove applied coupon?",
    //     "",
    //     [
    //         {
    //             text: "Cancel",
    //             onPress: () => console.log("Cancel Pressed"),
    //             style: "cancel"
    //         },
    //         { text: "OK", onPress: () => this.onRemoveCouponConfirmation() }
    //     ],
    //     { cancelable: false }
    // );
  };

  onRemoveCouponConfirmation = () => {
    this.props.doRemoveCoupon(
      this.props.get_cart_list_response.mathbox_order_id,
      this.state.mLocalCountry,
    );
  };

  getMathBoxRequiredStatus = () => {
    var isMathboxRequired = false;
    this.props.cartItems.map(item => {
      if (item.mathbox_required) isMathboxRequired = true;
    });
    return isMathboxRequired;
  };

  goToAddressScreen = () => {
    this.props.navigation.navigate(Constants.CartAddress, {
      netTotalPrice: this.state.netTotalPrice,
      isMathboxRequired: this.getMathBoxRequiredStatus(),
    });
  };

  proceedToAddress = () => {
    // if(this.props.dashboardResponse.parent_details[0].name == "" || this.props.dashboardResponse.parent_details[0].mobile == "" || this.props.dashboardResponse.parent_details[0].email == "")
    // {
    //     showMessage({
    //         message: "Please update profile to proceed",
    //         type: "warning",
    //     });
    //     this.props.navigation.navigate(Constants.MoreProfileScreen);
    //     return;
    // }

    if (this.state.currency == Constants.INDIA_CURRENCY) {
      console.log('Currency', this.state.currency);
      if (this.getMathBoxRequiredStatus()) this.goToAddressScreen();
      else this.doCreatePaymentOrder();
    } else {
      // alert("Proceed to payment");
      this.doCreatePaymentOrder();
    }
  };

  doCreatePaymentOrder = () => {
    this.props.createPaymentOrder(
      this.props.get_cart_list_response.mathbox_order_id,
      this.state.mParentId,
      this.state.localParentCountry,
      '',
      'stripe',
    );
  };

  getProceedButtonText = () => {
    if (this.state.currency != Constants.INDIA_CURRENCY)
      return 'Proceed to Payment';
    else {
      if (this.getMathBoxRequiredStatus()) return 'Proceed to Address';
      else return 'Proceed to Payment';
    }
  };

  returnCalculatedPrice = item => {
    return item.net_amount;

    if (!item.mathbox_required) {
      var mathBoxPrice = item.duration * 500;
      var reducedPrice = item.amount - mathBoxPrice;
      return reducedPrice;
    } else {
      return item.amount;
    }
  };

  renderCartProducts() {
    return this.props.cartItems.map((item, index) => (
      <View key={index} style={{marginTop: normalize(20)}}>
        <View
          style={{
            borderColor: COLOR.BORDER_COLOR_GREY,
            borderWidth: normalize(1),
            borderRadius: normalize(24),
          }}>
          <View
            style={{
              marginStart: normalize(16),
              marginTop: normalize(15),
              marginBottom: normalize(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  borderRadius: 100,
                  height: normalize(30),
                  width: normalize(30),
                  resizeMode: 'stretch',
                }}
                source={{uri: item.photo}}
              />
              <Text
                style={[
                  CommonStyles.text_12__semi_bold,
                  {alignSelf: 'center', marginStart: normalize(8)},
                ]}>
                {item.student_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginEnd: normalize(16),
              }}>
              <Text
                style={[
                  CommonStyles.text_12_regular,
                  {color: COLOR.TEXT_ALPHA_GREY},
                ]}>
                {item.live_classes} Classes{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLOR.BORDER_COLOR_GREY,
              height: normalize(1),
            }}
          />
          <View
            style={{
              marginTop: normalize(12),
              marginStart: normalize(16),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginEnd: normalize(16),
              marginBottom: normalize(32),
            }}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[CommonStyles.text_18_bold]}>
                  {item.duration} Months
                </Text>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      color: COLOR.TEXT_COLOR_PURPLE,
                      alignSelf: 'center',
                      marginStart: normalize(8),
                    },
                  ]}>
                  {item.discount}% off
                </Text>
              </View>
              {/* {item.mathbox_required &&
                this.state.mLocalCountry == Constants.INDIA && (
                  <View
                    style={{ marginTop: normalize(4), marginTop: normalize(4) }}
                  >
                    <Text style={[CommonStyles.text_12_regular]}>
                      With {item.boxes} Math boxes{"\n"}for {item.duration}{" "}
                      months
                    </Text>
                  </View>
                )} */}
            </View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[CommonStyles.text_18_bold]}>
                  {this.state.currency} {this.returnCalculatedPrice(item)}
                </Text>
              </View>
              <View style={{marginTop: normalize(4), marginTop: normalize(4)}}>
                <Text
                  style={[
                    CommonStyles.text_12_regular,
                    {textDecorationLine: 'line-through'},
                  ]}>
                  {this.state.currency}. {item.display_amount}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.openConfirmationDemo(item);
          }}
          style={{flexDirection: 'row', marginTop: normalize(12)}}>
          <Image
            style={{
              borderRadius: 100,
              height: normalize(16),
              width: normalize(16),
              resizeMode: 'stretch',
            }}
            source={IC_REMOVE_ITEM}
          />
          <Text
            style={[
              CommonStyles.text_12__semi_bold,
              {color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8)},
            ]}>
            Remove Item
          </Text>
        </TouchableOpacity>
      </View>
    ));
  }
  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  render() {
    const {cartItems, loading} = this.props;
    const {
      confirmCancelDialog,
      applyCouponDialog,
      userCouponCode,
      isValidCouponCode,
    } = this.state;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref="_scrollView"
        style={{
          flex: 1,
          backgroundColor: COLOR.WHITE,
        }}>
        <PaymentDoScreen
          ref={this.paymentDoScreen}
          updateCartPaymentStatus={this.updateCartPaymentStatus}
        />
        {loading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={CommonStyles.loadingIndicatior}
          />
        )}

        <View style={{marginStart: 20}}>
          <CustomBackButton onPress={this.onPressBack} />
        </View>
        <View
          style={{
            marginStart: normalize(20),
            marginEnd: normalize(20),
            marginBottom: normalize(30),
          }}>
          {this.props.cartItems && this.props.cartItems.length > 0 ? (
            <View style={{marginTop: normalize(12)}}>
              <Text
                style={[
                  CommonStyles.text_18_semi_bold,
                  {color: COLOR.TEXT_COLOR_BLUE},
                ]}>
                My Cart
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4)},
                ]}>
                {cartItems.length} Subscription
              </Text>
            </View>
          ) : (
            <View></View>
          )}

          <View
            style={{
              flexDirection: 'row',
              marginStart: normalize(40),
              marginEnd: normalize(40),
              backgroundColor: COLOR.BG_ALPHA_BLUE,
            }}>
            {/* <Image
              style={{
                resizeMode: "contain",
                width: normalize(230),
                marginTop: normalize(20),
                marginBottom: normalize(20),
                height: normalize(40),
                alignSelf: "center",
              }}
              source={CART_INDICATOR_MY_CART}
            /> */}
          </View>
          <View>
            {this.props.cartItems && this.props.cartItems.length > 0 ? (
              this.renderCartProducts()
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>
                  Your cart is empty
                </Text>
              </View>
            )}
          </View>

          {this.props.cartItems && this.props.cartItems.length > 0 ? (
            <View>
              <View>
                <Text
                  style={[
                    CommonStyles.text_14_bold,
                    {marginTop: normalize(24)},
                  ]}>
                  Price Details
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(24),
                  }}>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {color: COLOR.TEXT_ALPHA_GREY},
                    ]}>
                    Cart Total
                  </Text>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {color: COLOR.TEXT_ALPHA_GREY},
                    ]}>
                    {this.state.currency} {this.state.cartTotalPrice}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(12),
                  }}>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {color: COLOR.TEXT_ALPHA_GREY},
                    ]}>
                    Cart Discount
                  </Text>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {color: COLOR.TEXT_COLOR_PURPLE},
                    ]}>
                    - {this.state.currency}. {this.state.cartDiscountPrice}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(12),
                  }}>
                  <View>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {color: COLOR.TEXT_ALPHA_GREY},
                      ]}>
                      Coupon Discount
                    </Text>
                    {this.props.get_cart_list_response && (
                      <View>
                        {this.state.isCouponApplied ? (
                          <TouchableOpacity onPress={this.onRemoveCoupon}>
                            <Text
                              style={[
                                CommonStyles.text_12_bold,
                                {
                                  color: COLOR.TEXT_COLOR_GREEN,
                                  marginTop: normalize(12),
                                },
                              ]}>
                              Remove coupon
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={this.openApplyCoupon}>
                            <Text
                              style={[
                                CommonStyles.text_12_bold,
                                {
                                  color: COLOR.TEXT_COLOR_GREEN,
                                  marginTop: normalize(12),
                                },
                              ]}>
                              Apply coupon
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>

                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {color: COLOR.TEXT_COLOR_PURPLE},
                    ]}>
                    - {this.state.currency}. {this.state.couponDiscount}
                  </Text>
                </View>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: normalize(12) }}>
                                         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>Mathbox Price</Text>
                                         <View style={{ flexDirection: 'row' }}>
       
                                             <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{this.state.currency} {this.state.mathBoxPrice}</Text>
                                         </View>
                                     </View> */}

                <View
                  style={{
                    borderColor: COLOR.BORDER_COLOR_GREY,
                    borderWidth: normalize(1),
                    marginTop: normalize(12),
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(12),
                  }}>
                  <Text style={[CommonStyles.text_12_bold]}>Total</Text>
                  <Text style={[CommonStyles.text_12_bold]}>
                    {this.state.currency} {this.state.netTotalPrice}
                  </Text>
                </View>

                {/* <View>
                                         <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_GREEN, marginTop: normalize(24) }]}>Need help?</Text>
                                     </View> */}
              </View>
              <View
                style={{
                  marginTop: normalize(16),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={[CommonStyles.text_12_Regular]}>You pay</Text>
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      {color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(2)},
                    ]}>
                    {this.state.currency} {this.state.netTotalPrice}
                  </Text>
                </View>
                <View>
                  <CustomGradientButton
                    myRef={input => {
                      this.btn_pay_now = input;
                    }}
                    style={styles.btn_proceed_address}
                    children={this.getProceedButtonText()}
                    onPress={this.proceedToAddress}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View />
          )}

          {confirmCancelDialog && (
            <Modal transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: COLOR.TEXT_ALPHA_GREY,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: COLOR.WHITE,
                    marginHorizontal: normalize(10),
                    borderRadius: normalize(12),
                  }}>
                  <View>
                    <Text
                      style={{
                        color: COLOR.BLACK,
                        fontFamily: Constants.Montserrat_Regular,
                        fontSize: normalize(14),
                        padding: normalize(30),
                        textAlign: 'center',
                      }}>
                      beGalileo is a great gift for your child. Are you sure you
                      want to remove it from the cart?
                    </Text>
                    <View
                      style={{
                        borderColor: COLOR.LIGHT_BORDER_COLOR,
                        borderWidth: 1,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignSelf: 'stretch',
                      }}>
                      <TouchableOpacity
                        style={{
                          color: COLOR.BLACK,
                          flex: 1,
                          fontFamily: Constants.Montserrat_Regular,
                          padding: normalize(15),
                        }}
                        onPress={this.removeCartItem}>
                        <Text
                          style={[
                            CommonStyles.text_14_bold,
                            {textAlign: 'center'},
                          ]}>
                          Yes
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          color: COLOR.BLACK,
                          flex: 1,
                          fontFamily: Constants.Montserrat_Regular,
                          padding: normalize(15),
                        }}
                        onPress={this.closeConfirmationdemo}>
                        <Text
                          style={[
                            CommonStyles.text_14_bold,
                            {
                              textAlign: 'center',
                              color: COLOR.TEXT_COLOR_GREEN,
                            },
                          ]}>
                          No
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {applyCouponDialog && (
            <Modal transparent={true}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  backgroundColor: COLOR.TEXT_ALPHA_GREY,
                }}>
                <View
                  style={{
                    height: 400,
                    backgroundColor: COLOR.WHITE,
                    justifyContent: 'space-evenly',
                    borderTopStartRadius: 24,
                    borderTopEndRadius: 24,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 27,
                      marginStart: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        CommonStyles.text_12__semi_bold,
                        {alignSelf: 'center'},
                      ]}>
                      Apply coupon
                    </Text>
                    <TouchableOpacity onPress={this.closeApplyCoupon}>
                      <Image
                        style={{
                          height: normalize(30),
                          width: normalize(30),
                          resizeMode: 'contain',
                          padding: 20,
                          marginEnd: 20,
                        }}
                        source={IC_CLOSE_BLUE}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 30,
                      marginHorizontal: 20,
                      borderRadius: normalize(12),
                      borderWidth: normalize(1),
                      borderColor: COLOR.BORDER_COLOR_GREY,
                    }}>
                    <TextInput
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          flex: 1,
                          height: 75,
                          paddingHorizontal: 10,
                          textAlignVertical: 'center',
                          justifyContent: 'center',
                        },
                      ]}
                      placeholder={'Enter Coupon Code'}
                      value={userCouponCode}
                      onChangeText={userCouponCode =>
                        this.setState({userCouponCode})
                      }
                    />
                    {this.state.userCouponCode.length > 2 &&
                    !this.state.isCouponApplied &&
                    !loading ? (
                      <TouchableOpacity
                        onPress={this.applyCouponCode}
                        style={{justifyContent: 'center'}}>
                        <Text
                          style={[
                            CommonStyles.text_12_bold,
                            {
                              color: COLOR.TEXT_COLOR_GREEN,
                              marginEnd: normalize(16),
                            },
                          ]}>
                          Apply
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View></View>
                    )}
                  </View>
                  {!isValidCouponCode && !loading ? (
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.RED,
                          marginTop: normalize(7),
                          marginStart: 20,
                        },
                      ]}>
                      Invalid coupon code
                    </Text>
                  ) : (
                    <View />
                  )}

                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: normalize(32),
                      marginBottom: normalize(30),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {this.props.apply_coupon_status &&
                      this.state.isCouponApplied && (
                        <View>
                          <Text style={[CommonStyles.text_12_Regular]}>
                            Maximum savings
                          </Text>
                          <Text
                            style={[
                              CommonStyles.text_18_bold,
                              {
                                color: COLOR.TEXT_COLOR_BLUE,
                                marginTop: normalize(2),
                              },
                            ]}>
                            {this.state.currency}.{' '}
                            {this.props.apply_coupon_response.coupon_discount}
                          </Text>
                        </View>
                      )}

                    <View>
                      <CustomGradientButton
                        myRef={input => {
                          this.btn_pay_now = input;
                        }}
                        style={styles.btn_proceed_address}
                        children={'Proceed to cart'}
                        onPress={this.proceedToCart}
                      />
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Modal>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  btn_proceed_address: {
    alignItems: 'center',
    paddingTop: normalize(15),
    paddingStart: normalize(20),
    paddingEnd: normalize(20),
    paddingBottom: normalize(15),
  },
});

const mapStateToProps = state => {
  console.log(state.dashboard.cartItems);
  return {
    cartItems: state.dashboard.cartItems,
    loading: state.dashboard.loading,
    dashboardStatus: state.dashboard.dashboard_status,
    dashboardResponse: state.dashboard.dashboard_response,
    get_cart_list_response: state.dashboard.get_cart_list_response,
    get_cart_list_status: state.dashboard.get_cart_list_status,
    apply_coupon_status: state.dashboard.apply_coupon_status,
    apply_coupon_response: state.dashboard.apply_coupon_response,
    remove_coupon_status: state.dashboard.remove_coupon_status,
    remove_coupon_response: state.dashboard.remove_coupon_response,
    remove_from_cart_status: state.dashboard.remove_from_cart_status,
    remove_from_cart_response: state.dashboard.remove_from_cart_response,
    create_order_status: state.dashboard.create_order_status,
    create_order_response: state.dashboard.create_order_response,
    update_payment_status: state.dashboard.update_payment_status,
    update_payment_response: state.dashboard.update_payment_response,
  };
};

const mapDispatchToProps = {
  removeFromCart,
  getCartItemList,
  doApplyCoupon,
  doRemoveCoupon,
  createPaymentOrder,
  updatePaymentStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(CartListScreen);
