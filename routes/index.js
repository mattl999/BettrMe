var express = require("express");
var router = express.Router();
const passport = require("passport");
const goalCtrl = require("../controllers/goals");

// GET home page.
router.get("/", isLoggedIn, goalCtrl.index);

//CRUD Routes
router.post("/",isLoggedIn, goalCtrl.create);
router.put('/goals/:id',isLoggedIn,goalCtrl.submitEdit)
router.delete('/goals/:id',isLoggedIn,goalCtrl.deleteGoal)
router.put('/goals/toggle/:id/:user',isLoggedIn,goalCtrl.toggler)
router.put('/intro/:id',isLoggedIn, goalCtrl.introForm)
router.put('/change/:viewing/:id',isLoggedIn, goalCtrl.changeView)
router.get('/getDisplayVal/:id',isLoggedIn, goalCtrl.giveDisplayVal)
router.put('/editClicked/:id',isLoggedIn,goalCtrl.editClicked)
router.put('/togglerClicked/:id',isLoggedIn,goalCtrl.togglerClicked)
router.put('/streakDemo/:id',isLoggedIn,goalCtrl.streakDemo)
router.put('/resetStreak/:id',isLoggedIn,goalCtrl.resetStreak)

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
