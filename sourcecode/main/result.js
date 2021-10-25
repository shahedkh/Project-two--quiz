let questionArray = [];

defineQuizJson()
function defineQuizJson() {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        let data = JSON.parse(httpRequest.responseText);
        questionArray = data;
      }
    }
  };
  httpRequest.open("GET", "quizQuestions.json");
  httpRequest.send();
}


myResults();
function myResults() {
  let answersArray = localStorage.getItem("answers");
  let answersfromJson = JSON.parse(answersArray);
  let correctAnswerCounter = 0;
  let wrongAnswerCounter = 0;

  for (let index = 0; index < answersfromJson.length; index++) {
    const element = answersfromJson[index];
    if (element.correctAnswer == element.userAnswer) {
      correctAnswerCounter++;
    } else {
      wrongAnswerCounter++;
    }
  }
  console.log(correctAnswerCounter);
  console.log(wrongAnswerCounter);
  let passExam = answersfromJson.length / 2;
  let correct = document.getElementById("correct");
  let wrong = document.getElementById("wrong");
  console.log(passExam);
  if (correctAnswerCounter >= passExam) {
   correct.style.display="block"
  } else {
   wrong.style.display="block"
  }
}

let resultsTable = document.querySelector(".results-table")
function showAnswers() {
  document.getElementById("btnShowAnswer").style.display="none"
  document.querySelector(".result-cont").style.height = "130vh"
  document.querySelector(".result").style.height = "110vh"
  if(resultsTable.innerHTML = " "){
  let userAnswers = JSON.parse(localStorage.getItem("answers"));
  console.log(userAnswers);
  console.log(questionArray);
  for(let i = 0 ; i < questionArray.length ; i++){
    let optionsArray = questionArray[i].options;
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    tr.appendChild(td1)
    tr.appendChild(td2)
    resultsTable.appendChild(tr)
    if(userAnswers[i].correctAnswer === Number(userAnswers[i].userAnswer)){
      td1.innerHTML = questionArray[i].question;
      td2.innerHTML = optionsArray[userAnswers[i].userAnswer - 1].value;
      td2.style.color = "green";
    }else {
      td1.innerHTML = questionArray[i].question;
      td2.innerHTML = optionsArray[userAnswers[i].userAnswer - 1].value;
      td2.style.color = "red";
    }
   
  }
}
}
