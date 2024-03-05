import {
  REMOVE_FROM_CART_REQUEST,
  ADD_TO_CART_REQUEST,
  DASHBOARD,
  DEMO_SLOTS,
  SELECT_CURRENT_KID,
  BOOK_DEMO,
  CANCEL_SLOT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_CART_LIST,
  ADD_ADDRESS,
  EDIT_ADDRESS,
  REMOVE_ADDRESS,
  LIST_ADDRESS,
  CREATE_ORDER,
  UPDATE_PAYMENT_STATUS,
  VIEW_CURRICULAM,
  BOOK_LIVE_CLASS,
  SUBSCRIPTION_DETAILS,
  BATCH_DETAILS,
  STUDENT_CLASSES,
  DELETE_STUDENT,
  APPLY_COUPON,
  REMOVE_COUPON,
  RESCHEDULE_DEMO,
  SET_USER_DETAILS,
  STUDENT_REPORT,
  DEMO_RESULT,
  PARENT_FEEDBACK,
  PARENT_FEEDBACK_SUCCESS,
  PARENT_FEEDBACK_FAILED,
  STUDENT_CATEGORY_CLASSES,
  WORKBOOK_UPLOAD,
  CLASS_CANCEL,
  DEVICE_INFO,
  STAR_BADGE_REPORT,
  STUDENT_ACTIVITY,
  RATING_TAGS,
  SUBMIT_TEACHER_RATING,
  TEACHER_RATING,
  UPDATE_PROFILE,
  RESCHEDULE_SLOT,
  RESCHEDULE_UPCOMING,
  REGISTER_BOOK_DEMO,
  SPEED_MATH_GAME_LEVELS,
  SPEED_MATH_GAME_START,
  SPEED_MATH_GAME_START_LIVE,
  EMOTION_DATA,
  SPEED_MATH_ANSWER_SUBMIT,
  SPEED_MATH_RESULT,
  STUDENT_ACTIVITY_LOGS,
  VIDEOROOM_PARTICIPANT_IDENTITY,
  UPDATE_STUDENT_RESPONSE,
  SELECT_CURRENT_ROLE,
  MATH_STUDENT_QUIZZES,
  CALL_TECHNICAL_SUPPORT,
} from '../config/redux-action-types/dashboard';
import FormData from 'form-data';

import * as Constants from '../components/helpers/Constants';

export function setUserDetails(
  parent_user_id,
  parent_first_name,
  parent_last_name,
  parent_country,
  parent_currency,
) {
  return {
    type: SET_USER_DETAILS,
    payload: {
      data: {
        parent_user_id,
        parent_first_name,
        parent_last_name,
        parent_country,
        parent_currency,
      },
    },
  };
}

export function addToCart(
  // stage_id,
  subscription_id,
  parent_id,
  student_id,
  country,
  mathbox_required,
) {
  return {
    type: ADD_TO_CART,
    payload: {
      request: {
        url: 'app_mathbox/add_to_cart',
        params: {
          // stage_id,
          subscription_id,
          parent_id,
          student_id,
          country,
          mathbox_required,
        },
      },
    },
  };
}

export function updateStudentFeedback(
  live_class_id,
  user_id,
  feedback,
  comments,
) {
  return {
    type: UPDATE_STUDENT_RESPONSE,
    payload: {
      request: {
        url: 'app_students/update_student_feedback',
        params: {
          live_class_id,
          user_id,
          feedback,
          comments,
        },
      },
    },
  };
}

export function removeFromCart(mathbox_order_item_id, country) {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      request: {
        url: 'app_mathbox/remove_cart_item',
        params: {
          mathbox_order_item_id,
          country,
        },
      },
    },
  };
}

export function getCartItemList(parent_id, country) {
  return {
    type: GET_CART_LIST,
    payload: {
      request: {
        url: 'app_mathbox/cart_items',
        params: {
          parent_id,
          country,
        },
      },
    },
  };
}

