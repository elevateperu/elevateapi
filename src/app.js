import cors from 'cors';
import express from 'express';
//import morgan from 'morgan';
import IndexRoutes from './routes/tasks.routes.js';



import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
const app = express();
app.set('port', process.env.PORT | 3000);
app.use(express.json());


const corsOptions = {};
app.use(cors(corsOptions));

//app.use(morgan('dev'));

app.use('/api', IndexRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

export default app;
