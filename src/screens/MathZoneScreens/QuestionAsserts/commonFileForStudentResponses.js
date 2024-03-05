const getValue = (row, col, typedValues) => {
    let value = null;
    typedValues.map((val) => {
      if (val.row == row && val.col == col) {
        value = val.value;
      }
    });
    return value;
  };
  
  export const commonKeyingTypeStudentResponse = (student_response, typedValues) => {
    let temp = student_response;
  
    for (let i = 0; i < temp.questionContent.length; i++) {
      for (let j = 0; j < temp.questionContent[i].length; j++) {
        if (temp.questionContent[i][j].isMissed == "true") {
          let row = temp.questionContent[i][j].row;
          let col = temp.questionContent[i][j].col;
          let value = getValue(row, col, typedValues);
          temp.questionContent[i][j].studentAnswer = value;
        } else {
          temp.questionContent[i][j].studentAnswer = "";
        }
      }
    }
  
    student_response.questionContent = temp.questionContent;
    return student_response;
  };

  export const commonKeyingTypeStudentResponse1D = (student_response, typedValues) => {
    let temp = student_response;

    for (let i = 0; i < temp.questionContent.length; i++) {
        if (temp.questionContent[i].isMissed == "true") {
           let row = temp.questionContent[i].row;
           let col = temp.questionContent[i].col;
           let value = getValue(row, col, typedValues);
          temp.questionContent[i].studentAnswer = value;
        } else {
          temp.questionContent[i].studentAnswer = "";
        }
    }
  
    student_response.questionContent = temp.questionContent;
    return student_response;
  };

  
  export const commonDragDropTypeStudentResponse  = (student_response, droppedValues) =>{
    let temp = student_response;
  
    for (let i = 0; i < temp.questionContent.length; i++) {
        if (temp.questionContent[i].isMissed == "true") {
           let row = temp.questionContent[i].row;
           let col = temp.questionContent[i].col;
           let value = getValue(row, col, droppedValues);
          temp.questionContent[i].studentAnswer = value;
        } else {
          temp.questionContent[i].studentAnswer = "";
        }
    }
  
    student_response.questionContent = temp.questionContent;
    return student_response;
  }

  export const commonDragDropTypeStudentResponse2D  = (student_response, droppedValues) =>{
    let temp = student_response;
  
    for (let i = 0; i < temp.questionContent.length; i++) {
      for (let j = 0; j < temp.questionContent[i].length; j++) {
        if (temp.questionContent[i][j].isMissed == "true") {
          let row = temp.questionContent[i][j].row;
          let col = temp.questionContent[i][j].col;
          let value = getValue(row, col, droppedValues);
          temp.questionContent[i][j].studentAnswer = value;
        } else {
          temp.questionContent[i][j].studentAnswer = "";
        }
      }
    }
  
    student_response.questionContent = temp.questionContent;
    return student_response;
  }



  export function convertHTML(str) {

    if(str === "&amp;"){
      return "&";
    }else if(str === "&lt;"){
      return "<"
    }else if(str === "&gt;"){
      return ">";
    }else if(str === "&quot;"){
      return '"' ;
    }else{
      return str
    }
  }