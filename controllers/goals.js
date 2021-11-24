
const User = require("../models/user")

function index(req, res, next) {
  console.log(req.user)
  res.render("../views/index",{
    user: req.user,
   });
};
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
  req.user.save(function(err) {
    res.redirect("/");
  })
    
}
function toggle(req, res) {
console.log("hit")
}

module.exports = {
  create,
  index,
  toggle,
};
