import { config } from 'dotenv';

config();

export const mongodbURL = process.env.MONGODB_URL || '';
export const tokenMercadoPago = process.env.TOKEN_MERCADOPAGO;
export const urlSucces = process.env.URL_SUCCESS
export const urlPending = process.env.URL_PENDING
export const urlFailure = process.env.URL_FAILURE
export const urlNotification = process.env.URL_NOTIFICATION
export const urlMercadoPago = process.env.URL_API_MERCADO_PAGO
export const urlApiMerchantOrders=process.env.URL_API_MECHANT_ORDEN