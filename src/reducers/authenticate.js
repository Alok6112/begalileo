import {
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  RESTORE_REQUEST,
  RESTORE_SUCCESS,
  RESTORE_FAIL,
  SEND_OTP,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILED,
  EDIT_MOBILE_NUMBER,
  RESEND_OTP,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILED,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILED,
  STORE_MOBILE,
  STORE_MOBILE_FAILED,
  STORE_MOBILE_SUCCESS,
  REGISTER_PARENT,
  REGISTER_PARENT_SUCCESS,
  REGISTER_PARENT_FAILED,
  REGISTER_STUDENT,
  REGISTER_STUDENT_FAILED,
  REGISTER_STUDENT_SUCCESS,
  GET_GRADE_DATA,
  GET_GRADE_DATA_SUCCESS,
  GET_GRADE_DATA_FAILED,
  LOGOUT_REQUEST,
  DELETE_STUDENT,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILED,
  EDIT_STUDENT,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILED,
  EXISTING_USER_LOGIN,
  EXISTING_USER_LOGIN_SUCCESS,
  EXISTING_USER_LOGIN_FAILED,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILED,
} from "../config/redux-action-types/authenticate";
import { showMessage, hideMessage } from "react-native-flash-message";
import {
  CLASS_CANCEL,
  CLASS_CANCEL_FAILED,
  CLASS_CANCEL_SUCCESS,
} from "../config/redux-action-types/dashboard";
import { DELETE_ACCOUNT } from "../assets/images";

const initialState = { user: {}, requestRestore: true, showEnterOTP: false };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      // console.debug("gdggdf0");
      return { ...state, loading: true };
    case LOGOUT_REQUEST:
      return initialState;
    case LOGIN_SUCCESS:
      console.debug(action.payload.data.name);
      return { ...state, loading: false, user: action.payload.data };
    case LOGIN_FAILED:
      // console.debug("Failed");
      return { ...state, loading: false, errorUser: "Error Getting Login" };
    case RESTORE_REQUEST:
      // console.debug("Failed");
      return { ...state, requestRestore: true };
    case RESTORE_SUCCESS:
      return { ...state, requestRestore: false };
    case RESTORE_FAIL:
      return { ...state, requestRestore: false };
    case EDIT_MOBILE_NUMBER:
      return { ...state, showEnterOTP: false };
    case SEND_OTP:
      return { ...state, loading: true };
    case SEND_OTP_SUCCESS: {
      return {
        ...state,
        loading: false,
        showEnterOTP: true,
        response: action.payload.data,
      };
    }

    case SEND_OTP_FAILED: {
      showMessage({
        message: "OTP sending failed please try again",
        type: "danger",
      });
      return { ...state, loading: false, response: action.payload.data };
    }
    case RESEND_OTP: {
      return { ...state, loading: true };
    }
    case RESEND_OTP_SUCCESS: {
      return { ...state, loading: false, response: action.payload.data };
    }
    case RESEND_OTP_FAILED: {
      return { ...state, loading: false, response: action.payload.data };
    }
    case VERIFY_OTP: {
      return { ...state, loading: true };
    }
    case VERIFY_OTP_SUCCESS: {
      var response = action.payload.data;
      if (response.type == "error") {
        return {
          ...state,
          loading: false,
          isOtpVerifySuccess: false,
          response: action.payload.data,
        };
      } else {
        return {
          ...state,
          loading: false,
          isOtpVerifySuccess: true,
          response: action.payload.data,
        };
      }
    }
    case VERIFY_OTP_FAILED: {
      return {
        ...state,
        loading: false,
        isOtpVerifySuccess: false,
        response: action.payload.data,
      };
    }
    case STORE_MOBILE: {
      return { ...state, loading: true };
    }
    case STORE_MOBILE_SUCCESS: {
      console.log("Failed");
      console.log(action.payload.data);
      return {
        ...state,
        loading: false,
        storeMobileSucess: true,
        response: action.payload.data,
      };
    }
    case STORE_MOBILE_FAILED: {
      console.log("Failed");
      console.log(action.payload.data);
      return {
        ...state,
        loading: false,
        storeMobileSucess: false,
        response: action.payload.data,
      };
    }
    case REGISTER_PARENT: {
      return {
        ...state,
        loading: true,
        submit_parent_status: null,
        submit_parent_response: action.payload.data,
      };
    }
    case REGISTER_PARENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        submit_parent_status: action.payload.data.status,
        submit_parent_response: action.payload.data,
      };
    }
    case REGISTER_PARENT_FAILED: {
      return {
        ...state,
        loading: false,
        submit_parent_status: false,
        submit_parent_response: action.payload.data,
      };
    }

    case REGISTER_STUDENT: {
      return {
        ...state,
        loading: true,
        submitStudentSuccess: false,
        studentSubmitResponse: action.payload.data,
      };
    }
    case REGISTER_STUDENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        submitStudentSuccess: action.payload.data.status,
        studentSubmitResponse: action.payload.data,
      };
    }
    case REGISTER_STUDENT_FAILED: {
      return {
        ...state,
        loading: false,
        submitStudentSuccess: false,
        studentSubmitResponse: action.payload.data,
      };
    }

    case GET_GRADE_DATA: {
      return { ...state, loading: true, response: action.payload.data };
    }
    case GET_GRADE_DATA_SUCCESS: {
      return { ...state, loading: false, response: action.payload.data };
    }
    case GET_GRADE_DATA_FAILED: {
      return { ...state, loading: false, response: action.payload.data };
    }

    case DELETE_STUDENT: {
      return {
        ...state,
        loading: true,
        delete_student_status: false,
      };
    }
    case DELETE_STUDENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        delete_student_status: action.payload.data.status,
        delete_student_response: action.payload.data,
      };
    }
    case DELETE_STUDENT_FAILED: {
      return {
        ...state,
        loading: false,
        delete_student_status: action.payload.data.status,
        delete_student_response: action.payload.data,
      };
    }

    case EDIT_STUDENT: {
      return {
        ...state,
        loading: true,
        edit_student_status: false,
      };
    }
    case EDIT_STUDENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        edit_student_status: action.payload.data.status,
        edit_student_response: action.payload.data,
      };
    }
    case EDIT_STUDENT_FAILED: {
      return {
        ...state,
        loading: false,
        edit_student_status: action.payload.data.status,
        edit_student_response: action.payload.data,
      };
    }

    case EXISTING_USER_LOGIN: {
      return {
        ...state,
        loading: true,
        user_login_status: null,
      };
    }
    case EXISTING_USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        user_login_status: action.payload.data.status,
        user_login_response: action.payload.data,
      };
    }
    case EXISTING_USER_LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
        user_login_status: false,
        user_login_response: action.payload.data,
      };
    }

    case DELETE_ACCOUNT: {
      return {
        ...state,
        loading: true,
        delete_account_status: null,
      };
    }
    case DELETE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        delete_account_status: action.payload.data.status,
        delete_account_response: action.payload.data,
      };
    }
    case DELETE_ACCOUNT_FAILED: {
      return {
        ...state,
        loading: false,
        delete_account_status: false,
        delete_account_response: action.payload.data,
      };
    }

    default:
      return state;
  }
}
