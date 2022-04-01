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
const timeInput = document.getElementById("datetime12");
const calendarDisplay = document.querySelector(".goal-list");
const innerDisplay = document.querySelector("#display");


function currentDate() {
  const d1 = new Date();
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
  let formatted = weekday + " " + month + " " + number;
  return formatted;
}
function renderFunc(percent, displayVal) {
  displayVal = parseInt(displayVal);
  if (displayVal === -1) {
    dateSlot.textContent = "Yesterday";
    leftArrow.style.visibility = "hidden";
    leftArrow.style.opacity = "0";
    leftArrow.style.pointerEvents = "none";
   
  } else if (displayVal === 1) {
    dateSlot.textContent = "Tomorrow";
    rightArrow.style.visibility = "hidden";
    rightArrow.style.opacity = "0";
    rightArrow.style.pointerEvents = "none";
  
    


  } else {
    dateSlot.textContent = currentDate();
  }
  let percentVal = parseInt(percent);
  if (percentVal > 0 && percentVal < 40) {
    progMsg.innerHTML = `&nbsp Great work so far! &#128079;`;
  }
  if (percentVal > 40 && percentVal < 70) {
    progMsg.innerHTML = `&nbsp Keep it up! You're doing awesome &#128526;`;
  }
  if (percentVal > 70 && percentVal < 100) {
    progMsg.innerHTML = `&nbsp You're almost there! &#128170`;
  }
  if (percentVal === 100) {
    progMsg.innerHTML = `&nbsp Congrats! &#127881 You completed all your goals! `;
  }
}
async function nextDay(event) {
  let viewing = "";
  let u = event.target.getAttribute("queryUser");
  let res = await fetch("/getDisplayVal/" + u, {
    method: "GET",
  }).then((response) => response.json());
  v = res.displayVal;
  v++;
  if (v === 1) {
    viewing = "tomorrow";
    rightArrow.style.pointerEvents = "none";
  } else {
    viewing = "today";
    leftArrow.style.pointerEvents = "auto";
  }
  try {
    res = await fetch("/change/" + viewing + "/" + u, {
      method: "PUT",
    }).then((response) => response.json());
  } catch (err) {
    console.log(err);
  }
  window.location.replace("/");
}

async function prevDay(event, val) {
  let viewing = "";
  let u = event.target.getAttribute("queryUser");
  let res = await fetch("/getDisplayVal/" + u, {
    method: "GET",
  }).then((response) => response.json());
  v = res.displayVal;
  v--;
  if (v < -1) {
    v = -1;
  }
  if (v === -1) {
    viewing = "yesterday";
    leftArrow.style.pointerEvents = "none";
  } else {
    viewing = "today";
    rightArrow.style.pointerEvents = "auto";
  }
  try {
    res = await fetch("/change/" + viewing + "/" + u, {
      method: "PUT",
    }).then((response) => response.json());
  } catch (err) {
    console.log(err);
  }
  window.location.replace("/");
}

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
// time related function calls
setInterval(timeUpdate, 1000);
getTimeWord();
timeUpdate();

function showModal(evt) {
  modalBg.classList.add("bg-active");
  modalInput.focus();
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
  editModalBg.classList.add("bg-active");
  g = evt.target.getAttribute("data-id");
  activity = evt.target.getAttribute("data-activity-id");
  editModalInput.value = activity;
  editModalInput.focus();
}

async function confirmEdit(event) {
  u = event.target.getAttribute("queryUser");
  activity = editModalInput.value;
  await axios.post("/goals/" + g + "?_method=PUT", {
    activity: activity,
    user: u,
  });
  window.location.replace("/");
  hideEditModal();
}
async function wakeUpEdit(event) {
  u = event.target.getAttribute("queryUser");
  await axios.post("/intro/?_method=PUT", {
    user: u,
  });
  window.location.replace("/");
}
async function deleteObject(event) {
  u = event.target.getAttribute("queryUser");
  let res = await axios.post("/goals/" + g + "?_method=DELETE", { user: u });
  progFill.style.width = res.percent;
  window.location.replace("/");
  hideEditModal();
}
async function toggleComplete(event) {
  u = event.target.getAttribute("queryUser");
  g = event.target.getAttribute("dataId");
  await axios.post("/goals/toggle/" + g + "?_method=PUT", { user: u });
  window.location.replace("/");
}

async function toggler(event) {
  g = event.target.getAttribute("dataId");
  u = event.target.getAttribute("queryUser");
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
    if (percentVal > 0 && percentVal < 40) {
      progMsg.innerHTML = `&nbsp Great work so far! &#128079;`;
    }
    if (percentVal > 40 && percentVal < 70) {
      progMsg.innerHTML = `&nbsp Keep it up! You're doing awesome &#128526;`;
    }
    if (percentVal > 70 && percentVal < 100) {
      progMsg.innerHTML = `&nbsp You're almost there! &#128170`;
    }
    if (percentVal === 100) {
      progMsg.innerHTML = `&nbsp Congrats! &#127881 You completed all your goals! `;
    }
  } catch (err) {}
}


editModalClose.addEventListener("click", hideEditModal);
modalBtn.addEventListener("click", showModal);
modalClose.addEventListener("click", hideModal);
