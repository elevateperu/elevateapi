"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _authController = require("../controllers/auth.controller.js");
var _verifySignup = require("../middlewares/verifySignup.js");
var router = (0, _express.Router)();
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});
router.post("/signup", [_verifySignup.checkExistingUser, _verifySignup.checkExistingRole], _authController.signupHandler);
router.post("/signin", _authController.signinHandler);
var _default = exports["default"] = router;