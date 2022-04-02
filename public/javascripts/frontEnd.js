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
const currentTime = document.getElementById("currentTime");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".author");

const quotes = [
  {
    quote:
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "- Aristotle",
  },
  {
    quote: "He who conquers himself is the mightiest warrior",
    author: "- confucius",
  },
  {
    quote:
      "Life is like riding a bicycle. To keep your balance you must keep moving.",
    author: "- Albert Einstein",
  },
  {
    quote: "Either you run the day or the day runs you.",
    author: "- Jim Rohn",
  },
  {
    quote: "Goal setting is the secret to a compelling future.",
    author: "- Tony Robbins",
  },
  {
    quote:
      "I’m a greater believer in luck, and I find the harder I work the more I have of it.",
    author: "- Thomas Jefferson",
  },
  {
    quote:
      "When we strive to become better than we are, everything around us becomes better too.",
    author: "- Paulo Coelho",
  },
  {
    quote:
      "You've got to get up every morning with determination if you're going to go to bed with satisfaction.",
    author: "- George Lorimer",
  },
  {
    quote:
      "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "- Amelia Earhart",
  },
  {
    quote: "It is never too late to be what you might have been.",
    author: "- George Eliot",
  },
  {
    quote:
      "I am not a product of my circumstances. I am a product of my decisions.",
    author: "- Stephen R. Covey",
  },
  {
    quote:
      "You cannot plow a field by turning it over in your mind. To begin, begin.",
    author: "- Gordon B. Hinckley",
  },
  {
    quote: "Inspiration does exist, but it must find you working.",
    author: "- Pablo Picasso",
  },
  {
    quote:
      "Someone's sitting in the shade today because someone planted a tree a long time ago.",
    author: "- Warren Buffet",
  },
  {
    quote: "True freedom is impossible without a mind made free by discipline.",
    author: "- Mortimer J. Adler",
  },
  {
    quote: "Set your goals high, and don’t stop till you get there.",
    author: "- Bo Jackson",
  },
  {
    quote: "If you can't yet do great things, do small things in a great way.",
    author: "- Napoleon Hill",
  },
  {
    quote:
      "I do not try to dance better than anyone else. I only try to dance better than myself.",
    author: "- Arianna Huffington",
  },
  {
    quote:
      "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.",
    author: "- Henry Ford",
  },
  {
    quote: "Ideation without execution is delusion",
    author: "- Robin Sharma",
  },
  {
    quote: "It is a rough road that leads to the heights of greatness.",
    author: "- Lucius Annaeus Seneca",
  },
  {
    quote:
      "For the great doesn’t happen through impulse alone, and is a succession of little things that are brought together.",
    author: "- Vincent van Gogh",
  },
  {
    quote: "If there is no struggle, there is no progress.",
    author: "- Frederick Douglass",
  },
  {
    quote:
      "First forget inspiration. Habit is more dependable. Habit will sustain you whether you're inspired or not. Habit will help you finish and polish your stories. Inspiration won't. Habit is persistence in practice.",
    author: "- Octavia Butler",
  },
  {
    quote:
      "If you don’t like the road you’re walking, start paving another one.",
    author: "- Dolly Parton",
  },
  {
    quote: "No one changes the world who isn’t obsessed.",
    author: "- Billie Jean King",
  },
  {
    quote:
      "Some people want it to happen, some wish it would happen, others make it happen.",
    author: "- Michael Jordan",
  },
  {
    quote:
      "Get a good idea and stay with it. Dog it, and work at it until it’s done right.",
    author: "- Walt Disney",
  },
  {
    quote: "There is nothing impossible to they who will try.",
    author: "- Alexander the Great",
  },
  {
    quote: "You are never too old to set another goal or to dream a new dream.",
    author: "- Malala Yousafzai",
  },
];
let daysElapsed = null;
var DateTime = luxon.DateTime;
let dt = DateTime.now();

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
function renderFunc(percent, displayVal, totalDaysElapsed) {
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
  console.log("tot",totalDaysElapsed)
  daysElapsed = totalDaysElapsed;
}
function renderQuote() {
  let quoteObj = quotes[daysElapsed % 30];
  console.log(daysElapsed)
  quoteText.textContent = quoteObj.quote;
  quoteAuthor.textContent = quoteObj.author;
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
  currentTime.textContent = dt
    .setLocale("en-US")
    .toLocaleString(DateTime.TIME_SIMPLE);
}
function getTimeWord() {
  let t = new Date();
  let h = parseInt(t.getHours());
  console.log("hit");
  if (h >= 4 && h < 12) {
    timeWord.textContent = " Morning";
  } else if (h >= 12 && h < 18) {
    timeWord.textContent = " Afternoon";
  } else {
    timeWord.textContent = " Evening";
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
