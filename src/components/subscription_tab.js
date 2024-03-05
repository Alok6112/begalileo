import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import * as Constants from '../components/helpers/Constants';
import {COLOR, CommonStyles} from '../config/styles';
import {IC_BUY_NOW, IC_ADD_TO_CART} from '../assets/images';
import {addToCart} from '../actions/dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';
import {connect} from 'react-redux';
import CustomGradientButtonIcon from '../components/CustomGradientButtonIcon';
import {getLocalData} from '../components/helpers/AsyncMethods';

import AsyncStorage from '@react-native-community/async-storage';

const groupPrefix = 'gr_sub_';
const oneToOnePrefix = 'one_to_one_';
const groupPrefixCheckBox = 'gr_sub_check_';
const oneToOnePrefixCheckBox = 'one_to_one_check_';

class SubscriptionTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGroupSelected: true,
      ParentUserId: 0,
      selectedSubscription: '',
      subscriptionAddedToCart: '',
      priceDetails: [],
      isBuyNow: false,
      ParentCountry: '',
      currency: Constants.INDIA_CURRENCY,
      recommendedIndex: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentSelectedKid != undefined) {
      if (
        this.props.currentSelectedKid.student_id !==
        prevProps.currentSelectedKid.student_id
      ) {
        this.setState({
          subscriptionAddedToCart: '',
        });
      }
    }
    if (prevProps.add_cart_status != this.props.add_cart_status) {
      if (this.props.add_cart_status) {
        if (this.state.isBuyNow) {
          this.setState(
            {
              isBuyNow: false,
            },
            this.props.goToCartList(),
          );
        }
      }
    }
    if (this.props.cartItems != undefined) {
      if (prevProps.cartItems != this.props.cartItems) {
        this.checkSubscription();
      }
    }
  }

  assignRecommendedIndex() {
    let recIndex = 0;
    if (this.props.recommended == 3) recIndex = 0;
    else if (this.props.recommended == 6) recIndex = 1;
    else if (this.props.recommended == 10) recIndex = 2;

    this.setState({
      recommendedIndex: recIndex,
    });
  }

  checkSubscription = () => {
    const {currentSelectedKid} = this.props;

    var subscriptionCount = 0;
    this.props.cartItems.map((cartItem, cartIndex) => {
      this.state.priceDetails.map((priceItem, priceIndex) => {
        if (
          priceItem.subscription_id == cartItem.subscription_id &&
          currentSelectedKid.student_id == cartItem.student_id
        ) {
          if (cartItem.mathbox_required) {
            this.setState({
              [groupPrefixCheckBox + priceIndex]: true,
            });
          } else {
            this.setState({
              [groupPrefixCheckBox + priceIndex]: false,
            });
          }

          subscriptionCount++;
          this.setState({
            subscriptionAddedToCart: groupPrefix + priceIndex,
          });
        }
      });
    });
    if (subscriptionCount == 0) {
      this.setState({
        subscriptionAddedToCart: '',
      });
    }
  };

  setCheckBoxTrue = () => {
    const {currentSelectedKid} = this.props;
    if (currentSelectedKid.price_details !== undefined) {
      currentSelectedKid.price_details[0].price_details.map((item, index) => {
        this.setState({
          [groupPrefixCheckBox + index]: true,
        });
      });
    }
  };

  componentDidMount() {
    const {currentSelectedKid} = this.props;

    if (currentSelectedKid) {
      if (currentSelectedKid.price_details != undefined) {
        this.setState({
          priceDetails: currentSelectedKid.price_details[0].price_details,
        });
      }
    }
    if (this.props.recommended) this.assignRecommendedIndex();

    if (this.props.dashboard_status) {
      var tempCurrency = '';
      if (
        this.props.dashboard_response.parent_details[0].country ==
        Constants.INDIA
      )
        tempCurrency = Constants.INDIA_CURRENCY;
      else tempCurrency = Constants.OTHER_CURRENCY;

      this.setState(
        {
          ParentCountry:
            this.props.dashboard_response.parent_details[0].country,
          ParentUserId: this.props.dashboard_response.parent_details[0].id,
          currency: tempCurrency,
        },
        this.setCheckBoxTrue,
      );
    }
  }

  onGroupClassSelected = index => {
    const currentSub = groupPrefix + index;

    if (currentSub != this.state.subscriptionAddedToCart) {
      this.setState({
        selectedSubscription: groupPrefix + index,
      });
    }
  };

  onCheckBoxChecked = index => {
    if (this.state[groupPrefixCheckBox + index]) {
      this.setState({
        [groupPrefixCheckBox + index]: false,
      });
    } else {
      this.setState({
        [groupPrefixCheckBox + index]: true,
      });
    }
  };
  addToCart = (index, item) => {
    const currentSub = groupPrefix + index;
    const {currentSelectedKid} = this.props;

    this.setState({
      subscriptionAddedToCart: groupPrefix + index,
      selectedSubscription: '',
    });
    if (
      currentSelectedKid !== undefined &&
      currentSelectedKid.price_details[0]
    ) {
      var isMathBoxSelected = false;

      if (item.currency == Constants.INDIA_CURRENCY) {
        if (this.state[groupPrefixCheckBox + index]) isMathBoxSelected = false;
        else isMathBoxSelected = false;
      }

      this.props.addToCart(
        // this.props.dashboard_response.price_details[0].stage_id,
        item.subscription_id,
        this.state.ParentUserId,
        this.props.currentSelectedKid.student_id,
        this.props.dashboard_response.parent_details[0].country,
        isMathBoxSelected,
      );
    }

    //this.props.addToCart(item);
    // if (this.state.subscriptionAddedToCart == "") {

    //     this.setState({
    //         subscriptionAddedToCart: groupPrefix + index,
    //         selectedSubscription: ""
    //     })

    //     this.props.addToCart(item);

    // }
    // else {
    //     if (currentSub != this.state.subscriptionAddedToCart) {
    //         this.setState({
    //             subscriptionAddedToCart: groupPrefix + index,
    //             selectedSubscription: ""
    //         })

    //         this.props.addToCart(item);
    //     }
    // }
  };

  onBuyNowPress = (index, item) => {
    this.setState({
      isBuyNow: true,
    });
    console.log('h1h1');
    this.addToCart(index, item);
  };
  getPriceForPackage = (item, index) => {
    // console.log("item", item);
    // var mathBoxPrice = item.mathbox_price;
    // var reducedPrice = item.original_price + mathBoxPrice;
    var originalPrice = item.original_price;
    return originalPrice;
  };

  recommendedSubscription = () => {
    const {ParentCountry, recommendedIndex} = this.state;

    const {currentSelectedKid} = this.props;

    const item =
      currentSelectedKid.price_details[0].price_details[recommendedIndex];

    const index = recommendedIndex;

    return (
      <TouchableOpacity
        onPress={() => this.onGroupClassSelected(index)}
        key={index}
        style={{marginTop: normalize(20), marginBottom: normalize(20)}}>
        <View
          style={
            this.state.selectedSubscription == groupPrefix + index
              ? styles.selectedContainerStyle
              : this.state.subscriptionAddedToCart == groupPrefix + index
              ? styles.cartAddedContainerStyle
              : styles.shadowContainerStyle
          }>
          <View
            style={{
              marginStart: normalize(8),
              marginEnd: normalize(8),
              marginBottom: normalize(10),
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(16),
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[CommonStyles.text_18_semi_bold]}>
                  {item.subscription_name}
                </Text>
                {/* <Text style={[CommonStyles.text_12_bold], { color: COLOR.TEXT_COLOR_PURPLE, marginStart: normalize(12), alignSelf: 'center' }}>{item.display_price}</Text> */}
              </View>
              {/* <Text>Check Box  : {String(this.state[groupPrefixCheckBox + index])}</Text> */}
              <View>
                {this.state[groupPrefixCheckBox + index] ? (
                  <Text style={[CommonStyles.text_18_semi_bold]}>
                    {item.currency} {this.getPriceForPackage(item, index)}
                  </Text>
                ) : (
                  <Text style={[CommonStyles.text_18_semi_bold]}>
                    {item.currency} {item.original_price}
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(4),
              }}>
              <View>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    {color: COLOR.TEXT_ALPHA_GREY},
                  ]}>
                  {item.classes} Classes
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={[
                    {
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    },
                    CommonStyles.text_12_regular,
                  ]}>
                  {item.currency} {item.display_price}
                </Text>
              </View>
            </View>

            {/* {ParentCountry == Constants.INDIA && item.boxes !== "" ? (
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    marginTop: normalize(16),
                    borderColor: COLOR.BORDER_COLOR_GREY,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: normalize(12),
                  }}
                >
                  <View style={{ height: normalize(25), width: normalize(25) }}>
                    <CheckBox
                      containerStyle={{ padding: 0, margin: 0 }}
                      size={25}
                      onPress={() => this.onCheckBoxChecked(index)}
                      checked={this.state[groupPrefixCheckBox + index]}
                    />
                  </View>

                  <View style={{ marginStart: normalize(8) }}>
                    <Text style={[CommonStyles.text_12_bold]}>
                      {item.currency} {item.mathbox_price}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_regular,
                        { marginTop: normalize(1) },
                      ]}
                    >
                      Includes {item.boxes} Math boxes
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View></View>
            )} */}

            <View></View>
          </View>
        </View>
        {this.state.selectedSubscription == groupPrefix + index ? (
          <View style={{flexDirection: 'row', marginTop: normalize(12)}}>
            <View>
              <CustomGradientButtonIcon
                myRef={input => {
                  this.btn_add_kid = input;
                }}
                style={{padding: 10, flexDirection: 'row'}}
                children="Confirm"
                icon={IC_BUY_NOW}
                iconStyle={{
                  height: normalize(24),
                  width: normalize(24),
                  marginStart: normalize(26),
                }}
                textStyling={{
                  marginStart: normalize(12),
                  alignSelf: 'center',
                  marginEnd: normalize(26),
                }}
                onPress={() => this.onBuyNowPress(index, item)}
              />
            </View>
            {/* <TouchableOpacity onPress={() => this.addToCart(index, item)} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Image style={{ height: normalize(24), width: normalize(24), marginStart: normalize(16), alignSelf: 'center' }} source={IC_ADD_TO_CART} />
                                <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(16), alignSelf: 'center' }]}>Add to Cart</Text>
                            </TouchableOpacity> */}
          </View>
        ) : this.state.subscriptionAddedToCart == groupPrefix + index ? (
          <View style={{justifyContent: 'center', marginTop: normalize(12)}}>
            <Text
              style={[
                CommonStyles.text_12_bold,
                {color: COLOR.TEXT_COLOR_ORANGE, alignSelf: 'center'},
              ]}>
              Subscription Added to cart
            </Text>
          </View>
        ) : (
          <View />
        )}
      </TouchableOpacity>
    );
  };

  groupClasses() {
    const {ParentCountry} = this.state;

    return this.state.priceDetails.map((item, index) => (
      <Pressable
        onPress={() => this.onGroupClassSelected(index)}
        key={index}
        style={{marginTop: normalize(10), marginBottom: normalize(10)}}>
        <View>
          <View
            style={
              this.state.selectedSubscription == groupPrefix + index
                ? styles.selectedContainerStyle
                : this.state.subscriptionAddedToCart == groupPrefix + index
                ? styles.cartAddedContainerStyle
                : styles.shadowContainerStyle
            }>
            <View
              style={{
                marginStart: normalize(16),
                marginEnd: normalize(16),
                marginBottom: normalize(10),
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: normalize(16),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '40%',
                  }}>
                  <Text style={[CommonStyles.text_18_semi_bold]}>
                    {item?.subscription_name}
                  </Text>
                </View>
                <View style={{marginRight: normalize(5)}}>
                  <Text
                    style={[
                      CommonStyles.text_12__semi_bold,
                      {
                        color: COLOR.TEXT_COLOR_PURPLE,
                        marginStart: normalize(12),
                        alignSelf: 'center',
                      },
                    ]}>
                    {item.discount} % off
                  </Text>
                </View>
                {/* <Text>Check Box  : {String(this.state[groupPrefixCheckBox + index])}</Text> */}
                <View>
                  {this.state[groupPrefixCheckBox + index] ? (
                    <Text style={[CommonStyles.text_18_semi_bold]}>
                      {item.currency} {this.getPriceForPackage(item, index)}
                    </Text>
                  ) : (
                    <Text style={[CommonStyles.text_18_semi_bold]}>
                      {item.currency} {item.original_price}
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: normalize(4),
                }}>
                <View>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {color: COLOR.TEXT_ALPHA_GREY},
                    ]}>
                    {item.classes} Classes
                  </Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text
                    style={[
                      {
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                      },
                      CommonStyles.text_12_regular,
                    ]}>
                    {item.currency} {item.display_price}
                  </Text>
                </View>
              </View>

              {/* {ParentCountry == Constants.INDIA && item.boxes !== "" ? (
                    <View>
                      <View
                        style={{
                          borderWidth: 1,
                          marginTop: normalize(16),
                          borderColor: COLOR.BORDER_COLOR_GREY,
                        }}
                      />

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginTop: normalize(12),
                        }}
                      >
                        <View style={{ width: normalize(25) }}>
                          <CheckBox
                            containerStyle={{ margin: 0, padding: 20 }}
                            size={30}
                            onPress={() => this.onCheckBoxChecked(index)}
                            checked={this.state[groupPrefixCheckBox + index]}
                          />
                        </View>

                        <View style={{ marginStart: normalize(35) }}>
                          <Text style={[CommonStyles.text_12_bold]}>
                            {item.currency} {item.mathbox_price}
                          </Text>
                          <Text style={[CommonStyles.text_12_regular, {}]}>
                            Includes {item.boxes} Math boxes
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View></View>
                  )} */}
            </View>
          </View>
          {this.state.selectedSubscription == groupPrefix + index ? (
            <View style={{flexDirection: 'row', marginTop: normalize(12)}}>
              <View>
                <CustomGradientButtonIcon
                  myRef={input => {
                    this.btn_add_kid = input;
                  }}
                  style={{padding: 10, flexDirection: 'row'}}
                  children="Buy Now"
                  icon={IC_BUY_NOW}
                  iconStyle={{
                    height: normalize(24),
                    width: normalize(24),
                    marginStart: normalize(26),
                  }}
                  textStyling={{
                    marginStart: normalize(12),
                    alignSelf: 'center',
                    marginEnd: normalize(26),
                  }}
                  onPress={() => this.onBuyNowPress(index, item)}
                />
              </View>
              {!(this.props.onlyBuyNow || this.props.isRenew) && (
                <TouchableOpacity
                  onPress={() => this.addToCart(index, item)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    style={{
                      height: normalize(24),
                      width: normalize(24),
                      marginStart: normalize(16),
                      alignSelf: 'center',
                    }}
                    source={IC_ADD_TO_CART}
                  />
                  <Text
                    style={[
                      CommonStyles.text_12_bold,
                      {
                        color: COLOR.TEXT_COLOR_GREEN,
                        marginStart: normalize(16),
                        alignSelf: 'center',
                      },
                    ]}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : this.state.subscriptionAddedToCart == groupPrefix + index ? (
            <View style={{justifyContent: 'center', marginTop: normalize(12)}}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {color: COLOR.TEXT_COLOR_ORANGE, alignSelf: 'center'},
                ]}>
                Subscription Added to cart
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>
      </Pressable>
    ));
  }

  onTabSelected = () => {
    // if (this.state.isGroupSelected)
    //     this.setState({
    //         isGroupSelected: false
    //     })
    // else
    //     this.setState({
    //         isGroupSelected: true
    //     })
  };

  goToBookADemo = () => {
    this.props.navigation.navigate(Constants.BOOK_DEMO_SCREEN_POST_CHILD);
    //this.props.navigation.navigate(Constants.BookDemoScreen);
  };

  oneToOneClasses = () => {
    const groupPrefix = 'group_sub_';
    return this.state.oneToOneSubscriptionList.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={{marginTop: normalize(20), marginBottom: normalize(20)}}>
        <View style={styles.selectedContainerStyle}>
          <View
            style={{
              marginStart: normalize(16),
              marginEnd: normalize(16),
              marginBottom: normalize(16),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(16),
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[CommonStyles.text_18_semi_bold]}>
                  {item.months}
                </Text>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      color: COLOR.TEXT_COLOR_PURPLE,
                      marginStart: normalize(12),
                      alignSelf: 'center',
                    },
                  ]}>
                  {item.discount}
                </Text>
              </View>
              <View>
                <Text style={[CommonStyles.text_18_semi_bold]}>
                  {item.final_price}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(4),
              }}>
              <View>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    {color: COLOR.TEXT_ALPHA_GREY},
                  ]}>
                  Group class{'\n'}(upto 3 kids)
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={[CommonStyles.text_12_regular]}>2500</Text>
                <Text style={[CommonStyles.text_12_regular]}>2499 /month</Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                marginTop: normalize(16),
                borderColor: COLOR.BORDER_COLOR_GREY,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: normalize(12),
              }}>
              <View style={{height: normalize(25), width: normalize(25)}}>
                <CheckBox
                  containerStyle={{padding: 0, margin: 0}}
                  size={25}
                  checked={true}
                />
              </View>

              <View style={{marginStart: normalize(8)}}>
                <Text style={[CommonStyles.text_12_bold]}> 1700</Text>
                <Text
                  style={[
                    CommonStyles.text_12_regular,
                    {marginTop: normalize(1)},
                  ]}>
                  Includes 12 Math boxes for 12 months
                </Text>
              </View>
            </View>

            <View></View>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: normalize(12)}}>
          <View>
            <CustomGradientButtonIcon
              myRef={input => {
                this.btn_add_kid = input;
              }}
              style={{padding: 10, flexDirection: 'row'}}
              children="Buy Now"
              icon={IC_BUY_NOW}
              iconStyle={{
                height: normalize(24),
                width: normalize(24),
                marginStart: normalize(26),
              }}
              textStyling={{
                marginStart: normalize(12),
                alignSelf: 'center',
                marginEnd: normalize(26),
              }}
              onPress={this.goToHome}
            />
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              style={{
                height: normalize(24),
                width: normalize(24),
                marginStart: normalize(16),
                alignSelf: 'center',
              }}
              source={IC_ADD_TO_CART}
            />
            <Text
              style={[
                CommonStyles.text_12_bold,
                {
                  color: COLOR.TEXT_COLOR_GREEN,
                  marginStart: normalize(16),
                  alignSelf: 'center',
                },
              ]}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ));
  };
  render() {
    const {isGroupSelected, subscriptionList} = this.state;
    return (
      <View style={{marginStart: normalize(5), marginEnd: normalize(5)}}>
        {this.props.dashboard_status && this.state.recommendedIndex != null && (
          <View>
            {this.recommendedSubscription()}
            <Text style={[CommonStyles.text_14_semi_bold]}>
              Other Recommeded Programs
            </Text>
          </View>
        )}

        <View style={{flexDirection: 'row', marginTop: normalize(20)}}>
          <TouchableOpacity
            onPress={this.onTabSelected}
            style={isGroupSelected ? styles.tabItemSelected : styles.tabItem}>
            <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>
              Buy now
            </Text>
          </TouchableOpacity>
          {!(this.props.onlyBuyNow || this.props.isRenew) &&
            this.props.currentSelectedKid &&
            !this.props.currentSelectedKid.demo_booked && (
              <TouchableOpacity
                onPress={this.goToBookADemo}
                style={[
                  {marginStart: normalize(25)},
                  isGroupSelected ? styles.tabItem : styles.tabItemSelected,
                ]}>
                <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>
                  Book a demo
                </Text>
              </TouchableOpacity>
            )}
        </View>

        <View style={{marginTop: normalize(10)}}>
          {isGroupSelected ? this.groupClasses() : this.oneToOneClasses()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tabItem: {
    paddingBottom: normalize(8),
  },
  tabItemSelected: {
    paddingBottom: normalize(8),
    borderBottomColor: COLOR.TAB_BOTTOM_BLUE,
    borderBottomWidth: 2,
  },
  tabItemText: {
    color: COLOR.TEXT_COLOR_BLACK,
  },
  shadowContainerStyle: {
    //<--- Style with elevation

    backgroundColor: COLOR.WHITE,
    borderWidth: 1,
    borderRadius: normalize(24),
    borderColor: COLOR.TEXT_COLOR_HINT,

    ...Platform.select({
      ios: {
        shadowColor: '#0B42AB',
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  selectedContainerStyle: {
    //<--- Style with elevation

    backgroundColor: COLOR.WHITE,
    borderWidth: 1,
    borderRadius: normalize(24),
    borderColor: COLOR.BORDER_COLOR_GREEN,
  },
  cartAddedContainerStyle: {
    //<--- Style with elevation

    backgroundColor: COLOR.WHITE,
    borderWidth: 1,
    borderRadius: normalize(24),
    borderColor: COLOR.WHITE,
    opacity: 0.5,
  },
});

const mapStateToProps = state => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    dashboard_response: state.dashboard.dashboard_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
    add_cart_status: state.dashboard.add_cart_status,
    add_cart_response: state.dashboard.add_cart_response,
    dashboard_status: state.dashboard.dashboard_status,
    remove_from_cart_status: state.dashboard.remove_from_cart_status,
    cartItems: state.dashboard.cartItems,
    user_detail_response: state.dashboard.user_detail_response,
  };
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionTabs);
