import mercadopage, {
  MercadoPagoConfig,
  Payment,
  Preference,
} from 'mercadopago';
import Ticket from '../models/ticket';
import { tokenMercadoPago, urlSucces, urlPending, urlFailure, urlNotification, urlMercadoPago } from '../config'



export const createTicket = async (req, res) => {
  try {

    const newTicket = new Ticket({
      nameUser: req.body.nameUser,
      lastName: req.body.lastName,
      dni: req.body.dni,
      email: req.body.email,
      phone: req.body.phone,
      codeTransaction: req.body.codeTransaction,
      status: req.body.status,
    });

    const ticketSaved = await newTicket.save();
    return res.json(ticketSaved);

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
    console.log(req.query, '-=-=', payment)
    const response = await fetch(
      `${urlMercadoPago}${payment}`,
      {
        method: 'GET',
        hearders: {
          Authorization: `Bearer ${tokenMercadoPago}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log('data', data);
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createOrder = async (req, res) => {
  mercadopage.configure({
    access_token:
      tokenMercadoPago,
  });


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
      notification_url: urlNotification,
      back_urls: {
        success: urlSucces,
        pending: urlPending,
        failure: urlFailure,
      },
    });



    console.log(result);
    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};
export const payment = async (req, res) => {
  const client = new MercadoPagoConfig({
    accessToken: tokenMercadoPago,
  });

  const preference = new Preference(client);
  const titleConcert = "conciertoelevateperu";
  let idMercadoPago = 0;

  preference.create({
    body: {
      payment_methods: {
        excluded_payment_methods: [
          { id: 'pagoefectivo_atm' },
          { id: 'bancaInternet' },
        ],
        excluded_payment_types: [],
        installments: 1,
      },
      items: [
        {
          title: titleConcert,
          quantity: req.body.quantity,
          unit_price: req.body.price,
        },
      ],
      auto_return:"approved",
      notification_url: `https://6a8f-38-25-22-82.ngrok-free.app/api/webhook`,
      back_urls: {
        success: `https://www.mercadopago.com.pe/developers/es/docs/checkout-api/integration-test/test-cards`,
       // pending: urlPending,
        //sfailure: urlFailure,
      },

    }
  })
    .then(mercadoPagoResponse => {
      idMercadoPago = mercadoPagoResponse.id;
      console.log(mercadoPagoResponse, 'id');

      console.log("/*********************************/");
     console.log(mercadoPagoResponse.sandbox_init_point)
      const newTicket = new Ticket({
        nameUser: req.body.nameUser,
        lastName: req.body.lastName,
        dni: req.body.dni,
        email: req.body.email,
        phone: req.body.phone,
        status: "PENDING",
        quantity: req.body.quantity,
        price: req.body.price,
        idMercadoPago: idMercadoPago
      });

      return newTicket.save();  // Return the promise for proper chaining
    })
    .then(ticketSaved => {
      res.json(ticketSaved);  // Send the response here after saving
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

export const failure = async (req, res) => {
  console.error('Internal Server Error:', error);
  res.status(500).json({
    error: true,
    status: 500,
    message: "Internal Server Error"
  });
}
