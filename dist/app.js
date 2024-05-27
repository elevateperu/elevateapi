"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _tasksRoutes = _interopRequireDefault(require("./routes/tasks.routes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));
var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//import morgan from 'morgan';

var app = (0, _express["default"])();
app.set('port', process.env.PORT | 3000);
app.use(_express["default"].json());
var corsOptions = {};
app.use((0, _cors["default"])(corsOptions));

//app.use(morgan('dev'));

app.use('/api', _tasksRoutes["default"]);
app.use("/api/users", _userRoutes["default"]);
app.use("/api/auth", _authRoutes["default"]);
var _default = exports["default"] = app;