export function uploadWorkBook(homework_id, workbook, type, name) {
  var formdata = new FormData();
  formdata.append('homework_id', homework_id);
  formdata.append('workbook', {
    uri: Platform.OS === 'android' ? `file:///${workbook.uri}` : workbook.uri,
    type: type,
    name: name,
  });
  console.log(formdata);

  return {
    type: WORKBOOK_UPLOAD,
    payload: {
      request: {
        method: 'post',
        url: 'app_mathbox/upload_workbook',
        data: formdata,
        headers: {'Content-Type': 'multipart/form-data'},
      },
    },
  };
}

export function getDashboardItems(parent_id, country, student_id) {
  return {
    type: DASHBOARD,
    payload: {
      request: {
        url: 'app_mathbox/parent_dashboard',
        params: {
          parent_id,
          country,
          student_id,
        },
      },
    },
  };
}

export function updateCurrentKid(student_data) {
  return {
    type: SELECT_CURRENT_KID,
    payload: student_data,
  };
}

export function updateCurrentUserRole(role) {
  return {
    type: SELECT_CURRENT_ROLE,
    payload: role,
  };
}

export function getDemoSlots(parent_id, demo_date) {
  return {
    type: DEMO_SLOTS,
    payload: {
      request: {
        url: 'app_mathbox/demo_free_slots',
        params: {
          parent_id,
          demo_date,
        },
      },
    },
  };
}

export function getStudentReportData(student_id, filter) {
  return {
    type: STUDENT_REPORT,
    payload: {
      request: {
        url: 'app_mathbox/reports',
        params: {
          student_id,
          filter,
        },
      },
    },
  };
}

export function getStudentActivityOnDates(
  parent_id,
  student_id,
  start_date,
  end_date,
) {
  return {
    type: STUDENT_ACTIVITY,
    payload: {
      request: {
        url: 'app_mathbox/activity_new',
        params: {
          parent_id,
          student_id,
          start_date,
          end_date,
        },
      },
    },
  };
}

export function getStudentActivity(parent_id, student_id, filter) {
  return {
    type: STUDENT_ACTIVITY,
    payload: {
      request: {
        url: 'app_mathbox/activity_new',
        params: {
          parent_id,
          student_id,
          filter,
        },
      },
    },
  };
}

export function updateParentProfile(
  parent_id,
  mobile,
  email,
  first_name,
  last_name,
) {
  return {
    type: UPDATE_PROFILE,
    payload: {
      request: {
        url: 'app_mathbox/update_profile',
        params: {
          parent_id,
          mobile,
          email,
          first_name,
          last_name,
        },
      },
    },
  };
}

export function geteUpcomingRescheduleSlots(
  parent_id,
  student_id,
  live_class_id,
  reschedule_type,
) {
  return {
    type: RESCHEDULE_SLOT,
    payload: {
      request: {
        url: 'app_mathbox/reschedule',
        params: {
          parent_id,
          student_id,
          live_class_id,
          reschedule_type,
        },
      },
    },
  };
}

export function doUpdateRescheduleClass(
  parent_id,
  student_id,
  live_class_id,
  new_date,
  slot_id,
) {
  return {
    type: RESCHEDULE_UPCOMING,
    payload: {
      request: {
        url: 'app_mathbox/update_rescheduled_class',
        params: {
          parent_id,
          student_id,
          live_class_id,
          new_date,
          slot_id,
        },
      },
    },
  };
}

export function doBookingDemo(student_id, slot_id, day, name, mobile, email) {
  return {
    type: BOOK_DEMO,
    payload: {
      request: {
        url: 'app_mathbox/book_a_demo',
        params: {
          student_id,
          slot_id,
          day,
          name,
          mobile,
          email,
        },
      },
    },
  };
}

export function registerWithBookDemo(
  parent_id,
  grade,
  slot_id,
  day,
  student_name,
  mobile,
  email,
) {
  return {
    type: REGISTER_BOOK_DEMO,
    payload: {
      request: {
        url: 'app_mathbox/register_with_book_demo',
        params: {
          parent_id,
          grade,
          day,
          slot_id,
          student_name,
          email,
          mobile,
        },
      },
    },
  };
}

export function bookDemoPostChild(
  parent_id,
  student_id,
  grade,
  slot_id,
  day,
  student_name,
  mobile,
  email,
) {
  return {
    type: REGISTER_BOOK_DEMO,
    payload: {
      request: {
        url: 'app_mathbox/register_with_book_demo',
        params: {
          parent_id,
          student_id,
          grade,
          day,
          slot_id,
          student_name,
          email,
          mobile,
        },
      },
    },
  };
}

