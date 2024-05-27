"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _userController = require("../controllers/user.controller.js");
var _authJwt = require("../middlewares/authJwt.js");
var _verifySignup = require("../middlewares/verifySignup.js");
var router = (0, _express.Router)();
router.post("/", [_authJwt.verifyToken, _authJwt.isAdmin, _verifySignup.checkExistingUser], _userController.createUser);
var _default = exports["default"] = router;