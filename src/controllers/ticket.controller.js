import mercadopage, {
  MercadoPagoConfig,
  Payment,
  Preference,
} from 'mercadopago';
import Ticket from '../models/ticket';
export const createTicket = async (req, res) => {
  try {
    /*MercadoPagoConfig({
      access_token:
        'TEST-3068202673371206-051100-0454ac5dc73704d6959a5ce8c1d1fa57-1808839834',
    });*/
    const client = new MercadoPagoConfig({
      accessToken:
        'TEST-3068202673371206-051100-0454ac5dc73704d6959a5ce8c1d1fa57-1808839834',
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });

    // Step 3: Initialize the API object
    const payment = new Payment(client);
    console.log('eeee');
    try {
      const result = await mercadopage.preferences.create({
        items: [
          {
            title: 'Laptop',
            unit_price: 500,
            currency_id: 'PEN',
            quantity: 1,
          },
        ],
        notification_url: 'https://e720-190-237-16-208.sa.ngrok.io/webhook',
        back_urls: {
          success: 'http://localhost:3000/success',
          // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
          // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
        },
      });

      console.log(result);

      // res.json({ message: "Payment creted" });
      res.json(result.body);

      const newTicket = new Ticket({
        nameUser: req.body.nameUser,
        lastName: req.body.lastName,
        dni: req.body.dni,
        email: req.body.email,
        phone: req.body.phone,
        codeTransaction: req.body.codeTransaction,
        status: req.body.status,
      });

      // Saving the task in the Database
      const ticketSaved = await newTicket.save();

      // Responding to the client
      return res.json(ticketSaved);
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Something went wrong creating the Task',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};
export const findAllTicket = async (req, res) => {
  try {
    const data = await Ticket.find();
    res.json(data);
  } catch (error) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials.',
    });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query.id;

    console.log(req.query, '-**');
    console.log(payment['id'], '/**');
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${payment['id']}`,
      {
        method: 'GET',
        hearders: {
          Authorization: `Bearer TEST-3068202673371206-051100-0454ac5dc73704d6959a5ce8c1d1fa57-1808839834`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log('data', data);
    }

    /* if (payment.type === 'payment') {
      const data = await mercadopage.payment.findById(payment['data.id']);

      let paymentStatus = payment.body.status;

      console.log({ payment, paymentStatus }, '555');

      console.log(data, '-*-');

      res.json(data);
    }

    res.sendStatus(204);*/
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createOrder = async (req, res) => {
  mercadopage.configure({
    access_token:
      'TEST-3068202673371206-051100-0454ac5dc73704d6959a5ce8c1d1fa57-1808839834',
  });

  console.log('eeee');
  try {
    const result = await mercadopage.preferences.create({
      items: [
        {
          title: 'Laptop',
          unit_price: 500,
          currency_id: 'PEN',
          quantity: 1,
        },
      ],
      notification_url: 'https://e720-190-237-16-208.sa.ngrok.io/webhook',
      back_urls: {
        success: 'https://www.youtube.com/watch?v=uXe_TxNVOkI&t=643s',
        // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
        // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
      },
    });

    console.log(result);

    // res.json({ message: "Payment creted" });
    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const payment = async (req, res) => {
  const client = new MercadoPagoConfig({
    accessToken:
      'TEST-3068202673371206-051100-0454ac5dc73704d6959a5ce8c1d1fa57-1808839834',
  });

  const preference = new Preference(client);

  preference
    .create({
      body: {
        payment_methods: {
          excluded_payment_methods: [
            {
              id: 'pagoefectivo_atm',
            },
            {
              id: 'bancaInternet',
            },
          ],
          excluded_payment_types: [],
          installments: 1,
        },
        items: [
          {
            title: 'My product',
            quantity: 1,
            unit_price: 2000,
          },
        ],
      },
    })
    .then(console.log)
    .catch(console.log);
};
