var firebaseConfig = {
  apiKey: "AIzaSyD3rw8uGvnX4cDbhiZbIjQm8YMjwoTEj7c",
  authDomain: "myquizapp-8f7f6.firebaseapp.com",
  databaseURL: "https://myquizapp-8f7f6-default-rtdb.firebaseio.com",
  projectId: "myquizapp-8f7f6",
  storageBucket: "myquizapp-8f7f6.firebasestorage.app",
  messagingSenderId: "248441151043",
  appId: "1:248441151043:web:a0729d9f79655f9a1d3ef6"
};

// Initialize Firebase

var app = firebase.initializeApp(firebaseConfig);
    
var database = firebase.database();
var questions = [
  {
    question: "How can you convert the string ‘123’ to a number in JavaScript?",
    option1: " Number(‘123’)",
    option2: "parseInt(‘123’)",
    option3: "Both",
    corrAnswer: "Both",
  },
  {
    question: "How do you find the length of a string str in JavaScript?",
    option1: "str.length()",
    option2: "str.size()",
    option3: " str.length",
    corrAnswer: "str.length()",
  },
  {
    question: "How do you find the number with the highest value of x and y",
    option1: "Math.ceil(x, y)",
    option2: "Math.round(7.25)",
    option3: "round(7.25)",
    corrAnswer: "Math.round(7.25)",
  },
  {
    question: "Which one of these is a JavaScript package manager",
    option1: "TypeScript",
    option2: "npm",
    option3: "JSON",
    corrAnswer: "npm",
  },
  {
    question: "Which one is NOT a valid JavaScript data type?",
    option1: "Undefined",
    option2: " Number",
    option3: "Float",
    corrAnswer: "Float",
  },
  
  {
    question: "In JS variable types are ____________ ",
    option1: "6",
    option2: "3",
    option3: "8",
    corrAnswer: "8",
  },
  
  {
    question: "How do you write an ‘if’ statement in JavaScript to check if a variable a is NOT equal to 10?",
    option1: "if !(a == 10)",
    option2: "if (a != 10)",
    option3: "if a <> 10",
    corrAnswer: "if (a != 10)",
  },
];

var ques = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var btn = document.getElementById("btn");
var timer = document.getElementById("timer");
var index = 0;
var score = 0;
var min = 1;
var sec = 29;

var interval = setInterval(function () {
  timer.innerHTML = `${min}:${sec}`;
  sec--;
  if (sec < 0) {
    min--;
    sec = 59;
    if (min < 0) {
      min = 1;
      sec = 59;
      nextQuestion();
    }
  }
}, 1000);


function nextQuestion() {
  var getOptions = document.getElementsByName("option");

  for (var i = 0; i < getOptions.length; i++) {
      if (getOptions[i].checked) {
          var selectedAns = getOptions[i].value;
          var selectedOpt = questions[index - 1][`option${selectedAns}`];
          var correctAns = questions[index - 1]["corrAnswer"];

          if (selectedOpt == correctAns) {
              score++;
          }

          // Send answer to Firebase
          database.ref('user_answers').push({
              question: questions[index - 1].question,
              selected_option: selectedOpt,
              correct_option: correctAns,
              is_correct: selectedOpt == correctAns,
          });
      }

      getOptions[i].checked = false;
  }
  btn.disabled = true;

  if (index > questions.length - 1) {
      Swal.fire({
          title: "Good job!",
          text: ((score / questions.length) * 100).toFixed(2),
          icon: "success",
      });
      clearInterval(interval);
  } else {
      ques.innerText = questions[index].question;
      opt1.innerText = questions[index].option1;
      opt2.innerText = questions[index].option2;
      opt3.innerText = questions[index].option3;
      index++;
      min = 1;
      sec = 29;
  }
}


function target() {
  btn.disabled = false;
}