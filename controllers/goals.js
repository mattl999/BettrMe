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

async function toggle(req, res) {
  console.log("REQ.BODY------->", req.body);
  User.findById(req.body.user).exec(function (err, obj) {
    
    // console.log("obj", obj.today);
    let focus = obj.today.find(function (goal){
        return goal.id === req.params.id})
    if(focus.completed){
      focus.completed = false;
    } 
    else{
      focus.completed = true;
    }
      console.log(obj.today);
      
      obj.save(function (err) {
      if (err) return console.log(err);
      return res.json(obj.today);
    });
    });
}
async function submitEdit(req, res) {
    console.log("REQ.BODY------->", req.body);
  User.findById(req.body.user).exec(function (err, obj) {
    
    // console.log("obj", obj.today);
    let focus = obj.today.find(function (goal){
        return goal.id === req.params.id})
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
  User.findById(req.body.user).exec(function (err, obj) {
    
    
    let idx = obj.today.findIndex(function(goal){
      return goal.id === req.params.id
    })
      obj.today.splice(idx,1);
      
      obj.save(function (err) {
      if (err) return console.log(err);
      return res.json(obj.today);
    });
    });
}
async function view (req, res){
  console.log(req.body)
  User.findById(req.body.user).exec(function (err, obj){
      let array = obj[req.body.view]
  })
  
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
  view
};
