const User = require("../models/user");
const { DateTime } = require("luxon");

var Time = DateTime;
const quotes = [
  {
    quote: "Either you run the day or the day runs you.",
    author: "- Jim Rohn",
  },
  {
    quote:
      "Forget inspiration. Habit is more dependable. Habit will sustain you whether you're inspired or not.",
    author: "- Octavia Butler",
  },
  {
    quote:
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "- Aristotle",
  },
  {
    quote: "He who conquers himself is the mightiest warrior",
    author: "- Confucius",
  },
  {
    quote:
      "Life is like riding a bicycle. To keep your balance you must keep moving.",
    author: "- Albert Einstein",
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
      "If you don’t like the road you’re walking, start paving another one.",
    author: "- Dolly Parton",
  },
  {
    quote:
      "The chains of habit are too light to be felt until they are too heavy to be broken.",
    author: "- Warren Buffet",
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
const infos = [
  {
    info: "This app focuses on forming and solidifying new healthy habits. If you'd like to learn more about breaking bad habits, this short article might help.",
    source: "https://medium.com/@susannekrausedx/how-to-break-a-habit-in-5-steps-fa09565392af#.ngm0gyesc",
    sourceWord: "Article"
  },
  {
    info: '"Habits, for better or worse, basically define who we are"',
    source: "https://www.sciencedaily.com/releases/2011/12/111221140448.htm#:~:text=%22Habits%2C%20for%20better%20or%20worse,more%20urgent%20matters%2C%20he%20said.",
    sourceWord: "Dr. Joe Z. Tsien"
  },
  {
    info: "Habits provide mental freedom and flexibility by enabling activities to be on autopilot while the brain focuses on more urgent matters.",
    source: "",
  },
  {
    info: "Over 40% of what you do is habitual. The average person spends nearly half of their waking hours performing habitual actions.",
    source:
      "https://dornsife.usc.edu/assets/sites/208/docs/Neal.Wood.Quinn.2006.pdf",
  },
  {
    info: "It takes, on average, around 66 days to change a habit. The time it takes for each person can range from 18 to 250 days. We think that 30-days is a nice first target to aim for.",
    source: "",
  },
  {
    info: "A couple mistakes don’t erase the progress you’ve made. The only thing that erases your progress is giving up. So go into the habit-creation process with realistic expectations: You are going to miss a day or two. Or Three. Or five.",
    source: "",
  },
  {
    info: "Did you know that your brain makes up 2% of your total mass, but consumes 25% of all the oxygen you inhale? If your brain is zapped of energy, it can’t do its job as efficiently.  Increasing what you do habitually leaves more mental resources for the new challenges you encounter each day. President Obama, for example, only wears grey and blue suits, so he does not waste precious mental energy on his outfits.",
    source: "",
  },
  {
    info: "The overall consensus when it comes to habits is this: repetitions are much more important than the amount of time you perform a new behavior. The more repetitions you do, the better chance it will become a habit.",
    source: "",
  },
  {
    info: "If you believe you can achieve whatever you are setting out to achieve, your likelihood of success is much greater. So before you begin your new habit, make sure you have an underlying, strong belief that you can do it and stick to it. ",
    source: "",
  },
  {
    info: "Small changes or habits that people introduce into their routines unintentionally carry over into other aspects of their lives. ",
    source: "",
  },
  {
    info: "Actions that involve physical movement are easier to make into a habit. This ranges from going for a run every morning to waking up every morning at the same time.",
    source: "",
  },
];
let info = "";
async function index(req, res, next) {
  let user = req.user;
  let date = DateTime.now();
  const format = { ...DateTime.DATE_MED_WITH_WEEKDAY, month: "long" };
  let time = date.toLocaleString(format);
  let msg = "";
  let timeWord = "";
  let percentVal = parseInt(user.percent);
  let t = new Date();
  let h = parseInt(t.getHours());
  newTime = DateTime.now()
    .setLocale("en-US")
    .toLocaleString(DateTime.TIME_SIMPLE);

  if (h >= 4 && h < 12) {
    timeWord = " Morning";
  } else if (h >= 12 && h < 18) {
    timeWord = " Afternoon";
  } else {
    timeWord = " Evening";
  }
  if (!user.today.length) {
    msg = `&nbsp You can set new Goals by clicking the green button!`;
  } else if (percentVal === 0) {
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
    info = infos[user.totalDaysElapsed % 11];

    if (user.totalDaysElapsed - 1 === user.lastCycled) {
      if (user.percent === "100%") {
        user.streak++;
        user.percent = "0%";
      } else {
        user.streak = 0;
        user.percent = "0%";
      }
      user.yesterday = user.today;
      user.today = user.tomorrow;
      user.lastCycled = user.totalDaysElapsed;
    } else if (user.totalDaysElapsed - 1 > user.lastCycled) {
      user.streak = 0;
      user.today = user.tomorrow;
      user.yesterday = user.tomorrow;
      user.lastCycled = user.totalDaysElapsed;
    }

    if (user.displayVal === 0) {
      user.displaying = user.today;
    } else if (user.displayVal === 1) {
      user.displaying = user.tomorrow;
    } else if (user.displayVal === -1) {
      user.displaying = user.yesterday;
    }
    user.save();
  }

  res.render("../views/index", {
    user: user,
    quotes: quotes,
    time: time,
    msg: msg,
    timeWord: timeWord,
    newTime: newTime,
    info: info,
  });
}
function create(req, res) {
  let done = 0;
  req.user.today.push(req.body);
  req.user.tomorrow.push(req.body);
  if (req.user.infoStage === 0) {
    req.user.infoStage++;
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
    toggled.completed
      ? (toggled.completed = false)
      : (toggled.completed = true);
    user.today.forEach(function (goal) {
      if (goal.completed) {
        done++;
      }
    });
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
  User.findById(req.body.user).exec(function (err, user) {
    let focus = user.today.find(function (goal) {
      return goal.id === req.params.id;
    });
    let index = user.today.findIndex((goal) => goal.id === req.params.id);
    focus.activity = req.body.activity;
    user.tomorrow[index].activity = req.body.activity;
    user.save(function (err) {
      if (err) return console.log(err);
      return res.json(user.today);
    });
  });
}
async function deleteGoal(req, res) {
  let done = 0;
  let user = req.user;
  let idx = user.today.findIndex(function (goal) {
    return goal.id === req.params.id;
  });
  user.today.splice(idx, 1);``
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
  user.save(function (err) {
    if (err) return console.log(err);
    return res.json({ user: user.today, percent: user.percent });
  });
}

async function view(req, res) {
  User.findById(req.body.user).exec(function (err, obj) {
    let array = obj[req.body.view];
  });
}
async function introForm(req, res) {
  try {
    let user = await User.findById(req.params.id);
    let wakeUpTime = req.body.wakeUp.concat(":", req.body.meridian);
    let wakeUpArr = wakeUpTime.split(":");
    let meridian = wakeUpArr[2];
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
    user.name = req.body.name;
    let time = req.body.wakeUp.concat(":", req.body.meridian);
    user.initiation = DateTime.fromObject({ hour: wakeUpHour });

    let dt = DateTime.fromISO(Time.now().toISO());
    let dt2 = DateTime.fromISO(user.initiation);
    let difference = dt.diff(dt2);
    if (difference < 0) {
      user.initiation = DateTime.fromObject({ hour: wakeUpHour }).minus({
        days: 1,
      });
    }
    user.wakeUp = time;
    user.infoStage = 0;
    await user.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
}
async function changeView(req, res) {
  let user = await User.findById(req.params.id);
  let view = req.params.viewing;
  if (view === "today") {
    user.displaying = user.today;
    user.displayVal = 0;
  } else if (view === "tomorrow") {
    user.displaying = user.tomorrow;
    user.displayVal = 1;
  } else if (view === "yesterday") {
    user.displaying = user.yesterday;
    user.displayVal = -1;
  }
  user.save(function (err) {
    if (err) return console.log(err);
    return res.status(200).json({ user: user });
  });
}
async function giveDisplayVal(req, res) {
  let user = await User.findById(req.params.id);
  return res.status(200).json({ displayVal: user.displayVal });
}
async function editClicked(req, res) {
  let user = await User.findById(req.params.id);
  user.infoStage++;
  user.save();
  return res.status(200).json({ infoStage: user.infoStage });
}
async function togglerClicked(req, res) {
  let user = await User.findById(req.params.id);
  user.infoStage++;
  user.save();
  return res.status(200).json({ infoStage: user.infoStage });
}
async function streakDemo(req, res) {
  let user = await User.findById(req.params.id);
  user.streak = 15;
  user.infoStage++;
  user.save();
  return res.status(200).json({ streak: user.streak });
}

async function resetStreak(req, res) {
  let user = await User.findById(req.params.id);
  user.streak = 0;
  user.infoStage++;
  user.save();
  return res.status(200).json({ streak: user.streak });
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
