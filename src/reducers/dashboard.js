import {
  REMOVE_FROM_CART_REQUEST,
  ADD_TO_CART_REQUEST,
  DASHBOARD,
  DASHBOARD_SUCCESS,
  DASHBOARD_FALIED,
  DEMO_SLOTS,
  DEMO_SLOTS_FAILED,
  DEMO_SLOTS_SUCCESS,
  SELECT_CURRENT_KID,
  BOOK_DEMO,
  BOOK_DEMO_SUCCESS,
  BOOK_DEMO_FAILED,
  CANCEL_SLOT,
  CANCEL_SLOT_SUCCESS,
  CANCEL_SLOT_FAILED,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILED,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_FAILED,
  REMOVE_FROM_CART_SUCCESS,
  GET_CART_LIST,
  GET_CART_LIST_SUCCESS,
  GET_CART_LIST_FAILED,
  ADD_ADDRESS,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILED,
  REMOVE_ADDRESS,
  REMOVE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAILED,
  EDIT_ADDRESS,
  EDIT_ADDRESS_SUCCESS,
  EDIT_ADDRESS_FAILED,
  LIST_ADDRESS,
  LIST_ADDRESS_SUCCESS,
  LIST_ADDRESS_FAILED,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  UPDATE_PAYMENT_STATUS,
  UPDATE_PAYMENT_STATUS_SUCCESS,
  UPDATE_PAYMENT_STATUS_FAILED,
  VIEW_CURRICULAM,
  VIEW_CURRICULAM_SUCCESS,
  VIEW_CURRICULAM_FAILED,
  BOOK_LIVE_CLASS,
  BOOK_LIVE_CLASS_SUCCESS,
  BOOK_LIVE_CLASS_FAILED,
  SUBSCRIPTION_DETAILS,
  SUBSCRIPTION_DETAILS_SUCCESS,
  SUBSCRIPTION_DETAILS_FAILED,
  BATCH_DETAILS,
  BATCH_DETAILS_SUCCESS,
  BATCH_DETAILS_FAILED,
  STUDENT_CLASSES,
  STUDENT_CLASSES_SUCCESS,
  STUDENT_CLASSES_FAILED,
  DELETE_STUDENT,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILED,
  APPLY_COUPON,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FAILED,
  REMOVE_COUPON,
  REMOVE_COUPON_SUCCESS,
  REMOVE_COUPON_FAILED,
  CANCEL_DEMO,
  CANCEL_DEMO_SUCCESS,
  CANCEL_DEMO_FAILED,
  RESCHEDULE_DEMO,
  CLASS_CANCEL,
  CLASS_CANCEL_SUCCESS,
  CLASS_CANCEL_FAILED,
  RESCHEDULE_DEMO_SUCCESS,
  RESCHEDULE_DEMO_FAILED,
  SET_USER_DETAILS,
  STUDENT_REPORT,
  STUDENT_REPORT_SUCCESS,
  STUDENT_REPORT_FAILED,
  DEMO_RESULT,
  DEMO_RESULT_FAILED,
  DEMO_RESULT_SUCCESS,
  PARENT_FEEDBACK,
  PARENT_FEEDBACK_SUCCESS,
  PARENT_FEEDBACK_FAILED,
  STUDENT_CATEGORY_CLASSES,
  STUDENT_CATEGORY_CLASSES_SUCCESS,
  STUDENT_CATEGORY_CLASSES_FAILED,
  WORKBOOK_UPLOAD,
  WORKBOOK_UPLOAD_SUCCESS,
  WORKBOOK_UPLOAD_FAILED,
  STAR_BADGE_REPORT,
  STAR_BADGE_REPORT_SUCCESS,
  STAR_BADGE_REPORT_FAILED,
  STUDENT_ACTIVITY,
  STUDENT_ACTIVITY_SUCCESS,
  STUDENT_ACTIVITY_FAILED,
  RATING_TAGS,
  RATING_TAGS_SUCCESS,
  RATING_TAGS_FAILED,
  SUBMIT_TEACHER_RATING,
  SUBMIT_TEACHER_RATING_SUCCESS,
  SUBMIT_TEACHER_RATING_FAILED,
  TEACHER_RATING,
  TEACHER_RATING_SUCCESS,
  TEACHER_RATING_FAILED,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  RESCHEDULE_SLOT,
  RESCHEDULE_SLOT_SUCCESS,
  RESCHEDULE_SLOT_FAILED,
  RESCHEDULE_UPCOMING,
  RESCHEDULE_UPCOMING_SUCCESS,
  RESCHEDULE_UPCOMING_FAILED,
  REGISTER_BOOK_DEMO,
  REGISTER_BOOK_DEMO_SUCCESS,
  REGISTER_BOOK_DEMO_FAILED,
  SPEED_MATH_GAME_LEVELS,
  SPEED_MATH_GAME_LEVELS_SUCCESS,
  SPEED_MATH_GAME_LEVELS_FAILED,
  SPEED_MATH_GAME_START,
  SPEED_MATH_GAME_START_SUCCESS,
  SPEED_MATH_GAME_START_FAILED,
  SPEED_MATH_GAME_START_LIVE,
  SPEED_MATH_GAME_START_LIVE_SUCCESS,
  SPEED_MATH_GAME_START_LIVE_FAILED,
  EMOTION_DATA,
  EMOTION_DATA_SUCCESS,
  EMOTION_DATA_FAILED,
  SPEED_MATH_RESULT,
  SPEED_MATH_RESULT_SUCCESS,
  SPEED_MATH_RESULT_FAILED,
  STUDENT_ACTIVITY_LOGS,
  STUDENT_ACTIVITY_LOGS_SUCCESS,
  STUDENT_ACTIVITY_LOGS_FAILED,
  UPDATE_STUDENT_RESPONCE,
  SELECT_CURRENT_ROLE,
  MATH_STUDENT_QUIZZES,
  MATH_STUDENT_QUIZZES_SUCCESS,
  MATH_STUDENT_QUIZZES_FAILED,
  CALL_TECHNICAL_SUPPORT,
  CALL_TECHNICAL_SUPPORT_SUCCESS,
  CALL_TECHNICAL_SUPPORT_FAILED,
} from "../config/redux-action-types/dashboard";

