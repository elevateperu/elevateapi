"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var ticketSchema = new _mongoose.Schema({
  nameUser: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  dni: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  codeTransaction: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  },
  quantity: {
    type: Number,
    require: true
  },
  price: {
    type: Number
  },
  idMercadoPago: {
    type: String
  },
  tickets: [{
    ticketId: {
      type: String
    },
    incomeStatus: {
      type: Boolean
    }
    // Cambio aquí para simplemente almacenar un String
  }]
}, {
  versionKey: false,
  timestamps: true
});
var _default = exports["default"] = (0, _mongoose.model)('Ticket', ticketSchema);