export function doReScheduleDemo(
  parent_id,
  student_id,
  preferred_slot_id,
  slot_id,
  day,
) {
  return {
    type: BOOK_DEMO,
    payload: {
      request: {
        url: 'app_mathbox/reschedule_demo',
        params: {
          parent_id,
          student_id,
          preferred_slot_id,
          slot_id,
          day,
        },
      },
    },
  };
}

export function doReScheduleDemoConfirmed(
  parent_id,
  student_id,
  preferred_slot_id,
  slot_id,
  day,
) {
  return {
    type: BOOK_DEMO,
    payload: {
      request: {
        url: 'app_mathbox/reschedule_demo',
        params: {
          parent_id,
          student_id,
          preferred_slot_id,
          slot_id,
          day,
        },
      },
    },
  };
}

export function doApplyCoupon(coupon, mathbox_order_id, country) {
  return {
    type: APPLY_COUPON,
    payload: {
      request: {
        url: 'app_mathbox/apply_coupon',
        params: {
          coupon,
          mathbox_order_id,
          country,
        },
      },
    },
  };
}

export function doRemoveCoupon(mathbox_order_id, country) {
  return {
    type: REMOVE_COUPON,
    payload: {
      request: {
        url: 'app_mathbox/remove_coupon',
        params: {
          mathbox_order_id,
          country,
        },
      },
    },
  };
}

export function doBookingLiveClass(student_id, slot_id, day) {
  return {
    type: BOOK_LIVE_CLASS,
    payload: {
      request: {
        url: 'app_mathbox/create_preferred_batch_slots',
        params: {
          student_id,
          slot_id,
          day,
        },
      },
    },
  };
}

export function cancelPreferredSlot(student_id, preferred_slot_id) {
  return {
    type: CANCEL_SLOT,
    payload: {
      request: {
        url: 'app_mathbox/cancel_preferred_slot',
        params: {
          student_id,
          preferred_slot_id,
        },
      },
    },
  };
}

export function cancelConfirmedDemo(parent_id, live_class_id) {
  return {
    type: CANCEL_SLOT,
    payload: {
      request: {
        url: 'app_mathbox/cancel_demo',
        params: {
          parent_id,
          live_class_id,
        },
      },
    },
  };
}

export function cancelDemo(live_class_id, parent_id) {
  return {
    type: CANCEL_DEMO,
    payload: {
      request: {
        url: 'app_mathbox/cancel_preferred_slot',
        params: {
          live_class_id,
          parent_id,
        },
      },
    },
  };
}

export function rescheduleBookedDemo(
  live_class_id,
  parent_id,
  student_id,
  slot_id,
  day,
) {
  return {
    type: RESCHEDULE_DEMO,
    payload: {
      request: {
        url: 'app_mathbox/reschedule_request',
        params: {
          live_class_id,
          parent_id,
          student_id,
          slot_id,
          day,
        },
      },
    },
  };
}

export function addAddress(
  parent_id,
  address,
  city,
  state,
  pincode,
  address_type,
  landmark,
  default_address,
) {
  return {
    type: ADD_ADDRESS,
    payload: {
      request: {
        url: 'app_mathbox/add_address',
        params: {
          parent_id,
          address,
          city,
          state,
          pincode,
          address_type,
          landmark,
          default_address,
        },
      },
    },
  };
}

export function editAddress(
  address_id,
  parent_id,
  address,
  city,
  state,
  pincode,
  address_type,
  landmark,
  default_address,
) {
  return {
    type: EDIT_ADDRESS,
    payload: {
      request: {
        url: 'app_mathbox/edit_address',
        params: {
          address_id,
          parent_id,
          address,
          city,
          state,
          pincode,
          address_type,
          landmark,
          default_address,
        },
      },
    },
  };
}

export function removeAddress(address_id) {
  return {
    type: REMOVE_ADDRESS,
    payload: {
      request: {
        url: 'app_mathbox/delete_address',
        params: {
          address_id,
        },
      },
    },
  };
}

