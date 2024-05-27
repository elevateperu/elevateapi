"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlSucces = exports.urlPending = exports.urlNotification = exports.urlMercadoPago = exports.urlFailure = exports.urlApiMerchantOrders = exports.tokenMercadoPago = exports.price = exports.mongodbURL = exports.SECRET = exports.ADMIN_USERNAME = exports.ADMIN_PASSWORD = exports.ADMIN_EMAIL = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var SECRET = exports.SECRET = "yoursecretkey";
var mongodbURL = exports.mongodbURL = process.env.MONGODB_URL || '';
var tokenMercadoPago = exports.tokenMercadoPago = process.env.TOKEN_MERCADOPAGO;
var urlSucces = exports.urlSucces = process.env.URL_SUCCESS;
var urlPending = exports.urlPending = process.env.URL_PENDING;
var urlFailure = exports.urlFailure = process.env.URL_FAILURE;
var urlNotification = exports.urlNotification = process.env.URL_NOTIFICATION;
var urlMercadoPago = exports.urlMercadoPago = process.env.URL_API_MERCADO_PAGO;
var urlApiMerchantOrders = exports.urlApiMerchantOrders = process.env.URL_API_MECHANT_ORDEN;
var price = exports.price = process.env.PRICE;
var ADMIN_EMAIL = exports.ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
var ADMIN_USERNAME = exports.ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
var ADMIN_PASSWORD = exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";