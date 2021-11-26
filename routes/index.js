var express = require("express");
var router = express.Router();
const passport = require("passport");
const goalCtrl = require("../controllers/goals");

/* GET home page. */
router.get("/", isLoggedIn, goalCtrl.index);

//functionality Routes

router.post("/", goalCtrl.create);
router.put('/:id', goalCtrl.toggle);
router.put('/goals/:id',goalCtrl.submitEdit)
router.delete('/goals/:id',goalCtrl.deleteGoal)
router.put('/goals/toggle/:id',goalCtrl.toggle)
// router.get('/goals/view/:id', goalCtrl.view)

//Oauth Routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  
// router.post('/toggle', goalCtrl.toggle);

  function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.render('../views/login');;
  }
module.exports = router;