export function listAddress(parent_id) {
  return {
    type: LIST_ADDRESS,
    payload: {
      request: {
        url: 'app_mathbox/address_list',
        params: {
          parent_id,
        },
      },
    },
  };
}

export function createPaymentOrder(
  mathbox_order_id,
  parent_id,
  country,
  address_id,
  payment_type,
) {
  return {
    type: CREATE_ORDER,
    payload: {
      request: {
        url: 'app_mathbox/create_order',
        params: {
          mathbox_order_id,
          parent_id,
          country,
          address_id,
          payment_type,
        },
      },
    },
  };
}
export function updatePaymentStatus(
  transaction_id,
  parent_id,
  mathbox_order_id,
  mobile,
  email,
  payment_type,
  user_subscription_ids,
  paid_amount,
) {
  return {
    type: UPDATE_PAYMENT_STATUS,
    payload: {
      request: {
        url: 'app_mathbox/update_payment_status',
        params: {
          transaction_id,
          parent_id,
          mathbox_order_id,
          mobile,
          email,
          payment_type,
          user_subscription_ids,
          paid_amount,
        },
      },
    },
  };
}

export function viewCurriculam(student_id) {
  return {
    type: VIEW_CURRICULAM,
    payload: {
      request: {
        url: 'app_mathbox/curriculum',
        params: {
          student_id,
        },
      },
    },
  };
}

export function getMathZoneQuizzes(student_id) {
  return {
    type: MATH_STUDENT_QUIZZES,
    payload: {
      request: {
        url: 'app_student_quizzes/math_zone',
        params: {
          student_id,
        },
      },
    },
  };
}

export function getNewMathZoneQuizzes(student_id) {
  return {
    type: MATH_STUDENT_QUIZZES,
    payload: {
      request: {
        url: 'app_student_quizzes/math_zone',
        params: {
          student_id,
        },
      },
    },
  };
}

export function getSubscriptionDetails(parent_id) {
  return {
    type: SUBSCRIPTION_DETAILS,
    payload: {
      request: {
        url: 'app_mathbox/subscription_details',
        params: {
          parent_id,
        },
      },
    },
  };
}

export function getBatchDetails(parent_id) {
  return {
    type: BATCH_DETAILS,
    payload: {
      request: {
        url: 'app_mathbox/batch_details',
        params: {
          parent_id,
        },
      },
    },
  };
}

export function getStudentClasses(student_id) {
  return {
    type: STUDENT_CLASSES,
    payload: {
      request: {
        url: 'app_mathbox/student_classes',
        params: {
          student_id,
        },
      },
    },
  };
}

export function getSpeedMathGameLevels() {
  return {
    type: SPEED_MATH_GAME_LEVELS,
    payload: {
      request: {
        url: 'app_students/game_levels',
        params: {
          live_class_id: 491,
        },
      },
    },
  };
}

export function getSpeedMathQuestions(student_id, level_id) {
  return {
    type: SPEED_MATH_GAME_START,
    payload: {
      request: {
        url: 'app_students/speed_math_for_app',
        params: {
          student_id,
          level_id,
        },
      },
    },
  };
}

export function getSpeedMathQuestionsLiveClass(game_id, player_id) {
  return {
    type: SPEED_MATH_GAME_START_LIVE,
    payload: {
      request: {
        url: 'app_students/create_game_players',
        params: {
          game_id,
          player_id,
        },
      },
    },
  };
}

export function submitSpeedMathAnswer(
  player_id,
  game_id,
  question_id,
  correct,
  answer,
) {
  return {
    type: SPEED_MATH_ANSWER_SUBMIT,
    payload: {
      request: {
        url: 'app_students/store_game_response',
        params: {
          player_id,
          game_id,
          question_id,
          correct,
          answer,
        },
      },
    },
  };
}

export function getSpeedMathResult(player_id, game_id, computer_score) {
  return {
    type: SPEED_MATH_RESULT,
    payload: {
      request: {
        url: 'app_students/game_result',
        params: {
          game_id,
          player_id,
          computer_score,
        },
      },
    },
  };
}

export function callTechSupport(live_class_id, user_id) {
  return {
    type: CALL_TECHNICAL_SUPPORT,
    payload: {
      request: {
        url: 'app_students/create_tech_support',
        params: {
          live_class_id,
          user_id,
        },
      },
    },
  };
}

