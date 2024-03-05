function getMaxDateForChildDOB() {
  var maxDateValue = new Date();
  var pastYear = maxDateValue.getFullYear() - 1;
  maxDateValue.setFullYear(pastYear);
  return maxDateValue;
}

function getMinDateForChildDOB() {
  var minDateValue = new Date();
  var pastYear = minDateValue.getFullYear() - 20;
  minDateValue.setFullYear(pastYear);
  return minDateValue;
}

const monthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDateInString = (e) => {
  let d = e.split("-");
  let year = d[0];
  let month = d[1];
  let date = d[2];
  let finalMonth = "";
  let final = month.split("");
  if (final[0] == "0") {
    finalMonth = final[1];
  } else {
    finalMonth = month;
  }
  let monthString = monthNames[finalMonth];
  let finalDate = date + " " + monthString + " " + year;
  return finalDate;
};

export { getMaxDateForChildDOB, getMinDateForChildDOB, formatDateInString };
