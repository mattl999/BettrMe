const User = require("../models/user");

function index(req, res, next) {
  // console.log(req.user)
  res.render("../views/index", {
    user: req.user,
  });
}
function create(req, res) {
  let done = 0;
  console.log("req.body--->",req.body);
  console.log("req.user--->",req.user);
  // const goal = new Goal(req.body);

  // goal.save(function (err) {

  // });
  // console.log(User.find({}))
  // User.findById({}(req.body);
  
  req.user.today.push(req.body);
  req.user.today.forEach(function (goal){ 
    if(goal.completed){
      done ++;
    }
  });
  req.user.percent = String((done / req.user.today.length).toFixed(2) * 100).concat("%");
  req.user.save(function (err) {
    res.redirect("/");
  });
}

async function toggler(req, res) {
  try {
    let done = 0;
    let user = await User.findById(req.params.user);
    let toggled = await user.today.find((goal) => goal.id === req.params.id);
    console.log("total-length",user.today.length);
    toggled.completed
      ? (toggled.completed = false)
      : (toggled.completed = true);
    user.today.forEach(function (goal){ 
      if(goal.completed){
        done ++;
      }
    });
    console.log("completed ",done )
    user.percent = String((done / user.today.length).toFixed(2) * 100).concat("%");
    user.save(function (err) {
      if (err) return console.log(err);
      return res.status(200).json({completed: toggled.completed, percent: user.percent});
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
  console.log("req.user---->",req.user)
  let done = 0;
  let user = req.user
  let idx = user.today.findIndex(function (goal) {
    return goal.id === req.params.id;
  });
  user.today.splice(idx, 1);
  user.today.forEach(function (goal){ 
    if(goal.completed){
      done ++;
    }
  });
  user.percent = String((done / user.today.length).toFixed(2) * 100).concat("%");
  if(user.percent === "NaN%"){
      user.percent = "0%";
    } 

  console.log("delete percent--->*", user.percent)
  user.save(function (err) {
    if (err) return console.log(err);
    return res.json({user: user.today, percent: user.percent});
  });
  };

async function view(req, res) {
  console.log(req.body);
  User.findById(req.body.user).exec(function (err, obj) {
    let array = obj[req.body.view];
  });
}


module.exports = {
  create,
  index,
  submitEdit,
  deleteGoal,
  view,
  toggler,
};