const initialState = { cartItems: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART_REQUEST: {
      return { ...state, cartItems: state.cartItems.concat(action.payload) };
    }
    case REMOVE_FROM_CART_REQUEST: {
      //  return state.filter(cartItem => cartItem.id !== action.payload.id)
      return {
        cartItems: state.cartItems.filter(
          (cartItems) => cartItems.id !== action.payload.id
        ),
      };
    }
    case DASHBOARD: {
      return {
        ...state,
        loading: true,
        dashboard_status: null,
      };
      //  return{
      //      ...state,loading: true,dashboard_status : null,dashboard_response : []
      //  }
    }
    case DASHBOARD_SUCCESS: {
      return {
        ...state,
        loading: false,
        dashboard_status: action.payload.data.status,
        dashboard_response: action.payload.data,
      };
    }
    case DASHBOARD_FALIED: {
      return {
        ...state,
        loading: false,
        dashboard_status: action.payload.data.status,
        dashboard_response: action.payload.data,
      };
    }
    case DEMO_SLOTS: {
      return {
        ...state,
        loading: true,
        demo_slot_status: false,
        response: action.payload.data,
      };
    }
    case DEMO_SLOTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        demo_slot_status: true,
        response: action.payload.data,
      };
    }
    case DEMO_SLOTS_FAILED: {
      return {
        ...state,
        loading: false,
        demo_slot_status: false,
        response: action.payload.data,
      };
    }
    case SELECT_CURRENT_KID: {
      return {
        ...state,
        current_selected_kid: action.payload,
      };
    }

    case SELECT_CURRENT_ROLE: {
      return {
        ...state,
        current_selected_role: action.payload,
      };
    }

    case BOOK_LIVE_CLASS: {
      return {
        ...state,
        loading: true,
        book_live_class_status: false,
      };
    }
    case BOOK_LIVE_CLASS_SUCCESS: {
      return {
        ...state,
        loading: false,
        book_live_class_status: action.payload.data.status,
        book_live_class_response: action.payload.data,
      };
    }
    case BOOK_LIVE_CLASS_FAILED: {
      return {
        ...state,
        loading: false,
        book_live_class_status: action.payload.data.status,
        book_live_class_response: action.payload.data,
      };
    }

    case BOOK_DEMO: {
      return {
        ...state,
        loading: true,
        book_demo_status: false,
        book_demo_response: action.payload.data,
      };
    }
    case BOOK_DEMO_SUCCESS: {
      return {
        ...state,
        loading: false,
        book_demo_status: action.payload.data.status,
        book_demo_response: action.payload.data,
      };
    }
    case BOOK_DEMO_FAILED: {
      return {
        ...state,
        loading: false,
        book_demo_status: action.payload.data.status,
        book_demo_response: action.payload.data,
      };
    }

    case REGISTER_BOOK_DEMO: {
      return {
        ...state,
        loading: true,
        register_book_demo_status: false,
        register_book_demo_status: null,
        register_book_demo_response: action.payload.data,
      };
    }
    case REGISTER_BOOK_DEMO_SUCCESS: {
      return {
        ...state,
        loading: false,
        register_book_demo_status: action.payload.data.status,
        register_book_demo_response: action.payload.data,
      };
    }
    case REGISTER_BOOK_DEMO_FAILED: {
      return {
        ...state,
        loading: false,
        register_book_demo_status: action.payload.data.status,
        register_book_demo_response: action.payload.data,
      };
    }

    case STUDENT_ACTIVITY_LOGS: {
      return {
        ...state,
        loading: true,
        student_activity_logs_status: false,
        student_activity_logs_response: action.payload.data,
      };
    }
    case STUDENT_ACTIVITY_LOGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        student_activity_logs_status: action.payload.data.status,
        student_activity_logs_response: action.payload.data,
      };
    }
    case STUDENT_ACTIVITY_LOGS_FAILED: {
      return {
        ...state,
        loading: false,
        student_activity_logs_status: action.payload.data.status,
        student_activity_logs_response: action.payload.data,
      };
    }

    case RESCHEDULE_DEMO: {
      return {
        ...state,
        loading: true,
        reschedule_demo_status: null,
        reschedule_demo_response: null,
      };
    }
    case RESCHEDULE_DEMO_SUCCESS: {
      return {
        ...state,
        loading: false,
        reschedule_demo_status: action.payload.data.status,
        reschedule_demo_response: action.payload.data,
      };
    }
    case RESCHEDULE_DEMO_FAILED: {
      return {
        ...state,
        loading: false,
        reschedule_demo_status: action.payload.data.status,
        reschedule_demo_response: action.payload.data,
      };
    }

    case CLASS_CANCEL: {
      return {
        ...state,
        loading: true,
        class_cancel_status: null,
        class_cancel_response: null,
      };
    }
    case CLASS_CANCEL_SUCCESS: {
      return {
        ...state,
        loading: false,
        class_cancel_status: action.payload.data.status,
        class_cancel_response: action.payload.data,
      };
    }
    case CLASS_CANCEL_FAILED: {
      return {
        ...state,
        loading: false,
        class_cancel_status: action.payload.data.status,
        class_cancel_response: action.payload.data,
      };
    }

    case CANCEL_DEMO: {
      return {
        ...state,
        loading: true,
        cancel_demo_status: null,
        cancel_demo_response: null,
      };
    }
    case CANCEL_DEMO_SUCCESS: {
      return {
        ...state,
        loading: false,
        cancel_demo_status: action.payload.data.status,
        cancel_demo_response: action.payload.data,
      };
    }
    case CANCEL_DEMO_FAILED: {
      return {
        ...state,
        loading: false,
        cancel_demo_status: action.payload.data.status,
        cancel_demo_response: action.payload.data,
      };
    }

    case CANCEL_SLOT: {
      return {
        ...state,
        loading: true,
        cancel_slot_status: false,
        cancel_slot_response: action.payload.data,
      };
    }
    case CANCEL_SLOT_SUCCESS: {
      return {
        ...state,
        loading: false,
        cancel_slot_status: action.payload.data.status,
        cancel_slot_response: action.payload.data,
      };
    }
    case CANCEL_SLOT_FAILED: {
      return {
        ...state,
        loading: false,
        cancel_slot_status: action.payload.data.status,
        cancel_slot_response: action.payload.data,
      };
    }
    case ADD_TO_CART: {
      return {
        ...state,
        loading: true,
        add_cart_status: false,
      };
    }
    case ADD_TO_CART_SUCCESS: {
      return {
        ...state,
        loading: false,
        add_cart_status: action.payload.data.status,
        add_cart_response: action.payload.data,
        cartItems: action.payload.data.cart_details,
      };
    }
    case ADD_TO_CART_FAILED: {
      return {
        ...state,
        loading: false,
        add_cart_status: action.payload.data.status,
        add_cart_response: action.payload.data,
      };
    }

    case REMOVE_FROM_CART: {
      return {
        ...state,
        loading: true,
        remove_from_cart_status: null,
        remove_from_cart_response: null,
      };
    }
    case REMOVE_FROM_CART_SUCCESS: {
      return {
        ...state,
        loading: false,
        remove_from_cart_status: action.payload.data.status,
        remove_from_cart_response: action.payload.data,
        cartItems: action.payload.data.cart_details,
      };
    }
    case REMOVE_FROM_CART_FAILED: {
      return {
        ...state,
        loading: false,
        remove_from_cart_status: action.payload.data.status,
        remove_from_cart_response: action.payload.data,
      };
    }

    case UPDATE_STUDENT_RESPONCE: {
      return {
        ...state,
        loading: false,
        upload_student_status: null,
        upload_student_response: null,
      };
    }

    case GET_CART_LIST: {
      return {
        ...state,
        loading: true,
        get_cart_list_status: null,
      };
    }
    case GET_CART_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        get_cart_list_status: action.payload.data.status,
        get_cart_list_response: action.payload.data,
        cartItems: action.payload.data.cart_details,
      };
    }
    case GET_CART_LIST_FAILED: {
      return {
        ...state,
        loading: false,
        get_cart_list_status: action.payload.data.status,
        get_cart_list_response: action.payload.data,
      };
    }

    case ADD_ADDRESS: {
      return {
        ...state,
        loading: true,
        add_address_status: false,
      };
    }
    case ADD_ADDRESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        add_address_status: action.payload.data.status,
        add_address_response: action.payload.data,
      };
    }
    case ADD_ADDRESS_FAILED: {
      return {
        ...state,
        loading: false,
        add_address_status: action.payload.data.status,
        add_address_response: action.payload.data,
      };
    }

    case REMOVE_ADDRESS: {
      return {
        ...state,
        loading: true,
        remove_address_status: false,
      };
    }
    case REMOVE_ADDRESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        remove_address_status: action.payload.data.status,
        remove_address_response: action.payload.data,
      };
    }
    case REMOVE_ADDRESS_FAILED: {
      return {
        ...state,
        loading: false,
        remove_address_status: action.payload.data.status,
        remove_address_response: action.payload.data,
      };
    }

    case EDIT_ADDRESS: {
      return {
        ...state,
        loading: true,
        edit_address_status: false,
      };
    }
    case EDIT_ADDRESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        edit_address_status: action.payload.data.status,
        edit_address_response: action.payload.data,
      };
    }
    case EDIT_ADDRESS_FAILED: {
      return {
        ...state,
        loading: false,
        edit_address_status: action.payload.data.status,
        edit_address_response: action.payload.data,
      };
    }

    case LIST_ADDRESS: {
      return {
        ...state,
        loading: true,
        list_address_status: false,
      };
    }
    case LIST_ADDRESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        list_address_status: action.payload.data.status,
        list_address_response: action.payload.data,
      };
    }
    case LIST_ADDRESS_FAILED: {
      return {
        ...state,
        loading: false,
        list_address_status: action.payload.data.status,
        list_address_response: action.payload.data,
      };
    }

    case CREATE_ORDER: {
      return {
        ...state,
        loading: true,
        create_order_status: false,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        create_order_status: action.payload.data.status,
        create_order_response: action.payload.data,
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        loading: false,
        create_order_status: action.payload.data.status,
        create_order_response: action.payload.data,
      };
    }

    case UPDATE_PAYMENT_STATUS: {
      return {
        ...state,
        loading: true,
        update_payment_status: null,
      };
    }
    case UPDATE_PAYMENT_STATUS_SUCCESS: {
      return {
        ...state,
        loading: false,
        update_payment_status: action.payload.data.status,
        update_payment_response: action.payload.data,
      };
    }
    case UPDATE_PAYMENT_STATUS_FAILED: {
      return {
        ...state,
        loading: false,
        update_payment_status: action.payload.data.status,
        update_payment_response: action.payload.data,
      };
    }

    case VIEW_CURRICULAM: {
      return {
        ...state,
        loading: true,
        view_curriculam_status: false,
      };
    }
    case VIEW_CURRICULAM_SUCCESS: {
      return {
        ...state,
        loading: false,
        view_curriculam_status: action.payload.data.status,
        view_curriculam_response: action.payload.data,
      };
    }
    case VIEW_CURRICULAM_FAILED: {
      return {
        ...state,
        loading: false,
        view_curriculam_status: action.payload.data.status,
        view_curriculam_response: action.payload.data,
      };
    }

    case SUBSCRIPTION_DETAILS: {
      return {
        ...state,
        loading: true,
        subscription_details_status: false,
      };
    }
    case SUBSCRIPTION_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        subscription_details_status: action.payload.data.status,
        subscription_details_response: action.payload.data,
      };
    }
    case SUBSCRIPTION_DETAILS_FAILED: {
      return {
        ...state,
        loading: false,
        subscription_details_status: action.payload.data.status,
        subscription_details_response: action.payload.data,
      };
    }

    case BATCH_DETAILS: {
      return {
        ...state,
        loading: true,
        batch_details_status: false,
      };
    }
    case BATCH_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        batch_details_status: action.payload.data.status,
        batch_details_response: action.payload.data,
      };
    }
    case BATCH_DETAILS_FAILED: {
      return {
        ...state,
        loading: false,
        batch_details_status: action.payload.data.status,
        batch_details_response: action.payload.data,
      };
    }

    case STUDENT_CLASSES: {
      return {
        ...state,
        loading: false,
      };
    }
    case STUDENT_CLASSES_SUCCESS: {
      return {
        ...state,
        loading: false,
        student_class_status: action.payload.data.status,
        student_class_response: action.payload.data,
      };
    }
    case STUDENT_CLASSES_FAILED: {
      return {
        ...state,
        loading: false,
        student_class_status: action.payload.data.status,
        student_class_response: action.payload.data,
      };
    }

    case STUDENT_CATEGORY_CLASSES: {
      return {
        ...state,
        loading: true,
        student_category_class_status: false,
      };
    }
    case STUDENT_CATEGORY_CLASSES_SUCCESS: {
      return {
        ...state,
        loading: false,
        student_category_class_status: action.payload.data.status,
        student_category_class_response: action.payload.data,
      };
    }
    case STUDENT_CATEGORY_CLASSES_FAILED: {
      return {
        ...state,
        loading: false,
        student_category_class_status: action.payload.data.status,
        student_category_class_response: action.payload.data,
      };
    }

    case APPLY_COUPON: {
      return {
        ...state,
        loading: true,
        apply_coupon_status: null,
        apply_coupon_response: null,
      };
    }
    case APPLY_COUPON_SUCCESS: {
      return {
        ...state,
        loading: false,
        apply_coupon_status: action.payload.data.status,
        apply_coupon_response: action.payload.data,
      };
    }
    case APPLY_COUPON_FAILED: {
      return {
        ...state,
        loading: false,
        apply_coupon_status: action.payload.data.status,
        apply_coupon_response: action.payload.data,
      };
    }

    case REMOVE_COUPON: {
      return {
        ...state,
        loading: true,
        remove_coupon_status: null,
        remove_coupon_response: null,
      };
    }
    case REMOVE_COUPON_SUCCESS: {
      return {
        ...state,
        loading: false,
        remove_coupon_status: action.payload.data.status,
        remove_coupon_response: action.payload.data,
      };
    }
    case REMOVE_COUPON_FAILED: {
      return {
        ...state,
        loading: false,
        remove_coupon_status: action.payload.data.status,
        remove_coupon_response: action.payload.data,
      };
    }

    case STUDENT_REPORT: {
      return {
        ...state,
        loading: true,
        student_report_status: null,
        student_report_response: null,
      };
    }
    case STUDENT_REPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        student_report_status: action.payload.data.status,
        student_report_response: action.payload.data,
      };
    }
    case STUDENT_REPORT_FAILED: {
      return {
        ...state,
        loading: false,
        student_report_status: action.payload.data.status,
        student_report_response: action.payload.data,
      };
    }

    case STUDENT_ACTIVITY: {
      return {
        ...state,
        loading: true,
        student_activity_report_status: null,
        student_activity_report_response: null,
      };
    }
    case STUDENT_ACTIVITY_SUCCESS: {
      return {
        ...state,
        loading: false,
        student_activity_report_status: action.payload.data.status,
        student_activity_report_response: action.payload.data,
      };
    }
    case STUDENT_ACTIVITY_FAILED: {
      return {
        ...state,
        loading: false,
        student_activity_report_status: action.payload.data.status,
        student_activity_report_response: action.payload.data,
      };
    }

    case STAR_BADGE_REPORT: {
      return {
        ...state,
        loading: true,
        star_badge_report_status: null,
        star_badge_report_response: null,
      };
    }
    case STAR_BADGE_REPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        star_badge_report_status: action.payload.data.status,
        star_badge_report_response: action.payload.data,
      };
    }
    case STAR_BADGE_REPORT_FAILED: {
      return {
        ...state,
        loading: false,
        star_badge_report_status: action.payload.data.status,
        star_badge_report_response: action.payload.data,
      };
    }

    case DEMO_RESULT: {
      return {
        ...state,
        loading: true,
        demo_result_status: null,
        demo_result_response: null,
      };
    }
    case DEMO_RESULT_SUCCESS: {
      return {
        ...state,
        loading: false,
        demo_result_status: true,
        demo_result_response: action.payload.data,
      };
    }
    case DEMO_RESULT_FAILED: {
      return {
        ...state,
        loading: false,
        demo_result_status: action.payload.data.status,
        demo_result_response: action.payload.data,
      };
    }

    case PARENT_FEEDBACK: {
      return {
        ...state,
        loading: true,
        parent_feedback_status: null,
        parent_feedback_response: null,
      };
    }
    case PARENT_FEEDBACK_SUCCESS: {
      return {
        ...state,
        loading: false,
        parent_feedback_status: action.payload.data.status,
        parent_feedback_response: action.payload.data,
      };
    }
    case PARENT_FEEDBACK_FAILED: {
      return {
        ...state,
        loading: false,
        parent_feedback_status: action.payload.data.status,
        parent_feedback_response: action.payload.data,
      };
    }

    case TEACHER_RATING: {
      return {
        ...state,
        loading: true,
        teacher_rating_status: null,
        teacher_rating_response: null,
      };
    }
    case TEACHER_RATING_SUCCESS: {
      return {
        ...state,
        loading: false,
        teacher_rating_status: action.payload.data.status,
        teacher_rating_response: action.payload.data,
      };
    }
    case TEACHER_RATING_FAILED: {
      return {
        ...state,
        loading: false,
        teacher_rating_status: action.payload.data.status,
        teacher_rating_response: action.payload.data,
      };
    }

    case RATING_TAGS: {
      return {
        ...state,
        loading: false,
      };
    }
    case RATING_TAGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        rating_tags_status: action.payload.data.status,
        rating_tags_response: action.payload.data,
      };
    }
    case RATING_TAGS_FAILED: {
      return {
        ...state,
        loading: false,
        rating_tags_status: action.payload.data.status,
        rating_tags_response: action.payload.data,
      };
    }

    case SUBMIT_TEACHER_RATING: {
      return {
        ...state,
        loading: false,
        submit_teacher_rating_status: null,
        submit_teacher_rating_response: null,
      };
    }
    case SUBMIT_TEACHER_RATING_SUCCESS: {
      return {
        ...state,
        loading: false,
        submit_teacher_rating_status: action.payload.data.status,
        submit_teacher_rating_response: action.payload.data,
      };
    }
    case SUBMIT_TEACHER_RATING_FAILED: {
      return {
        ...state,
        loading: false,
        submit_teacher_rating_status: action.payload.data.status,
        submit_teacher_rating_response: action.payload.data,
      };
    }

    case WORKBOOK_UPLOAD: {
      return {
        ...state,
        loading: true,
        workbook_upload_status: null,
        workbook_upload_response: null,
      };
    }
    case WORKBOOK_UPLOAD_SUCCESS: {
      return {
        ...state,
        loading: false,
        workbook_upload_status: action.payload.data.status,
        workbook_upload_response: action.payload.data,
      };
    }
    case WORKBOOK_UPLOAD_FAILED: {
      return {
        ...state,
        loading: false,
        workbook_upload_status: action.payload.data.status,
        workbook_upload_response: action.payload.data,
      };
    }

    case UPDATE_PROFILE: {
      return {
        ...state,
        loading: true,
        update_profile_status: null,
        update_profile_response: null,
      };
    }
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        update_profile_status: action.payload.data.status,
        update_profile_response: action.payload.data,
      };
    }
    case UPDATE_PROFILE_FAILED: {
      return {
        ...state,
        loading: false,
        update_profile_status: action.payload.data.status,
        update_profile_response: action.payload.data,
      };
    }

    case RESCHEDULE_SLOT: {
      return {
        ...state,
        loading: true,
        reschedule_slot_status: null,
        reschedule_slot_response: null,
      };
    }
    case RESCHEDULE_SLOT_SUCCESS: {
      return {
        ...state,
        loading: false,
        reschedule_slot_status: action.payload.data.status,
        reschedule_slot_response: action.payload.data,
      };
    }
    case RESCHEDULE_SLOT_FAILED: {
      return {
        ...state,
        loading: false,
        reschedule_slot_status: action.payload.data.status,
        reschedule_slot_response: action.payload.data,
      };
    }

    case RESCHEDULE_UPCOMING: {
      return {
        ...state,
        loading: true,
        reschedule_upcoming_status: null,
        reschedule_upcoming_response: null,
      };
    }
    case RESCHEDULE_UPCOMING_SUCCESS: {
      return {
        ...state,
        loading: false,
        reschedule_upcoming_status: action.payload.data.status,
        reschedule_upcoming_response: action.payload.data,
      };
    }
    case RESCHEDULE_UPCOMING_FAILED: {
      return {
        ...state,
        loading: false,
        reschedule_upcoming_status: action.payload.data.status,
        reschedule_upcoming_response: action.payload.data,
      };
    }

    case SPEED_MATH_GAME_LEVELS: {
      return {
        ...state,
        loading: true,
        speed_math_game_level_status: null,
        speed_math_game_level_response: null,
      };
    }
    case SPEED_MATH_GAME_LEVELS_SUCCESS: {
      return {
        ...state,
        loading: false,
        speed_math_game_level_status: action.payload.data.status,
        speed_math_game_level_response: action.payload.data,
      };
    }
    case SPEED_MATH_GAME_LEVELS_FAILED: {
      return {
        ...state,
        loading: false,
        speed_math_game_level_status: action.payload.data.status,
        speed_math_game_level_response: action.payload.data,
      };
    }

    case SPEED_MATH_GAME_START: {
      return {
        ...state,
        loading: true,
        speed_math_game_start_status: null,
        speed_math_game_start_response: null,
      };
    }
    case SPEED_MATH_GAME_START_SUCCESS: {
      return {
        ...state,
        loading: false,
        speed_math_game_start_status: action.payload.data.status,
        speed_math_game_start_response: action.payload.data,
      };
    }
    case SPEED_MATH_GAME_START_FAILED: {
      return {
        ...state,
        loading: false,
        speed_math_game_start_status: action.payload.data.status,
        speed_math_game_start_response: action.payload.data,
      };
    }

    case SPEED_MATH_GAME_START_LIVE: {
      return {
        ...state,
        loading: true,
        speed_math_game_start_live_status: null,
        speed_math_game_start_live_response: null,
      };
    }
    case SPEED_MATH_GAME_START_LIVE_SUCCESS: {
      return {
        ...state,
        loading: false,
        speed_math_game_start_live_status: action.payload.data.status,
        speed_math_game_start_live_response: action.payload.data,
      };
    }
    case SPEED_MATH_GAME_START_LIVE_FAILED: {
      return {
        ...state,
        loading: false,
        speed_math_game_start_live_status: action.payload.data.status,
        speed_math_game_start_live_response: action.payload.data,
      };
    }

    case SPEED_MATH_RESULT: {
      return {
        ...state,
        loading: true,
        speed_math_result_status: null,
        speed_math_result_response: null,
      };
    }
    case SPEED_MATH_RESULT_SUCCESS: {
      return {
        ...state,
        loading: false,
        speed_math_result_status: action.payload.data.status,
        speed_math_result_response: action.payload.data,
      };
    }
    case SPEED_MATH_RESULT_FAILED: {
      return {
        ...state,
        loading: false,
        speed_math_result_status: action.payload.data.status,
        speed_math_result_response: action.payload.data,
      };
    }

    case CALL_TECHNICAL_SUPPORT: {
      return {
        ...state,
        loading: true,
        call_technical_support_status: null,
        call_technical_support_response: null,
      };
    }
    case CALL_TECHNICAL_SUPPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        call_technical_support_status: action.payload.data.status,
        call_technical_support_response: action.payload.data,
      };
    }
    case CALL_TECHNICAL_SUPPORT_FAILED: {
      return {
        ...state,
        loading: false,
        call_technical_support_status: action.payload.data.status,
        call_technical_support_response: action.payload.data,
      };
    }

    case EMOTION_DATA: {
      return {
        ...state,
        loading: true,
        emotion_data_status: null,
        emotion_data_response: null,
      };
    }
    case EMOTION_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        emotion_data_status: action.payload.data.status,
        emotion_data_response: action.payload.data,
      };
    }
    case EMOTION_DATA_FAILED: {
      return {
        ...state,
        loading: false,
        emotion_data_status: action.payload.data.status,
        emotion_data_response: action.payload.data,
      };
    }

    case MATH_STUDENT_QUIZZES: {
      return {
        ...state,
        loading: true,
        math_student_quiz_status: null,
        math_student_quiz_response: null,
      };
    }
    case MATH_STUDENT_QUIZZES_SUCCESS: {
      return {
        ...state,
        loading: false,
        math_student_quiz_status: action.payload.data.status,
        math_student_quiz_response: action.payload.data,
      };
    }
    case MATH_STUDENT_QUIZZES_FAILED: {
      return {
        ...state,
        loading: false,
        math_student_quiz_status: action.payload.data.status,
        math_student_quiz_response: action.payload.data,
      };
    }

    case SET_USER_DETAILS: {
      return {
        ...state,

        user_detail_response: action.payload.data,
      };
    }

    default:
      return state;
  }
}
