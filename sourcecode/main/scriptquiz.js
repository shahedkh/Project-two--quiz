let questionsObject = [];
let currentQuestion = 0;
let currentAnswerNumber = -1;
defineQuizJson();

function defineQuizJson() {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        let data = JSON.parse(httpRequest.responseText);

        startGenerateQuestions(data);
      }
    }
  };
  httpRequest.open("GET", "quizQuestions.json");
  httpRequest.send();
}

function startGenerateQuestions(data) {
  questionsObject = data;

  generateNextQuestion();
}

function generateNextQuestion() {
  let container = document.getElementById("question-container");
  container.innerHTML = "";

  currentAnswerNumber = -1;

  if (currentQuestion < questionsObject.length) {
    // generate the question.
    console.log(questionsObject[currentQuestion].question);
    let divQuestion = document.createElement("div");
    divQuestion.classList.add("question-div");
    divQuestion.innerHTML = questionsObject[currentQuestion].question;
    let container = document.getElementById("question-container");
    container.appendChild(divQuestion);
    let hr = document.createElement("hr");
    container.appendChild(hr);
    for (
      let index = 0;
      index < questionsObject[currentQuestion].options.length;
      index++
    ) {
      const element = questionsObject[currentQuestion].options[index];
      let radio = document.createElement("input");
      radio.setAttribute("type", "radio");
      radio.setAttribute("name", "option");
      radio.setAttribute("data-optionvalue", element.number);
      radio.setAttribute("onclick", "registerAnswer()");
      let radioContainerDiv = document.createElement("div");
      radioContainerDiv.classList.add("radio-container");
      radioContainerDiv.appendChild(radio);

      let label = document.createElement("label");
      label.innerHTML = element.value;
      radioContainerDiv.appendChild(label);
      container.appendChild(radioContainerDiv);
    }

    currentQuestion++;
    if (currentQuestion == questionsObject.length) {
      document.getElementById("btnsubmit").innerHTML = "Submit";
    }
  } else {
    submitAnswers();
  }
}

function registerAnswer() {
  document.getElementById("validationMessage").setAttribute("hidden", "true");

  console.log(
    "question answered" + event.currentTarget.getAttribute("data-optionvalue")
  );

  currentAnswerNumber = event.currentTarget.getAttribute("data-optionvalue");
}

function submitAnswers() {
  localStorage.setItem("answers", JSON.stringify(answersArray));
  window.location.href = "result.html";
}

function GotToNextStep() {
  if (currentAnswerNumber >= 0) {
    AddToAnswersArray();
    generateNextQuestion();
  } else {
    document.getElementById("validationMessage").removeAttribute("hidden");
  }
}

let answersArray = [];

function AddToAnswersArray() {
  let lastAnswerQuestionIndex = currentQuestion - 1;
  let answerObject = {
    questionIndex: lastAnswerQuestionIndex,
    correctAnswer: questionsObject[lastAnswerQuestionIndex].correctAnswer,
    userAnswer: currentAnswerNumber,
  };
  answersArray.push(answerObject);
}
