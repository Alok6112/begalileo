import moment from "moment";
export function isValidEmail(emailText) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return reg.test(emailText);
}
export function allowOnlyAlphabets(nameText) {
  let regex = /[!0-9@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

  return !regex.test(nameText);
}

export function isValidDate(value) {
  var valueDate = moment(value, "YYYY-MM-DD", true);

  return valueDate.isValid();
}
