import cors from 'cors';
import express from 'express';
//import morgan from 'morgan';
import IndexRoutes from './routes/tasks.routes.js';
const app = express();
app.set('port', process.env.PORT | 3000);
app.use(express.json());
/*app.post('/', (req, res) => {
  const newTicket = new Ticket({
    nameUser: req.body.nameUser,
    lastName: req.body.lastName,
    dni: req.body.dni,
    email: req.body.email,
    phone: req.body.phone,
    codeTransaction: req.body.codeTransaction,
    status: req.body.status,
  });

  console.log(newTicket);
  res.json('saving');
});*/
const corsOptions = {};
app.use(cors(corsOptions));

//app.use(morgan('dev'));

app.use('/api', IndexRoutes);

export default app;
