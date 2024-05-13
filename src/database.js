import mongoose from 'mongoose';
import { mongodbURL } from './config.js';
(async () => {
  try {
    const db = await mongoose.connect(mongodbURL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }

  //const db = await mongose.connect(mongodbURL);
})();
