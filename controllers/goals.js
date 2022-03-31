const User = require("../models/user");
const { DateTime } = require("luxon");

var Time = DateTime;

async function index(req, res, next) {
  let user = req.user;
  if (user.wakeUp) {
    let wakeUpArr = req.user.wakeUp.split(":");
    let wakeUpHour = parseInt(wakeUpArr[0]);
    user.lastRendered = await Time.now().toISO();
    let dt = DateTime.fromISO(user.lastRendered);
    let dt2 = DateTime.fromISO(user.initiation);
    let difference = dt.diff(dt2);
    let diffMills = difference.values.milliseconds;
    // user.totalDaysElapsed = Math.floor(diffMills / 86400000);
    
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
    
    user.save();
  }
  res.render("../views/index", {
    user: user,
  });
}
function create(req, res) {
  let done = 0;
  console.log("req.body--->", req.body);
  console.log("req.user--->", req.user);
  // const goal = new Goal(req.body);

  // goal.save(function (err) {

  // });
  // console.log(User.find({}))
  // User.findById({}(req.body);

  req.user.today.push(req.body);
  req.user.tomorrow.push(req.body);
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
    user.wakeUp = time;
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

module.exports = {
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