export function getStudentCategoryClasses(student_id, category) {
  return {
    type: STUDENT_CATEGORY_CLASSES,
    payload: {
      request: {
        url: 'app_mathbox/student_classes',
        params: {
          student_id,
          category,
        },
      },
    },
  };
}

export function getStudentCategoryClassesWithDate(
  student_id,
  category,
  start_date,
  end_date,
) {
  return {
    type: STUDENT_CATEGORY_CLASSES,
    payload: {
      request: {
        url: 'app_mathbox/student_classes',
        params: {
          student_id,
          category,
          start_date,
          end_date,
        },
      },
    },
  };
}

export function getStudentCategoryClassesWithFilter(
  student_id,
  category,
  filter,
) {
  return {
    type: STUDENT_CATEGORY_CLASSES,
    payload: {
      request: {
        url: 'app_mathbox/student_classes',
        params: {
          student_id,
          category,
          filter,
        },
      },
    },
  };
}

export function getUpcomingClasses(student_id) {
  return {
    type: STUDENT_CLASSES,
    payload: {
      request: {
        url: 'app_mathbox/upcoming_classes',
        params: {
          student_id,
        },
      },
    },
  };
}

export function getStarBadgeReport(student_id) {
  return {
    type: STAR_BADGE_REPORT,
    payload: {
      request: {
        url: 'app_mathbox/stars_and_badges',
        params: {
          student_id,
        },
      },
    },
  };
}

export function getEmotionData(student_id) {
  return {
    type: EMOTION_DATA,
    payload: {
      request: {
        url: 'app_mathbox/student_live_class_emotions',
        params: {
          student_id,
        },
      },
    },
  };
}

export function cancelClass(parent_id, live_class_id, student_id, cancel_type) {
  return {
    type: CLASS_CANCEL,
    payload: {
      request: {
        url: 'app_mathbox/cancel_class',
        params: {
          parent_id,
          live_class_id,
          student_id,
          cancel_type,
        },
      },
    },
  };
}

export function submitTeacherRating(
  parent_id,
  teacher_id,
  stars,
  review_ids,
  comments,
) {
  return {
    type: SUBMIT_TEACHER_RATING,
    payload: {
      request: {
        url: 'app_mathbox/create_rating',
        params: {
          parent_id,
          teacher_id,
          stars,
          review_ids,
          comments,
        },
      },
    },
  };
}

export function getTeacherRatings(parent_id, teacher_id) {
  return {
    type: TEACHER_RATING,
    payload: {
      request: {
        url: 'app_mathbox/teacher_ratings',
        params: {
          parent_id,
          teacher_id,
        },
      },
    },
  };
}

export function updateDeviceInfo(parent_id, regId, time_zone, device) {
  return {
    type: DEVICE_INFO,
    payload: {
      request: {
        url: 'app_mathbox/device_info',
        params: {
          parent_id,
          regId,
          time_zone,
          device,
        },
      },
    },
  };
}

export function getRatingTags() {
  return {
    type: RATING_TAGS,
    payload: {
      request: {
        url: 'app_mathbox/reviews_list',
        params: {},
      },
    },
  };
}

export function getDemoResults(live_class_id, parent_id, student_id) {
  return {
    type: DEMO_RESULT,
    payload: {
      request: {
        url: 'app_mathbox/demo_result',
        params: {
          live_class_id,
          parent_id,
          student_id,
        },
      },
    },
  };
}

export function submitParentFeedback(
  live_class_id,
  user_id,
  rating,
  recommendation,
  feedback,
) {
  return {
    type: PARENT_FEEDBACK,
    payload: {
      request: {
        url: 'app_mathbox/parent_feedback',
        params: {
          live_class_id,
          user_id,
          rating,
          recommendation,
          feedback,
        },
      },
    },
  };
}

export function getStudentActivityLogs(student_id) {
  return {
    type: STUDENT_ACTIVITY_LOGS,
    payload: {
      request: {
        url: 'app_mathbox/student_data_before_subscription_expiry',
        params: {
          student_id,
        },
      },
    },
  };
}
