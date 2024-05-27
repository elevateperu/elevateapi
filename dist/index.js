"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//import "./libs/initialSetup.js";
_app["default"].listen(_app["default"].get('port'));
console.log('server on portrr', _app["default"].get('port'));