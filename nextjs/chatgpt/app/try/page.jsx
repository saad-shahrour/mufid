"use client"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
    function createOrder(value) {
        return fetch("http://localhost:3001/create_order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                'intent': 'capture',
                'purchase_units': [{
                    'amount': {
                    'currency_code': 'USD',
                    'value': value
                    }
                }]     
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    }
    function onApprove(data) {
          return fetch("http://localhost:3001/complete_order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          })
          .then((response) => response.json())
          .then((orderData) => {
                const name = orderData.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
          });

        }
    
    return (
        <div style={{width: "80px"}}>

        <PayPalScriptProvider options={{ clientId: "AV-cqA9YLOQH0JX6X_JY81Qu2faW0qGcyQ2Pad-g6_63UG9SiXO_kqvaFp19UbnloOlY4fYF5TqzUhry" }}>
            <PayPalButtons
                createOrder={createOrder("59")}
                onApprove={onApprove}
                />
        </PayPalScriptProvider>
        </div>
    );
}