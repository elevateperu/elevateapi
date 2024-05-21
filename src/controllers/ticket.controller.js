import mercadopage, {
  MercadoPagoConfig,
  Payment,
  Preference,
  
} from 'mercadopago';
import Ticket from '../models/ticket';
import { tokenMercadoPago, urlSucces, urlPending, urlFailure, urlNotification, urlMercadoPago,urlApiMerchantOrders } from '../config'



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

    console.log(req.query, '-=-=')
  
    if(req.query.type=="payment"){

      console.log(req.query, '-=-=')
      const payment = req.query;



  
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization",`Bearer ${tokenMercadoPago}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
    const response = await fetch(
      `${urlMercadoPago}${payment["data.id"]}`,
      requestOptions,
      
    );

    const data =  await response.json();
    

   //if(data.status == 'approved'){
      fetch(`${urlApiMerchantOrders}${data.order.id}` , requestOptions)
        .then(response => response.text())
        .then(result => {
          const dtaResul = JSON.parse(result)
      
          if(dtaResul.preference_id!=null){
          console.log( dtaResul.preference_id, '*-*',data.status) 
        
        updateTicket(dtaResul.preference_id, data.status)
          }
        })
        .catch(error => console.log('error', error));
           
        //}
       

    res.sendStatus(200)
    }
    

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};
const updateTicket = async (id, status)=>{

       
  const result = await Ticket.updateOne(
    { idMercadoPago: id  },
    { status: status  }
);

console.log(result); // Verifica si la consulta se ejecutó correctamente

if (result.modifiedCount === 1) {

    const updatedTicket = await Ticket.findOne({ idMercadoPago: id});
    console.log(updatedTicket); // Documento actualizado
} else {
    console.log('No se encontró ningún ticket para actualizar o el estado ya estaba configurado como PAID');
}
    }


export const getTicketByIdMercadoPago = async (req, res) => {
  try {

    const idMercadoPago =req.body.idMercadoPago;
    console.log(idMercadoPago,'idMercadoPago')
    const ticket = await Ticket.findOne({ idMercadoPago });
    res.json(ticket);
  } catch (error) {
    console.log(error)
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
      notification_url: urlNotification,
      back_urls: {
        success: urlSucces,
        pending: urlPending,
        sfailure: urlFailure,
      },

    }
  })
    .then(mercadoPagoResponse => {
      idMercadoPago = mercadoPagoResponse.id;
      console.log(mercadoPagoResponse.id, 'id');

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
const genereTicketId = ( numberTicket:Number ) => {


    const id = crypto.randomBytes(8).toString('hex');
}
