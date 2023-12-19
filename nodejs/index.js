import express from "express";
import cors from 'cors';
import fetch from "node-fetch";
import "dotenv/config";
import path from "path";

console.log(true);

const port = process.env.PORT
const environment = process.env.ENVIRONMENT
const client_id = process.env.PAYPAL_ID
const client_secret = process.env.PAYPAL_SECRET
const endpoint_url = environment === 'sandbox' ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com"

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());


// host static files
app.use(express.static("client"));

  

app.post('/create_order', (req, res) => {
  console.log(req.body);
  get_access_token()
  .then(access_token => {
    let order_data_json = {
      'intent': req.body.intent.toUpperCase(),
      'purchase_units': [{
        'amount': {
          'currency_code': 'USD',
          'value': req.body.purchase_units[0].amount.value
        }
      }]
    };
    const data = JSON.stringify(order_data_json)
    fetch(endpoint_url + '/v2/checkout/orders', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      }, 
      body: data
    })
    .then(res => res.json())
    .then(json => {console.log(json, "json"); res.send(json)})
  }).catch(err => {console.log(err); res.status(500).send(err)})
})











app.post('/complete_order', (req, res) => {
  get_access_token()
  .then(access_token => {
    fetch(endpoint_url + '/v2/checkout/orders/' + req.body.order_id + '/' + req.body.intent, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      res.send(json)
    })
  })
  .catch(err => {console.log(err); res.status(500).send(err)})
})


































function get_access_token() {
  const auth = `${client_id}:${client_secret}`
  const data = 'grant_type=client_credentials'
  return fetch(endpoint_url + '/v1/oauth2/token', {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: data
  })
  .then(res => res.json())
  .then(json => {return json.access_token})
}

app.get('/', function (req, res) {
  res.sendFile(path.resolve("./client/index.html"));
  res.sendFile(path.resolve("./client/app.js"));
});

app.listen(port, () => {
  console.log('server is running on http://localhost:'+port);
})
















  
// /**
// * Create an order to start the transaction.
// * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
// */
// const createOrder = async (cart) => {
//   // use the cart information passed from the front-end to calculate the purchase unit details
//   console.log(
//     "shopping cart information passed from the frontend createOrder() callback:",
//     cart,
//   );
  
//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders`;
//   const payload = {
//     intent: "CAPTURE",
//     purchase_units: [
//       {
//         amount: {
//           currency_code: "USD",
//           value: "100.00",
//         },
//       },
//     ],
//   };
  
//   const response = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
//       // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
//       // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
//     },
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
  
//   return handleResponse(response);
// };
  
// /**
// * Capture payment for the created order to complete the transaction.
// * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
// */
// const captureOrder = async (orderID) => {
//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
//       // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
//       // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
//     },
//   });
  
//   return handleResponse(response);
// };
  
// async function handleResponse(response) {
//   try {
//     const jsonResponse = await response.json();
//     return {
//       jsonResponse,
//       httpStatusCode: response.status,
//     };
//   } catch (err) {
//     const errorMessage = await response.text();
//     throw new Error(errorMessage);
//   }
// }
  
// app.post("/api/orders", async (req, res) => {
//   try {
//     // use the cart information passed from the front-end to calculate the order amount detals
//     const { cart } = req.body;
//     const { jsonResponse, httpStatusCode } = await createOrder(cart);
//     res.status(httpStatusCode).json(jsonResponse);
//   } catch (error) {
//     console.error("Failed to create order:", error);
//     res.status(500).json({ error: "Failed to create order." });
//   }
// });
  
// app.post("/api/orders/:orderID/capture", async (req, res) => {
//   try {
//     const { orderID } = req.params;
//     const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
//     res.status(httpStatusCode).json(jsonResponse);
//   } catch (error) {
//     console.error("Failed to create order:", error);
//     res.status(500).json({ error: "Failed to capture order." });
//   }
// });
  
// // serve index.html
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve("./client/checkout.html"));
// });
  
// app.listen(PORT, () => {
//   console.log(`Node server listening at http://localhost:${PORT}/`);
// });