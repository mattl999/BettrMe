// const mongoose = require("mongoose");

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,

//   useUnifiedTopology: true,
// });
// var methodOverride = require("method-override");
// app.use(methodOverride('_method'));

var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
script.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);
const modalInput = document.getElementById("modal-input");
const editModalInput = document.getElementById("edit-modal-input");
const modalBtn = document.querySelector(".modal-btn");
const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");
const editModalBtn = document.querySelector(".edit-modal-btn");
const editModalBg = document.querySelector(".edit-modal-bg");
const editModalClose = document.querySelector(".edit-modal-close");
const time = document.querySelector(".time");
const dateSlot = document.querySelector(".calendar-top");
const rightArrow = document.getElementById("calendar-right");
const leftArrow = document.getElementById("calendar-left");
const arrows = document.querySelectorAll(".calendar-side");
const timeWord = document.querySelector(".time-word");
const editBtn = document.querySelector(".edit");
const currentView = document.getElementById("display");
const progFill = document.querySelector(".progress-fill");
const percentNum = document.querySelector(".progress-percent");
const progMsg = document.querySelector(".progress-message");
const topMsg = document.querySelector(".top-message");
const timeInput = document.getElementById('datetime12');
const calendarDisplay = document.querySelector(".goal-list")
const innerDisplay = document.querySelector("#display")

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
  return formatted;
}

