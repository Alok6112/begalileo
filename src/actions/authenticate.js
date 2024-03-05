import {
  LOGIN_REQUEST,
  RESTORE_SUCCESS,
  RESTORE_REQUEST,
  RESTORE_FAIL,
  SEND_OTP,
  RESEND_OTP,
  VERIFY_OTP,
  STORE_MOBILE,
  REGISTER_PARENT,
  GET_GRADE_DATA,
  REGISTER_STUDENT,
  DELETE_ACCOUNT,
  LOGOUT_REQUEST,
  DELETE_STUDENT,
  EDIT_STUDENT,
  EXISTING_USER_LOGIN,
  EDIT_MOBILE_NUMBER,
} from '../config/redux-action-types/authenticate';
import FormData from 'form-data';
import {MSG91_AUTH_KEY, MSG91_TEMPLATE_ID} from '../config/configs';
import {MATH_STUDENT_QUIZZES} from '../config/redux-action-types/dashboard';

export function loginUser(user) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      request: {
        url: `/users/${user}`,
      },
    },
  };
}

export function logOutUser() {
  return {
    type: LOGOUT_REQUEST,
  };
}
export function editMobileNumber() {
  return {
    type: EDIT_MOBILE_NUMBER,
  };
}

export function sendOTP(mobileNumber) {
  return {
    type: SEND_OTP,
    payload: {
      request: {
        url: 'https://api.msg91.com/api/v5/otp',
        params: {
          invisible: 1,
          authkey: MSG91_AUTH_KEY,
          mobile: mobileNumber,
          template_id: MSG91_TEMPLATE_ID,
        },
      },
    },
  };
}
export function sendOTPHashed(mobileNumber, hashkey) {
  return {
    type: SEND_OTP,
    payload: {
      request: {
        url: 'https://api.msg91.com/api/v5/otp',
        params: {
          invisible: 1,
          authkey: MSG91_AUTH_KEY,
          mobile: mobileNumber,
          template_id: MSG91_TEMPLATE_ID,
          extra_param: '{ "VAR1":"' + hashkey + '"}',
        },
      },
    },
  };
}
export function reSendOTP(mobileNumber) {
  return {
    type: RESEND_OTP,
    payload: {
      request: {
        url: 'https://api.msg91.com/api/v5/otp/retry',
        params: {
          authkey: MSG91_AUTH_KEY,
          mobile: mobileNumber,
          retrytype: 'text',
        },
      },
    },
  };
}

export function verifyOTP(otp, mobileNumber) {
  console.debug('Verify OTP ' + otp + ' mobile ' + mobileNumber);
  return {
    type: VERIFY_OTP,
    payload: {
      request: {
        url: 'https://api.msg91.com/api/v5/otp/verify',
        params: {
          otp: otp,
          authkey: MSG91_AUTH_KEY,
          mobile: mobileNumber,
        },
      },
    },
  };
}

export function storeMobileNumber(
  mobile,
  otp_status,
  email,
  country_code,
  country,
) {
  return {
    type: STORE_MOBILE,
    payload: {
      request: {
        url: 'app_mathbox/store_mobile',
        params: {
          mobile,
          otp_status,
          email,
          country_code,
          country,
        },
      },
    },
  };
}

export function existingUserLogin(user_name, password) {
  return {
    type: EXISTING_USER_LOGIN,
    payload: {
      request: {
        url: 'app_mathbox/login',
        params: {
          user_name,
          password,
        },
      },
    },
  };
}

export function storeAppleEmail(
  mobile,
  otp_status,
  token,
  country_code,
  country,
) {
  return {
    type: STORE_MOBILE,
    payload: {
      request: {
        url: 'app_mathbox/store_mobile',
        params: {
          mobile,
          otp_status,
          token,
          country_code,
          country,
        },
      },
    },
  };
}

export function getGradeDatas() {
  return {
    type: GET_GRADE_DATA,
    payload: {
      request: {
        url: 'app_mathbox/grade_boards',
      },
    },
  };
}

