import { config } from 'dotenv';

config();

export const mongodbURL = process.env.MONGODB_URL || '';
