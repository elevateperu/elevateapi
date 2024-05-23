import { Router } from 'express';
import {

  createTicket,
  findAllTicket,
  receiveWebhook,
  payment,
  getTicketByIdMercadoPago, 
  validateTicket
} from '../controllers/ticket.controller';


import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";
const router = Router();
router.get('/mercadoPago', (req, res) => {
  res.send('MERCADOPAGO');
});

router.get('/hola', (req, res) => {
  res.json('saving');
});
//console.log('post');
router.post('/ticket', verifyToken, createTicket);
router.get('/', verifyToken, findAllTicket);

router.get('/success', (req, res) => res.send('Success'));
router.post('/webhook', receiveWebhook);
router.get('/getTicketByIdMercadoPago', getTicketByIdMercadoPago)
router.get('/getTicketById', validateTicket)


//router.post('/create-order', createOrder);

router.post('/order', payment);
export default router;
