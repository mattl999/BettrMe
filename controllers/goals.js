const User = require("../models/user");
const { DateTime } = require("luxon");


var Time = DateTime;
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
async function index(req, res, next) {
  let user = req.user;
  let date = DateTime.now();
  const format = {...DateTime.DATE_MED_WITH_WEEKDAY,  month: 'long' };
  let time = date.toLocaleString(format)
  let msg = ""
  let timeWord = ""
  let percentVal = parseInt(user.percent)
  let t = new Date();
  let h = parseInt(t.getHours());
  console.log("hit");
  newTime = DateTime.now()
    .setLocale("en-US")
    .toLocaleString(DateTime.TIME_SIMPLE);
    
  if (h >= 4 && h < 12) {
    timeWord= " Morning";
  } else if (h >= 12 && h < 18) {
    timeWord= " Afternoon";
  } else {
    timeWord= " Evening";
  }
  if (!user.today.length) {
    msg = `&nbsp You can set new Goals by clicking the green button!`;
  }
  else if (percentVal === 0) {
    msg = `&nbsp Time to get started on those goals!`;
  }
  if (percentVal > 0 && percentVal < 40) {
    msg = `&nbsp Great work so far! &#128079;`;
  }
  if (percentVal > 40 && percentVal < 70) {
    msg = `&nbsp Keep it up! You're doing awesome &#128526;`;
  }
  if (percentVal > 70 && percentVal < 100) {
    msg = `&nbsp You're almost there! &#128170`;
  }
  if (percentVal === 100) {
    msg = `&nbsp Congrats! &#127881 You completed all your goals! `;
  }
  if (user.wakeUp) {
    user.lastRendered = await Time.now().toISO();
    let dt = DateTime.fromISO(user.lastRendered);
    let dt2 = DateTime.fromISO(user.initiation);
    let difference = dt.diff(dt2);
    let diffMills = difference.values.milliseconds;
    user.totalDaysElapsed = Math.floor(diffMills / 86400000);
    

    console.log("suwoop", user.totalDaysElapsed)
   
    if(user.totalDaysElapsed - 1 === user.lastCycled){
      console.log("smash hit")
      if(user.percent === "100%"){
        user.streak ++;
        user.percent = "0%";
      }else{
        user.streak = 0;
        user.percent = "0%";

      }     
      user.yesterday = user.today;
      user.today = user.tomorrow;
      user.lastCycled = user.totalDaysElapsed;
    }
    else if(user.totalDaysElapsed - 1 > user.lastCycled){
      user.streak = 0;
      user.today = user.tomorrow;
      user.yesterday = user.tomorrow;
      user.lastCycled = user.totalDaysElapsed
    }

    if(user.displayVal === 0){
      user.displaying = user.today;
    }
    else if(user.displayVal === 1){
      user.displaying = user.tomorrow;
      
    }
    else if(user.displayVal === -1){
      user.displaying = user.yesterday;  
    }
    ;
    user.save();
    
  }
  
  res.render("../views/index", {
    user: user,
    quotes:quotes,
    time:time,
    msg:msg,
    timeWord: timeWord,
    newTime: newTime,
  });
}
function create(req, res) {
  let done = 0;
  console.log("req.body--->", req.body);
  console.log("req.user--->", req.user);
  req.user.today.push(req.body);
  req.user.tomorrow.push(req.body);
  if(req.user.infoStage === 0){
    req.user.infoStage ++;
  }
  req.user.today.forEach(function (goal) {
    if (goal.completed) {
      done++;
    }
  });
  req.user.percent = String(
    (done / req.user.today.length).toFixed(2) * 100
  ).concat("%");
  req.user.save(function (err) {
    res.redirect("/");
  });
}

async function toggler(req, res) {
  try {
    let done = 0;
    let user = await User.findById(req.params.user);
    let toggled = await user.today.find((goal) => goal.id === req.params.id);
    console.log("total-length", user.today.length);
    toggled.completed
      ? (toggled.completed = false)
      : (toggled.completed = true);
    user.today.forEach(function (goal) {
      if (goal.completed) {
        done++;
      }
    });
    console.log("completed ", done);
    user.percent = String((done / user.today.length).toFixed(2) * 100).concat(
      "%"
    );
    user.save(function (err) {
      if (err) return console.log(err);
      return res
        .status(200)
        .json({ completed: toggled.completed, percent: user.percent });
    });
  } catch (err) {
    console.log(err);
  }
}

