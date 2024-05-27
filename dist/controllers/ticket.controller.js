"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateTicket = exports.receiveWebhook = exports.payment = exports.getTicketByIdMercadoPago = exports.findAllTicket = exports.failure = exports.deleteColection = exports.createTicket = exports.createOrder = void 0;
var _mercadopago = _interopRequireWildcard(require("mercadopago"));
var _ticket = _interopRequireDefault(require("../models/ticket"));
var _config = require("../config");
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var createTicket = exports.createTicket = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var countTickets, newTicket;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          countTickets = genereTicketId(req.body.quantity);
          newTicket = new _ticket["default"]({
            nameUser: req.body.nameUser,
            lastName: req.body.lastName,
            dni: req.body.dni,
            email: req.body.email,
            phone: req.body.phone,
            status: "PAGADO",
            quantity: req.body.quantity,
            price: _config.price,
            //req.body.price,
            // idMercadoPago: idMercadoPago,
            codeTransaction: req.body.codeTransaction,
            tickets: countTickets
          });
          newTicket.save();
          return _context.abrupt("return", res.json(newTicket));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            message: 'Something goes wrong'
          }));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function createTicket(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var findAllTicket = exports.findAllTicket = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _ticket["default"].find();
        case 3:
          data = _context2.sent;
          res.json(data);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send({
            message: err.message || 'Some error occurred while retrieving tutorials.'
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function findAllTicket(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var receiveWebhook = exports.receiveWebhook = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _payment, myHeaders, requestOptions, response, data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (!(req.query.type == "payment")) {
            _context3.next = 14;
            break;
          }
          _payment = req.query;
          myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer ".concat(_config.tokenMercadoPago));
          requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          _context3.next = 8;
          return fetch("".concat(_config.urlMercadoPago).concat(_payment["data.id"]), requestOptions);
        case 8:
          response = _context3.sent;
          _context3.next = 11;
          return response.json();
        case 11:
          data = _context3.sent;
          //if(data.status == 'approved'){
          fetch("".concat(_config.urlApiMerchantOrders).concat(data.order.id), requestOptions).then(function (response) {
            return response.text();
          }).then(function (result) {
            var dtaResul = JSON.parse(result);
            if (dtaResul.preference_id != null) {
              console.log(dtaResul.preference_id, '*-*', data.status);
              updateTicket(dtaResul.preference_id, data.status);
            }
          })["catch"](function (error) {
            return console.log('error', error);
          });

          //}

          res.sendStatus(200);
        case 14:
          _context3.next = 20;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: 'Something goes wrong'
          }));
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 16]]);
  }));
  return function receiveWebhook(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateTicket = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id, status) {
    var result, updatedTicket;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _ticket["default"].updateOne({
            idMercadoPago: id
          }, {
            status: status
          });
        case 2:
          result = _context4.sent;
          if (!(result.modifiedCount === 1)) {
            _context4.next = 9;
            break;
          }
          _context4.next = 6;
          return _ticket["default"].findOne({
            idMercadoPago: id
          });
        case 6:
          updatedTicket = _context4.sent;
          _context4.next = 10;
          break;
        case 9:
          console.log('No se encontró ningún ticket para actualizar o el estado ya estaba configurado como PAID');
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function updateTicket(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getTicketByIdMercadoPago = exports.getTicketByIdMercadoPago = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var idMercadoPago, ticket, countTickets, result, updatedTicket;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          console.log(req.query.id, '/ooo');
          idMercadoPago = req.query.id;
          _context5.next = 5;
          return _ticket["default"].findOne({
            _id: idMercadoPago
          });
        case 5:
          ticket = _context5.sent;
          console.log(ticket);
          if (!((ticket === null || ticket === void 0 ? void 0 : ticket.tickets.length) <= 0)) {
            _context5.next = 18;
            break;
          }
          countTickets = genereTicketId(ticket.quantity);
          _context5.next = 11;
          return _ticket["default"].updateOne({
            idMercadoPago: ticket.idMercadoPago
          }, {
            tickets: countTickets
          });
        case 11:
          result = _context5.sent;
          _context5.next = 14;
          return _ticket["default"].findOne({
            idMercadoPago: ticket.idMercadoPago
          });
        case 14:
          updatedTicket = _context5.sent;
          return _context5.abrupt("return", res.json(updatedTicket));
        case 18:
          return _context5.abrupt("return", res.json(ticket));
        case 19:
          _context5.next = 24;
          break;
        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
        case 24:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 21]]);
  }));
  return function getTicketByIdMercadoPago(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var createOrder = exports.createOrder = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _mercadopago["default"].configure({
            access_token: _config.tokenMercadoPago
          });
          _context6.prev = 1;
          _context6.next = 4;
          return _mercadopago["default"].preferences.create({
            items: [{
              title: 'Laptop',
              unit_price: 500,
              currency_id: 'PEN',
              quantity: 1
            }],
            notification_url: _config.urlNotification,
            back_urls: {
              success: "".concat(_config.urlSucces, "="),
              pending: _config.urlPending,
              failure: _config.urlFailure
            }
          });
        case 4:
          result = _context6.sent;
          console.log(result);
          res.json(result.body);
          _context6.next = 12;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", res.status(500).json({
            message: 'Something goes wrong'
          }));
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 9]]);
  }));
  return function createOrder(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var payment = exports.payment = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var client, preference, titleConcert, idMercadoPago, newTicket, idTicket;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          client = new _mercadopago.MercadoPagoConfig({
            accessToken: _config.tokenMercadoPago
          });
          console.log(client, '/////');
          preference = new _mercadopago.Preference(client);
          titleConcert = "Priscilla Bueno Tour 2024 - Lima, Perú";
          idMercadoPago = 0;
          newTicket = new _ticket["default"]({
            nameUser: req.body.nameUser,
            lastName: req.body.lastName,
            dni: req.body.dni,
            email: req.body.email,
            phone: req.body.phone,
            status: "PENDING",
            quantity: req.body.quantity,
            price: _config.price,
            //req.body.price,
            idMercadoPago: idMercadoPago
          });
          newTicket.save();
          console.log(newTicket._id.toString(), '=====----===--');
          idTicket = newTicket._id.toString();
          preference.create({
            body: {
              payment_methods: {
                excluded_payment_methods: [{
                  id: 'pagoefectivo_atm'
                }, {
                  id: 'bancaInternet'
                }],
                excluded_payment_types: [],
                installments: 1
              },
              items: [{
                title: titleConcert,
                quantity: req.body.quantity,
                unit_price: req.body.price
              }],
              auto_return: "approved",
              notification_url: _config.urlNotification,
              back_urls: {
                success: "".concat(_config.urlSucces, "=").concat(idTicket),
                pending: _config.urlPending,
                sfailure: _config.urlFailure
              }
            }
          }).then( /*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(mercadoPagoResponse) {
              var result, updatedTicket;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    idMercadoPago = mercadoPagoResponse.id;
                    console.log(mercadoPagoResponse, '---=');
                    if (!(mercadoPagoResponse.id != '')) {
                      _context7.next = 14;
                      break;
                    }
                    _context7.next = 5;
                    return _ticket["default"].updateOne({
                      _id: idTicket
                    }, {
                      $set: {
                        idMercadoPago: idMercadoPago
                      }
                    });
                  case 5:
                    result = _context7.sent;
                    console.log(result.nModified, 'nModified');
                    _context7.next = 9;
                    return _ticket["default"].findById(idTicket);
                  case 9:
                    updatedTicket = _context7.sent;
                    //Ticket.findOne({ _id : idTicket});   
                    console.log(updatedTicket, 'updatedTicket====');
                    res.json(updatedTicket);
                    _context7.next = 15;
                    break;
                  case 14:
                    res.status(500).json({
                      error: "Internal Server Error"
                    });
                  case 15:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }));
            return function (_x15) {
              return _ref8.apply(this, arguments);
            };
          }())["catch"](function (error) {
            console.log(error);
            res.status(500).json({
              error: "Internal Server Error"
            });
          });
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function payment(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var failure = exports.failure = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          console.error('Internal Server Error:', error);
          res.status(500).json({
            error: true,
            status: 500,
            message: "Internal Server Error"
          });
        case 2:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function failure(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();
var genereTicketId = function genereTicketId(numberTicket) {
  console.log(numberTicket, 'numberTicket');
  var tickets = [];
  for (var i = 1; i <= numberTicket; i++) {
    var id = _crypto["default"].randomBytes(8).toString('hex');
    tickets.push({
      ticketId: id,
      incomeStatus: false
    });
    //tickets.push({ [`ticket${i}`]: id });
  }
  console.log(tickets, '========/////===');
  return tickets;
};
var validateTicket = exports.validateTicket = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var ticketId, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          ticketId = req.body.id; // Recibiendo el ticket ID del cuerpo de la solicitud
          console.log(ticketId, 'Received Ticket ID');

          // Realizar la búsqueda del ticket en la base de datos
          _context10.next = 5;
          return _ticket["default"].findOne({
            'tickets.ticketId': ticketId
          });
        case 5:
          result = _context10.sent;
          console.log(result, 'Search Result');

          // Verificar si se encontró algún resultado
          if (!result) {
            _context10.next = 11;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            message: "Ticket válido."
          }));
        case 11:
          return _context10.abrupt("return", res.status(404).json({
            message: "Ticket no válido."
          }));
        case 12:
          _context10.next = 16;
          break;
        case 14:
          _context10.prev = 14;
          _context10.t0 = _context10["catch"](0);
        case 16:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 14]]);
  }));
  return function validateTicket(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();
var deleteColection = exports.deleteColection = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _ticket["default"].deleteMany({});
        case 2:
          result = _context11.sent;
          res.status(200).send({
            message: 'Todos los tickets han sido eliminados',
            count: result.deletedCount
          });
        case 4:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function deleteColection(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();