async function nextDay(event) {
  let viewing= "";
  let u = event.target.getAttribute('queryUser')
  let res = await fetch("/getDisplayVal/" + u, {
    method: "GET",
  }).then((response) => response.json());
  v =  res.displayVal;
  v++
  console.log("v",v);
  if (v === 1) {
   
    console.log("tomorrow");
    viewing = "tomorrow"
    rightArrow.style.visibility = "hidden";
    rightArrow.style.opacity = "0";
    rightArrow.style.pointerEvents = 'none';  
  } else {
    
    console.log("today")
    viewing = "today"
    leftArrow.style.visibility = "visible";
    leftArrow.style.opacity = "1";
    leftArrow.style.pointerEvents = 'auto'
  }
  try {
    res = await fetch("/change/" + viewing + "/" + u, {
      method: "PUT",
    }).then((response) => response.json());
    }
    catch(err){
      console.log(err)
    }
    window.location.replace('/')
}
async function prevDay(event, val) {
  let viewing= "";
  let u = event.target.getAttribute('queryUser')
  let res = await fetch("/getDisplayVal/" + u, {
    method: "GET",
  }).then((response) => response.json());
  v = res.displayVal;
  v--;
  console.log("v",v);
  if (v < -1) {
    v = -1;
  }
  if (v === -1) {
    
    viewing = "yesterday"
    console.log("Yesterday");
    leftArrow.style.visibility = "hidden";
    leftArrow.style.opacity = "0";
    leftArrow.style.pointerEvents = 'none';
  } else {
    
    console.log("today");
    viewing = "today"
    rightArrow.style.visibility = "visible";
    rightArrow.style.opacity = "1";
    rightArrow.style.pointerEvents = 'auto'
  }
  try {
    res = await fetch("/change/" + viewing + "/" + u, {
      method: "PUT",
    }).then((response) => response.json());
    }
    catch(err){
      console.log(err)
    }
    window.location.replace('/')
  
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
function getTimeWord() {
  let t = new Date();
  let h = parseInt(t.getHours());
  if (h >= 4 && h < 12) {
    timeWord.textContent = " morning";
  } else if (h >= 12 && h < 18) {
    timeWord.textContent = " afternoon";
  } else {
    timeWord.textContent = " evening";
  }
}


getTimeWord();
setInterval(timeUpdate, 1000);

timeUpdate();



// if (new Date().getHours() === 0) {
//   currentDate();
// }

function showModal(evt) {
  console.log("clicked");
  modalBg.classList.add("bg-active");
  modalInput.focus()
}
function hideModal(evt) {
  modalBg.classList.remove("bg-active");
}
function hideEditModal(evt) {
  editModalBg.classList.remove("bg-active");
}
let g = "";
let activity = "";
let u = "";

function showEditModal(evt) {
  console.log("clicked");
  editModalBg.classList.add("bg-active");
  g = evt.target.getAttribute("data-id");
  console.log(g);
  activity = evt.target.getAttribute("data-activity-id");
  console.log("act",activity);
  editModalInput.value = activity;
  editModalInput.focus()
  // editModalInput.setAttribute("value",activity) ;
}
function _ajax_request(url, data, callback, method) {
  return jQuery.ajax({
    url: url,
    type: method,
    data: data,
    success: callback,
  });
}
jQuery.extend({
  put: function (url, data, callback) {
    return _ajax_request(url, data, callback, "PUT");
  },
});

async function confirmEdit(event) {
  u = event.target.getAttribute("queryUser");
  activity = editModalInput.value;
  console.log("asdfasdfasdfa", u);
  await axios.post("/goals/" + g + "?_method=PUT", {
    activity: activity,
    user: u,
  });
  // $.put('/goals/'+g, {activity:activity, id: g})
  window.location.replace("/");
  hideEditModal();
}
async function wakeUpEdit(event) {
  u = event.target.getAttribute("queryUser");
  
  console.log("asdfasdfasdfa", u);
  await axios.post("/intro/?_method=PUT", {
    user: u,
  });
  // $.put('/goals/'+g, {activity:activity, id: g})
  window.location.replace("/");
  
}
async function deleteObject(event) {
  u = event.target.getAttribute("queryUser");

  console.log("asdfasdfasdfa", g);
  let res = await axios.post("/goals/" + g + "?_method=DELETE", { user: u });
  console.log(res.percent);
  progFill.style.width = res.percent;
  window.location.replace("/");

  hideEditModal();
  // $.put('/goals/'+g, {activity:activity, id: g})
}
async function toggleComplete(event) {
  u = event.target.getAttribute("queryUser");
  g = event.target.getAttribute("dataId");
  console.log("evt-target", event.target);
  // console.log(u);

  await axios.post("/goals/toggle/" + g + "?_method=PUT", { user: u });
  window.location.replace("/");
  // axios.post('/goals/' + g +'toggle?_method=PUT', {user: u})
}

async function toggler(event) {
  g = event.target.getAttribute("dataId");
  u = event.target.getAttribute("queryUser");

  let completed;
  try {
    res = await fetch("/goals/toggle/" + g + "/" + u, {
      method: "PUT",
      user: u,
    }).then((response) => response.json());
   
    res.completed
      ? event.target.querySelector("img").setAttribute("class", "checkmark")
      : event.target
          .querySelector("img")
          .setAttribute("class", "checkmark invisible");
    progFill.style.width = res.percent;
    percentNum.textContent = res.percent;
    let percentVal = parseInt(res.percent);
    
    if (!percentVal) {
      progMsg.innerHTML = `&nbsp Time to get started on those goals`;
    } 
    if(percentVal > 0 && percentVal < 40) {     
      console.log("hit 1") 
      progMsg.innerHTML = `&nbsp Great work so far! &#128079;`;
    }
    if(percentVal > 40 && percentVal < 70) {     
      progMsg.innerHTML = `&nbsp Keep it up! You're doing awesome &#128526;`;
    }
    if(percentVal > 70 && percentVal < 100) {     
      progMsg.innerHTML = `&nbsp You're almost there! &#128170`;
    }
    if(percentVal === 100) {
      progMsg.innerHTML = `&nbsp Congrats! &#127881 You completed all your goals! `
    }
  } catch (err) {
    console.log(err);
  }
}
function renderFunc(percent, displayVal){
  console.log("displayVal",displayVal);
  displayVal = parseInt(displayVal)
  if(displayVal === -1){
    dateSlot.textContent = "Yesterday"
  }
  else if(displayVal === 1){
    dateSlot.textContent = "Tomorrow"
  }else{
  dateSlot.textContent = currentDate();
}
  let percentVal = parseInt(percent);
  if(percentVal > 0 && percentVal < 40) {     
    progMsg.innerHTML = `&nbsp Great work so far! &#128079;`;
  }
  if(percentVal > 40 && percentVal < 70) {     
    progMsg.innerHTML = `&nbsp Keep it up! You're doing awesome &#128526;`;
  }
  if(percentVal > 70 && percentVal < 100) {     
    progMsg.innerHTML = `&nbsp You're almost there! &#128170`;
  }
  if(percentVal === 100) {
    progMsg.innerHTML = `&nbsp Congrats! &#127881 You completed all your goals! `
  }
}





editModalClose.addEventListener("click", hideEditModal);
// rightArrow.addEventListener("click", nextDay);
// leftArrow.addEventListener("click", prevDay);
modalBtn.addEventListener("click", showModal);
modalClose.addEventListener("click", hideModal);
