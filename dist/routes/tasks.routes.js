"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ticket = require("../controllers/ticket.controller");
//import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";
var router = (0, _express.Router)();
router.get('/mercadoPago', function (req, res) {
  res.send('MERCADOPAGO');
});
router.get('/hola', function (req, res) {
  res.json('saving');
});
//console.log('post');
router.post('/ticket', _ticket.createTicket);
router.get('/', _ticket.findAllTicket);
router.get('/success', function (req, res) {
  return res.send('Success');
});
router.post('/webhook', _ticket.receiveWebhook);
router.get('/getTicketByIdMercadoPago', _ticket.getTicketByIdMercadoPago);
router.get('/getTicketById', _ticket.validateTicket);

//router.get('/deleteColection',verifyToken, deleteColection)

//router.post('/create-order', createOrder);

router.post('/order', _ticket.payment);
var _default = exports["default"] = router;