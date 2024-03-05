import {StyleSheet, Platform} from 'react-native';
import {DefaultTheme} from 'react-native-paper';
import {normalize} from 'react-native-elements';
import * as Constants from '../../src/components/helpers/Constants';
export const COLOR = {
  DARK: '#040207',
  PANTOME: '#ff6f61',
  LIGHT: '#ffffff',
  BLACK: '#000',
  GRAY: '#9A9A9A',
  LIGHT_GRAY: '#f2f2f2',
  DANGER: '#FF5370',
  PRIMARY_BG: '#FFFFFF',
  RED: '#FF0000',
  WHITE: '#FFFFFF',
  LIGHT_BORDER_COLOR: '#E2E4EE',
  LIGHT_BORDER_GREEN: '#4DC591',
  LOGIN_BANNER_BG: '#F3F7FF',
  TEXT_COLOR_BLUE: '#202E6D',
  TEXT_COLOR_BLACK: '#353639',
  TEXT_COLOR_BLACK_70: '#353639',
  TEXT_COLOR_GREY: '#AEAEAE',
  TEXT_COLOR_LIGHT_GREY: '#999D99',
  TEXT_COLOR_HINT: '#AEAEAE',
  TEXT_COLOR_GREEN: '#4DC591',

  TEXT_COLOR_ORANGE: '#FC851B',
  TEXT_COLOR_YELLOW: '#FFDC5D',
  BORDER_COLOR_GREEN: '#4DC591',
  BORDER_COLOR_GREY: '#E2E4EE',
  TAB_ICON_INACTIVE: '#AEAEAE',
  TAB_ICON_ACTIVE: '#4DC591',
  BG_FAQ_GRERY: '#F3F7FF',
  BG_YELLOW: '#FFF3C9',
  SPEEDMATH_YELLLOW: '#FEDD52',
  BG_PURPLE: '#DADEFF',
  TEXT_TITLE_HEADLINE: '#233584',
  TEXT_BODY_COLOR: '#353639',
  LIGHT_BLUE: '#F3F7FF',
  TRACKING_BLUE: '#72BEFF',
  TEXT_ALPHA_GREY: 'rgba(53, 54, 57, 0.7)',
  BG_ALPHA_BLACK: 'rgba(0, 0, 0, 0.9)',
  BG_ALPHA_BLUE: 'rgba(243,247,255,0.2)',
  TAB_BOTTOM_BLUE: '#3E63D3',
  BLUE_LINk: '#3E63D3',
  TEXT_COLOR_PURPLE: '#A35BEB',
  SHADOW_COLOR: 'rgba(11, 66, 171, 0.16)',
  KID_SELECTED: '#DDF3FC',
  INPROGRESS_YELLOW: '#FFF5D7',
  ORANGE: '#F2994A',
  COMPLETED_GREEN: '#C9FFDF',
  BAR_CHART_YELLOW_ALPHA: '#FFDC5D80',
  PIE_CHART_BLUE: '#9AD6E3',
  PIE_CHART_YELLOW: '#FFDC5D',
  PIE_CHART_GREEN: '#BAE39A',
  PIE_CHART_PURPLE: '#9FB2F5',
  TARIFF_CARD: '#F2F7F2',
};