export function registerParent(
  mobile,
  email,
  first_name,
  last_name,
  pin,
  time_zone,
) {
  return {
    type: REGISTER_PARENT,
    payload: {
      request: {
        url: 'app_mathbox/register',
        params: {
          mobile,
          email,
          pin,
          first_name,
          last_name,
          time_zone,
        },
      },
    },
  };
}
export function pre_update_email(
  parent_id,
  email,
  first_name,
  last_name,
  contact_no,
) {
  return {
    type: REGISTER_PARENT,
    payload: {
      request: {
        url: 'app_mathbox/update_email_before_add_child',
        params: {
          parent_id,
          email,
          first_name,
          last_name,
          contact_no,
        },
      },
    },
  };
}

export function registerStudent(
  user_id,
  first_name,
  last_name,
  dob,
  grade,
  board,
  gender,
  photo,
  time_zone,
  from,
) {
  console.log(photo);
  if (photo == null) {
    return {
      type: REGISTER_STUDENT,
      payload: {
        request: {
          url: 'app_mathbox/add_child',
          params: {
            user_id,
            first_name,
            last_name,
            dob,
            grade,
            board,
            gender,
            time_zone,
            from,
          },
        },
      },
    };
  } else {
    var formdata = new FormData();
    formdata.append('user_id', user_id);
    formdata.append('first_name', first_name);
    formdata.append('last_name', last_name);
    formdata.append('dob', dob);
    formdata.append('grade', grade);
    formdata.append('board', board);
    formdata.append('gender', gender);
    formdata.append('time_zone', time_zone);
    formdata.append('from', from);
    formdata.append('photo', {
      uri: Platform.OS === 'android' ? `file:///${photo.uri}` : photo.uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    console.log(formdata);

    return {
      type: REGISTER_STUDENT,
      payload: {
        request: {
          method: 'post',
          url: 'app_mathbox/add_child',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        },
      },
    };
  }

  // formdata.append("photo", fileInput.files[0], "ResImage.png");
}

export function deleteStudent(student_id) {
  return {
    type: DELETE_STUDENT,
    payload: {
      request: {
        url: 'app_mathbox/delete_child',
        params: {
          student_id,
        },
      },
    },
  };
}

export function deleteUserAccount(parent_id) {
  return {
    type: DELETE_STUDENT,
    payload: {
      request: {
        url: 'app_mathbox/delete_user_account',
        params: {
          parent_id,
        },
      },
    },
  };
}

export function editStudent(
  student_id,
  first_name,
  last_name,
  dob,
  grade,
  board,
  gender,
  photo,
  time_zone,
) {
  console.log(photo);
  if (photo == null) {
    return {
      type: EDIT_STUDENT,
      payload: {
        request: {
          url: 'app_mathbox/edit_child',
          params: {
            student_id,
            first_name,
            last_name,
            dob,
            grade,
            board,
            gender,
            time_zone,
          },
        },
      },
    };
  } else {
    var formdata = new FormData();
    formdata.append('student_id', student_id);
    formdata.append('first_name', first_name);
    formdata.append('last_name', last_name);
    formdata.append('dob', dob);
    formdata.append('grade', grade);
    formdata.append('board', board);
    formdata.append('gender', gender);
    formdata.append('time_zone', time_zone);
    formdata.append('photo', {
      uri: Platform.OS === 'android' ? `file:///${photo.uri}` : photo.uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    console.log(formdata);

    return {
      type: EDIT_STUDENT,
      payload: {
        request: {
          method: 'post',
          url: 'app_mathbox/edit_child',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        },
      },
    };
  }

  // formdata.append("photo", fileInput.files[0], "ResImage.png");
}

export function restoreSession() {
  return async dispatch => {
    dispatch(restoreRequest());
    try {
      dispatch(restoreSuccess());
    } catch (err) {
      dispatch(restoreFailed());
    }
  };
}

function restoreRequest() {
  return {
    type: RESTORE_REQUEST,
  };
}
function restoreSuccess() {
  return {
    type: RESTORE_SUCCESS,
  };
}
function restoreFailed() {
  return {
    type: RESTORE_FAIL,
  };
}
