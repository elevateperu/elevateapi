import { config } from 'dotenv';

config();

export const SECRET = "yoursecretkey";
export const mongodbURL = process.env.MONGODB_URL || '';
export const tokenMercadoPago = process.env.TOKEN_MERCADOPAGO;
export const urlSucces = process.env.URL_SUCCESS
export const urlPending = process.env.URL_PENDING
export const urlFailure = process.env.URL_FAILURE
export const urlNotification = process.env.URL_NOTIFICATION
export const urlMercadoPago = process.env.URL_API_MERCADO_PAGO
export const urlApiMerchantOrders=process.env.URL_API_MECHANT_ORDEN
export const price=process.env.PRICE
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";