export const PIE_CHART_COLORS = [
  COLOR.PIE_CHART_BLUE,
  COLOR.PIE_CHART_GREEN,
  COLOR.PIE_CHART_YELLOW,
  COLOR.PIE_CHART_PURPLE,
];
export const BAR_CHART_COLORS = [
  'rgb(255, 220, 93, 0.3)',
  'rgb(154, 214, 227, 0.3)',
  'rgb(194, 102, 255, 0.8)',
  'rgb(214, 153, 255, 0.8)',
];
export const BAR_CHART_COLOR_LINES = [
  'rgb(255, 220, 93)',
  'rgb(154, 214, 227)',
  'rgb(194, 102, 255)',
  'rgb(214, 153, 255)',
];
export const radioButtonTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.LIGHT_GRAY,
    padding: 16,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 100,
  },
  loadingIndicatior: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  img_no_record: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  text_18_bold: {
    fontFamily: Constants.Montserrat_Bold,
    fontSize: normalize(18),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_18_semi_bold: {
    fontFamily: Constants.Montserrat_Semi_Bold,
    fontSize: normalize(18),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_18_regular: {
    fontFamily: Constants.Montserrat_Regular,
    fontSize: normalize(18),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },

  text_16_bold: {
    fontFamily: Constants.Montserrat_Bold,
    fontSize: normalize(16),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_16_semi_bold: {
    fontFamily: Constants.Montserrat_Semi_Bold,
    fontSize: normalize(16),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_16_regular: {
    fontFamily: Constants.Montserrat_Regular,
    fontSize: normalize(16),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },

  text_14_semi_bold: {
    fontFamily: Constants.Montserrat_Semi_Bold,
    fontSize: normalize(14),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_12_regular: {
    fontFamily: Constants.Montserrat_Regular,
    fontSize: normalize(12),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_12_bold: {
    fontFamily: Constants.Montserrat_Bold,
    fontSize: normalize(12),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_12__semi_bold: {
    fontFamily: Constants.Montserrat_Semi_Bold,
    fontSize: normalize(12),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_14_bold: {
    fontFamily: Constants.Montserrat_Bold,
    fontSize: normalize(14),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },

  text_14_Regular: {
    fontFamily: Constants.Montserrat_Regular,
    fontSize: normalize(14),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_12_Regular: {
    fontFamily: Constants.Montserrat_Regular,
    fontSize: normalize(12),
    lineHeight: 25,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_11_Regular: {
    fontSize: normalize(11),
    lineHeight: 25,
    fontFamily: Constants.Montserrat_Regular,
    color: Constants.TEXT_COLOR_BLACK,
  },
  text_11_bold: {
    fontSize: normalize(11),
    lineHeight: 25,
    fontFamily: Constants.Montserrat_Bold,
    color: Constants.TEXT_COLOR_BLACK,
  },
  text_11_semi_bold: {
    fontSize: normalize(11),
    lineHeight: 25,
    fontFamily: Constants.Montserrat_Semi_Bold,
    color: Constants.TEXT_COLOR_BLACK,
  },
  text_6_regular: {
    fontSize: normalize(8),
    fontFamily: Constants.Montserrat_Regular,
  },
  text_8_regular: {
    fontSize: normalize(9),
    fontFamily: Constants.Montserrat_Regular,
  },
  text_8_regular: {
    fontSize: normalize(11),
    lineHeight: 25,
    fontFamily: Constants.Montserrat_Regular,
  },
  text_8_bold: {
    fontSize: normalize(11),
    lineHeight: 25,
    fontFamily: Constants.Montserrat_Bold,
    fontWeight: '600',
  },
  text_9_regular: {
    fontSize: normalize(9),
    lineHeight: 25,
    fontFamily: Constants.Montserrat_Regular,
  },
  text_9_semi_bold: {
    fontSize: normalize(9),
    lineHeight: 25,
    fontFamily: Constants.Montserrat_Bold,
    color: COLOR.TEXT_COLOR_BLACK,
  },
  text_9_bold: {
    fontSize: normalize(9),
    lineHeight: 25,
    fontFamily: Constants.Montserrat_Bold,
    fontWeight: '600',
  },
  text_32_regular: {
    fontSize: normalize(32),
    lineHeight: 25,
    fontFamily: Constants.Montserrat_Regular,
    fontWeight: '200',
  },
  textBody_1: {
    fontSize: normalize(14),
    lineHeight: 25,
    fontFamily: Constants.Montserrat_Regular,
    color: Constants.TEXT_BODY_COLOR,
  },
  green_button_gradient: {
    alignItems: 'center',

    paddingTop: normalize(15),

    paddingBottom: normalize(15),
  },
  cardContainer: {
    borderWidth: 0.5,
    elevation: 9,
    borderRadius: normalize(24),
  },

  boxShadow: {
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

  shadowContainer: {
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: COLOR.WHITE,
    borderRadius: normalize(20),
    elevation: 25,
  },
  shadowContainerWithoutBorderRadius: {
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: COLOR.WHITE,
    borderRadius: normalize(0),
    elevation: 25,
  },
  shadowContainer_border_20: {
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: COLOR.WHITE,
    borderRadius: normalize(20),
    elevation: 5,
  },

  circleRoundBlack: {
    borderRadius: normalize(100),
    backgroundColor: COLOR.BLACK,
    height: normalize(8),
    width: normalize(8),
  },

  textbox_focus_in: {},
  textbox_focus_out: {},

  round_view_9: {
    height: normalize(9),
    width: normalize(9),
    borderRadius: normalize(50),
  },

  greyLineSeprator: {
    height: normalize(1),
    backgroundColor: COLOR.BORDER_COLOR_GREY,
  },

  bulletinRoundBlack: {
    color: COLOR.TEXT_COLOR_BLACK,
    fontSize: normalize(10),
  },

  activityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 9999,
  },
});