async function submitEdit(req, res) {
  console.log("REQ.BODY------->", req.body);
  User.findById(req.body.user).exec(function (err, obj) {
    // console.log("obj", obj.today);
    let focus = obj.today.find(function (goal) {
      return goal.id === req.params.id;
    });
    focus.activity = req.body.activity;
    console.log(obj.today);

    obj.save(function (err) {
      if (err) return console.log(err);
      return res.json(obj.today);
    });
  });
}
async function deleteGoal(req, res) {
  console.log("req.params.id", req.params.id);
  console.log("req.body", req.body);
  console.log("req.user---->", req.user);
  let done = 0;
  let user = req.user;
  let idx = user.today.findIndex(function (goal) {
    return goal.id === req.params.id;
  });
  user.today.splice(idx, 1);
  user.today.forEach(function (goal) {
    if (goal.completed) {
      done++;
    }
  });
  user.tomorrow.splice(idx, 1);
  user.tomorrow.forEach(function (goal) {
    if (goal.completed) {
      done++;
    }
  });
  user.percent = String((done / user.today.length).toFixed(2) * 100).concat(
    "%"
  );
  if (user.percent === "NaN%") {
    user.percent = "0%";
  }

  console.log("delete percent--->*", user.percent);
  user.save(function (err) {
    if (err) return console.log(err);
    return res.json({ user: user.today, percent: user.percent });
  });
}

async function view(req, res) {
  console.log(req.body);
  User.findById(req.body.user).exec(function (err, obj) {
    let array = obj[req.body.view];
  });
}
async function introForm(req, res) {
  console.log("OMG YES");
  console.log(req.params);
  console.log(req.body);

  try {
    let user = await User.findById(req.params.id);
    let wakeUpTime = req.body.wakeUp.concat(":", req.body.meridian);
    let wakeUpArr = wakeUpTime.split(":");
    console.log(req.body);
    let meridian = wakeUpArr[2];
    console.log("meridian", meridian);
    let wakeUpHour = parseInt(wakeUpArr[0]);
    if (meridian === "pm") {
      if (!wakeUpHour === 12) {
        wakeUpHour += 12;
      }
    }
    if (meridian === "am") {
      if (wakeUpHour === 12) {
        wakeUpHour += 12;
        if (wakeUpHour === 24) {
          wakeUpHour = 0;
        }
      }
    }
    console.log("booga", wakeUpHour);

    user.name = req.body.name;

    let time = req.body.wakeUp.concat(":", req.body.meridian);
    user.initiation = DateTime.fromObject({ hour: wakeUpHour });

    let dt = DateTime.fromISO(Time.now().toISO());
    let dt2 = DateTime.fromISO(user.initiation);
    let difference = dt.diff(dt2);
    console.log(Time.now())
    console.log(user.initiation)
    if(difference < 0 ){
      user.initiation = DateTime.fromObject({ hour: wakeUpHour }).minus({ days: 1 });
    }
    user.wakeUp = time;
    user.infoStage = 0;
    await user.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
}
async function changeView(req, res){
  let user = await User.findById(req.params.id);
  let view = req.params.viewing;
  console.log("changeView hit")
  if(view === "today"){
    user.displaying = user.today;
    user.displayVal = 0
  }
  else if(view === "tomorrow"){
    user.displaying = user.tomorrow;
    user.displayVal = 1
  }
  else if(view === "yesterday"){
    user.displaying = user.yesterday;
    user.displayVal = -1

  }
  user.save(function (err) {
    if (err) return console.log(err);
    return res
      .status(200)
      .json({ user: user });
  });

}
async function giveDisplayVal(req, res){
  let user = await User.findById(req.params.id);
  return res
      .status(200)
      .json({ displayVal: user.displayVal });
}
async function editClicked(req,res){
  let user = await User.findById(req.params.id);
  console.log("badaboom",user)
  user.infoStage ++
  user.save()
  return res
      .status(200)
      .json({ infoStage: user.infoStage });
}
async function togglerClicked(req,res){
  let user = await User.findById(req.params.id);
  console.log("chumbawumba")
  user.infoStage ++
  user.save()
  return res
      .status(200)
      .json({ infoStage: user.infoStage });
}
async function streakDemo(req, res){
  let user = await User.findById(req.params.id);
  user.streak = 15
  user.infoStage ++;
  user.save()
  return res
      .status(200)
      .json({ streak: user.streak });
}

async function resetStreak(req, res){
  let user = await User.findById(req.params.id);
  user.streak = 0;
  user.infoStage ++;
  user.save()
  return res
      .status(200)
      .json({ streak: user.streak });
}
module.exports = {
  resetStreak,
  streakDemo,
  togglerClicked,
  editClicked,
  giveDisplayVal,
  changeView,
  introForm,
  create,
  index,
  submitEdit,
  deleteGoal,
  view,
  toggler,
};
