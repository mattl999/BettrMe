const User = require("../models/user");

function index(req, res, next) {
  // console.log(req.user)
  res.render("../views/index", {
    user: req.user,
  });
}
function create(req, res) {
  console.log(req.body);
  console.log(req.user);
  // const goal = new Goal(req.body);

  // goal.save(function (err) {

  // });
  // console.log(User.find({}))
  // User.findById({}(req.body);
  req.user.tomorrow.push(req.body);
  req.user.today.push(req.body);
  req.user.save(function (err) {
    res.redirect("/");
  });
}
function toggle(req, res) {
  console.log("toggle req.params.id", req.params.id);
  console.log("toggle req.user", req.user);
  function findGoal(goal) {
    return goal.id == req.params.id;
  }
  // req.user.today.findGoal()
  req.user.today.find(function (findGoal) {
    req.params.id,
      function (err, goal) {
        console.log(goal);
        res.redirect("/");
      };
  });
}
function getOne(id) {
  return skills.find((skill) => skill.id === parseInt(id));
}


// function submitEdit(req, res) {
//   console.log(req.params.id);
//   console.log("REQ.BODY------->", req.body);

//   User.findById(req.body.user).exec(function (err, obj) {
//     console.log("I need this ---->", req.params.id);
//     console.log("obj", obj.today);

//     obj.today.forEach(function (goal) {
//       console.log("to match one of these --->", goal.id);
//     });
//   });
// }
async function submitEdit(req, res) {
    console.log("REQ.BODY------->", req.body);
  User.findById(req.body.user).exec(function (err, obj) {
    console.log("I need this ---->", req.params.id);
    console.log("obj", obj.today);
    let focus = obj.today.find(function (goal){
        return goal.id === req.params.id})
    focus.activity = req.body.activity;
      console.log(obj.today);
      
      obj.save(function (err) {
      if (err) return console.log(err);
      return;
    });
    });
}
async function deleteGoal(req, res) {
  User.findById(req.body.user).exec(function (err, obj) {
    console.log("I need this ---->", req.params.id);
    console.log("obj", obj.today);
    let focus = obj.today.find(function (goal){
        return goal.id === req.params.id})
    focus.activity = '';
      console.log(obj.today);
      
      obj.save(function (err) {
      if (err) return console.log(err);
      return;
    });
    });
}
// for (var i = 0; i < obj.today.length; i++) {
//   if (obj.today.id === req.params.id) {
//     obj.splice(i, 1);}
//     console.log('hit')
// }
// console.log('delete params id',req.params.id)

// .exec(function (err, obj) {

//   let target = obj.today.find(function (goal){
//       return goal._id === req.params.id})

//         (function (err, target) {
//           console.log(target);
//         });
//       })

// };

module.exports = {
  create,
  index,
  toggle,
  submitEdit,
  deleteGoal,
};
