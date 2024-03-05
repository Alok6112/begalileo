import moment from "moment";

export function getDifferenceFromTodayDate(value, time) {
  var eventMoment = moment(value + time, "YYYY-MM-DDLT");

  var currentMoment = moment();

  const daysLeft = currentMoment.diff(eventMoment, "days");
  if (daysLeft > 0) {
    if (daysLeft > 1) return daysLeft + " Days";
    else return daysLeft + " Day";
  } else {
    const hoursLeft = currentMoment.diff(eventMoment, "hours");
    if (hoursLeft > 1) return hoursLeft + " Hours";
    else return hoursLeft + " Hour";
  }

  //const timeLeft = moment(future.diff(currentDate)).format("HH:mm:ss");
}

export function getDifferenceFromTodayTime(value, time) {
  var eventMoment = moment(value + time, "YYYY-MM-DDLT");

  var currentMoment = moment();

  const minsLeft = eventMoment.diff(currentMoment, "minutes");
  return minsLeft;

  //const timeLeft = moment(future.diff(currentDate)).format("HH:mm:ss");
}

export function checkCurrentTimeIsValidToPeak(
  class_start_date,
  class_start_time
) {
  var isValid = false;

  var eventMoment = moment(class_start_date + class_start_time, "YYYY-MM-DDLT");

  var eventEndMoment = moment(
    class_start_date + class_start_time,
    "YYYY-MM-DDLT"
  ).add(1, "hour");

  var currentMoment = moment();

  // console.log(moment().format("MM ddd, YYYY HH:mm:ss a"));
  // console.log("Current time", currentMoment.format("MM ddd, YYYY HH:mm:ss a"));
  // console.log("start time", eventMoment.format("MM ddd, YYYY HH:mm:ss a"));
  // console.log("end time", eventEndMoment.format("MM ddd, YYYY HH:mm:ss a"));

  return currentMoment.isBetween(eventMoment, eventEndMoment);
}

export function checkClassValidityBeforeCancel(
  class_start_date,
  class_start_time
) {
  var eventMoment = moment(
    class_start_date + class_start_time,
    "YYYY-MM-DDLT"
  ).subtract(2, "hours");
  var eventEndMoment = moment(
    class_start_date + class_start_time,
    "YYYY-MM-DDLT"
  );
  var currentMoment = moment();

  const betweenTwoHours = currentMoment.isBetween(eventMoment, eventEndMoment);
  const afterClassTime = currentMoment.isAfter(eventEndMoment);
  console.log("betweenTwoHours", betweenTwoHours);
  console.log("afterClassTime", afterClassTime);
  if (betweenTwoHours || afterClassTime) {
    return true;
  } else {
    return false;
  }
}

export function checkIfValueNullOrEmpty(value) {
  return value == "" || value == "NUll" || value == "null" || value == "NULL";
}

export function getClassesDateFormat(classDate) {
  if (classDate != null || classDate != "") return classDate.trim().split(" ");
  else return "";
}

export function getDayOfTheWeek() {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
}

export function secondsToHms(d) {
  console.log("Seconds to time", d);
  if (d == 0) return 0;
  d = Number(d);
  d = Number(3800);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " Hr " : " Hrs ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " Min " : " Mins ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay;
}

export function timeInHourFormat(mTime) {
  if (mTime == undefined || mTime == 0) return "0 Mins";
  var timeValue = "";
  var a = mTime.split(":");
  if (a[0] != "00") {
    timeValue += a[0] + " Hr";
  }
  if (a[1] != "00") {
    timeValue += " " + a[1] + " Min";
  }
  if (mTime == "00:00:00") timeValue = "0";
  return timeValue;
}

export function getMaxDateFromToday(days) {
  var date = new Date();
  var res = date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  date = new Date(res);
  return date;
}

function replaceAll(str, find, replace) {
  var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(escapedFind, "g"), replace);
}

export function getDisplayFormattedDate(dateValue) {
  return moment(dateValue).format("MMM DD, YYYY");
}

export function getDisplayFormattedMonthDay(dateValue) {
  return moment(dateValue).format("MMM DD");
}

export function getValueDayOfTheWeek(day) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
export function getValueOfMonth(month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month];
}

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
