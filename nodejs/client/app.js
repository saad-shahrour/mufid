let url_to_head = (url) => {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script')
    script.src = url
    console.log(url);
    script.onload = function() {
      resolve()
    }
    script.onerror = function() {
      reject('Erro loading script')
    }
    document.head.appendChild(script)
  })
}

let handleClose = (event) => {
  console.log('closed');
}

let handleClick = () => {
  console.log('clicked');
}

document.addEventListener("click", handleClick)












const paypal_sdk_url = "https://www.paypal.com/sdk/js"
const client_id = "AV-cqA9YLOQH0JX6X_JY81Qu2faW0qGcyQ2Pad-g6_63UG9SiXO_kqvaFp19UbnloOlY4fYF5TqzUhry"
const currency = "USD"
const intent = "capture"
let alerts = document.getElementById("alerts")








url_to_head(paypal_sdk_url + "?client-id=" + client_id + "&enable-funding=venmo&currency=" + currency + "&intent=" + intent)
.then(() => {
  let paypal_buttons = paypal.Buttons({
    onClick: (data) => {

    },
    style: {

    },


    createOrder: function (data, actions) {
      return fetch("http://localhost:3001/create_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "intent": intent,
        })
      })
      .then(response => response.json())
      .then(order => {
        console.log(order, true)
        return order.id})
    },

    onApprove: function(data, actions) {
      console.log(data);
      let order_id = data.orderID;
      console.log(ordor_id, true);
      return fetch("http://localhost:3001/complete_order", {
        methos: "POST",
        headers: {
          "Conent-Type": "application/json",
        },
        body: JSON.stringify({
          "intent": intent,
          "order_id": order_id
        })
      })
      .then(response => response.json())
      .then(order_details => {
        console.log(order_details);
        console.log("payment is successful");
        paypal_buttons.close()
      })
      .catch(err => console.log(err))
    },

    onCancel: function (data) {
      console.log("canceled");
    },

    onError: function(err) {
      console.log(err);
    }

  })

  paypal_buttons.render('#payment_options')
}).catch(err => console.log(err))




















// window.paypal
//   .Buttons({
//     async createOrder() {
//       try {
//         const response = await fetch("/api/orders", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           // use the "body" param to optionally pass additional order information
//           // like product ids and quantities
//           body: JSON.stringify({
//             cart: [
//               {
//                 id: "123",
//                 quantity: "1",
//               },
//             ],
//           }),
//         });
        
//         const orderData = await response.json();
        
//         if (orderData.id) {
//           return orderData.id;
//         } else {
//           const errorDetail = orderData?.details?.[0];
//           const errorMessage = errorDetail
//             ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
//             : JSON.stringify(orderData);
          
//           throw new Error(errorMessage);
//         }
//       } catch (error) {
//         console.error(error);
//         resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
//       }
//     },
//     async onApprove(data, actions) {
//       try {
//         const response = await fetch(`/api/orders/${data.orderID}/capture`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
        
//         const orderData = await response.json();
//         // Three cases to handle:
//         //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
//         //   (2) Other non-recoverable errors -> Show a failure message
//         //   (3) Successful transaction -> Show confirmation or thank you message
        
//         const errorDetail = orderData?.details?.[0];
        
//         if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
//           // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
//           // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
//           return actions.restart();
//         } else if (errorDetail) {
//           // (2) Other non-recoverable errors -> Show a failure message
//           throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
//         } else if (!orderData.purchase_units) {
//           throw new Error(JSON.stringify(orderData));
//         } else {
//           // (3) Successful transaction -> Show confirmation or thank you message
//           // Or go to another URL:  actions.redirect('thank_you.html');
//           const transaction =
//             orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
//             orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
//           resultMessage(
//             `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,
//           );
//           console.log(
//             "Capture result",
//             orderData,
//             JSON.stringify(orderData, null, 2),
//           );
//         }
//       } catch (error) {
//         console.error(error);
//         resultMessage(
//           `Sorry, your transaction could not be processed...<br><br>${error}`,
//         );
//       }
//     },
//   })
//   .render("#paypal-button-container");
  
// // Example function to show a result to the user. Your site's UI library can be used instead.
// function resultMessage(message) {
//   const container = document.querySelector("#result-message");
//   container.innerHTML = message;
// }