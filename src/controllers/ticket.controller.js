import mercadopage, {
  MercadoPagoConfig,
  Payment,
  Preference,
  
} from 'mercadopago';
import Ticket from '../models/ticket';
import { tokenMercadoPago, urlSucces, urlPending, urlFailure, urlNotification, urlMercadoPago,urlApiMerchantOrders , price} from '../config'
import crypto from 'crypto';

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


    if(req.query.type=="payment"){

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



if (result.modifiedCount === 1) {

    const updatedTicket = await Ticket.findOne({ idMercadoPago: id});
    console.log(updatedTicket); // Documento actualizado
} else {
    console.log('No se encontró ningún ticket para actualizar o el estado ya estaba configurado como PAID');
}
    }


export const getTicketByIdMercadoPago = async (req, res) => {
  try {

    console.log(req.parms.id, '/ooo')
    const idMercadoPago =req.query.id;
  
    const ticket = await Ticket.findOne({ _id:idMercadoPago });
    console.log(ticket)

    if(ticket.tickets.length <= 0){
        const countTickets = genereTicketId(ticket.quantity);

        const result = await Ticket.updateOne(
          { idMercadoPago: ticket.idMercadoPago  },
          { tickets: countTickets  });

          const updatedTicket = await Ticket.findOne({ idMercadoPago: ticket.idMercadoPago});
          console.log(updatedTicket, '////')
         return  res.json(updatedTicket);
    }
  else{
    return res.json(ticket);

  }



   
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
        success: `${urlSucces}=`,
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
  const titleConcert = "Priscilla Bueno Tour 2024 - Lima, Perú";
  let idMercadoPago = 0;

  const newTicket = new Ticket({
    nameUser: req.body.nameUser,
    lastName: req.body.lastName,
    dni: req.body.dni,
    email: req.body.email,
    phone: req.body.phone,
    status: "PENDING",
    quantity: req.body.quantity,
    price: price, //req.body.price,
    idMercadoPago: idMercadoPago
  });

   newTicket.save();  

  console.log( newTicket._id.toString(), '=====----===--')
const idTicket = newTicket._id.toString()
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
        success: `${urlSucces}=${idTicket}`,
        pending: urlPending,
        sfailure: urlFailure,
      },

    }
  })
    .then(async (mercadoPagoResponse) => {
      idMercadoPago = mercadoPagoResponse.id;
      console.log(mercadoPagoResponse, '---=')
      if(mercadoPagoResponse.id != ''){
        const result = await Ticket.updateOne(
          { _id: idTicket },
          { $set: { idMercadoPago: idMercadoPago } }
      );
          
      console.log(result.nModified , 'nModified')
          const updatedTicket =  await   Ticket.findById(idTicket); //Ticket.findOne({ _id : idTicket});   
          console.log(updatedTicket, 'updatedTicket====') 
          res.json(updatedTicket);  
      }
else{
  res.status(500).json({ error: "Internal Server Error" });
}
    //  res.json(newTicket)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });

  
};
const updateTicketMercadoPagoId = async ( idMercadoPago,idTicket )=>{
 
  
}
export const failure = async (req, res) => {
  console.error('Internal Server Error:', error);
  res.status(500).json({
    error: true,
    status: 500,
    message: "Internal Server Error"
  });
}
const genereTicketId = ( numberTicket ) => {

  console.log(numberTicket,'numberTicket')
  let tickets = [];
  for (let i = 1; i <= numberTicket; i++) {
      const id = crypto.randomBytes(8).toString('hex');
      tickets.push({ ticketId: id ,incomeStatus:false });  
      //tickets.push({ [`ticket${i}`]: id });
  }
  console.log(tickets,'========/////===')
  return tickets;
}

export const validateTicket = async (req, res) => {
  try {
    const ticketId = req.body.id;  // Recibiendo el ticket ID del cuerpo de la solicitud
    console.log(ticketId, 'Received Ticket ID');

    // Realizar la búsqueda del ticket en la base de datos
    const result = await Ticket.findOne({ 'tickets.ticketId': ticketId });
    console.log(result, 'Search Result');

    // Verificar si se encontró algún resultado
    if (result) {
        return res.status(200).json({ message: "Ticket válido." });
    } else {
        return res.status(404).json({ message: "Ticket no válido." });
    }
  }
  catch{

  }
}
