// const mongoose = require("mongoose");

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,

//   useUnifiedTopology: true,
// });
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


const modalBtn = document.querySelector(".modal-btn");
const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");
const time = document.querySelector(".time");
const dateSlot = document.querySelector(".calendar-top");
const rightArrow = document.getElementById("calendar-right");
const leftArrow = document.getElementById("calendar-left");
const arrows = document.querySelectorAll(".calendar-side");
const timeWord = document.querySelector(".time-word")
// const checkBox = document.querySelectorAll(".checkbox");

// checkBox.addEventListener("click", toggleComplete);
// $('.checkbox').click(function(){
//   $(this).addClass('checked');

// })
async function toggleComplete(id){
  console.log(id)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       
        console.log("hi")
    }
    xhttp.open("POST", "../routes/toggle", true);
  xhttp.send();
  }
}
// $.post( url [, data ] [, success ] [, dataType ] )

let v = 0;
arrows.currentDay = 0

function nextDay(evt) {
    console.log(evt);
  arrows.currentDay++;
  console.log(arrows.currentDay);
  if (arrows.currentDay > 1) {
    arrows.currentDay = 1;
  }
  if (arrows.currentDay === 1) {
    dateSlot.textContent = "Tomorrow";
    console.log("hit");
   rightArrow.style.visibility= 'hidden';
   rightArrow.style.opacity= '0';
  }
  else{
    currentDate();
    leftArrow.style.visibility= 'visible';
   leftArrow.style.opacity= '1';
  }
}
function prevDay(v) {
    arrows.currentDay--;
  console.log(arrows.currentDay);
  if (arrows.currentDay < -1) {
    arrows.currentDay = -1;
  }
  if (arrows.currentDay === -1) {
    dateSlot.textContent = "Yesterday";
    console.log("hit");
    leftArrow.style.visibility= 'hidden';
   leftArrow.style.opacity= '0';
  }else{
    rightArrow.style.visibility= 'visible';
    rightArrow.style.opacity= '1';
    currentDate();
  }
}
// leftArrow.addEventListener("click", prevDay);
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function timeUpdate() {
  let today = new Date();
  let h = addZero(today.getHours());
  let m = addZero(today.getMinutes());
  let s = addZero(today.getSeconds());
  let timer = h + ":" + m + ":" + s;
  document.getElementById("currentTime").textContent = timer;
}
function getTimeWord (){
  let t = new Date();
  let h = parseInt(t.getHours());
  if(h >= 4 && h < 12){
    timeWord.textContent = " morning"
  }
  else if (h >= 12 && h < 18){
    timeWord.textContent = " afternoon"
  }
  else {
    timeWord.textContent = " evening"
  }
}

function currentDate() {
  const d1 = new Date();
  // console.log(day);
  const options = {
    weekday: "long",
    year: undefined,
    month: "long",
    day: "numeric",
  };
  let d2 = d1.toLocaleDateString(undefined, options);
  let array = d2.split(" "),
    weekday = array[0],
    number = array[1],
    month = array[2];
  let n = parseInt(number);
  let formatted = weekday + " " + month + " " + number;
  dateSlot.textContent = formatted;
}
getTimeWord ();
setInterval(timeUpdate, 1000);


timeUpdate();
setInterval(timeUpdate, 1000);
currentDate();

if (new Date().getHours() === 0) {
  currentDate();
}

function showModal(evt) {
  console.log("clicked");
  modalBg.classList.add("bg-active");
}
function hideModal(evt) {
  modalBg.classList.remove("bg-active");
}






rightArrow.addEventListener("click", nextDay);
leftArrow.addEventListener("click", prevDay);
modalBtn.addEventListener("click", showModal);
modalClose.addEventListener("click", hideModal);
