import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import RevolutCheckout from "@revolut/checkout";
import RevolutCheckoutLoader from "@revolut/checkout";
import UpdateOrderLive from "./Requests/UpdateOrder";
import RetrieveOrder from "./Requests/RetrieveOrder";

const PaymentLive = () => {
  const [name, setName] = useState(null);
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState(null);
  const [billingAddress, setBillingAddress] = useState({
    countryCode: "",
    region: "",
    city: "",
    streetLine1: "",
    streetLine2: "",
    postcode: "",
  });

  console.log(billingAddress);
  const getBillingAddress = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  let history = useHistory();
  let public_id = useHistory().location.state.public_id;
  let order_id = useHistory().location.state.id;
  let sum = useHistory().location.state.order_amount.value;
  let currency = useHistory().location.state.order_amount.currency;
  let body = useHistory().location.state;
  let location = useHistory().location;

  console.log("public_id-Live", public_id);
  console.log("order_id-Live", order_id);
  console.log("amount", sum);
  console.log("body", body);

  //============PAY WITH POPUP============

  const payWithPopup = () =>
    RevolutCheckout(public_id, "prod").then(function (instance) {
      instance.payWithPopup({
        onSuccess() {
          window.alert("Thank you! Payment was succesful");
        },
        onError(message) {
          window.alert(message);
        },
        name,
        email,
        savePaymentMethodFor: "merchant",
      });
    });

  //============PAY WITH CARDFIELD============

  RevolutCheckout(public_id, "prod").then(function (instance) {
    var card = instance.createCardField({
      target: document.getElementById("card-field"),
      onSuccess() {
        setTimeout(() => {
          window.alert("Thank you! Payment completed");
        }, 1000);
      },
      onError(message) {
        window.alert(`Oh no :( ${message}`);
      },
    });

    document
      .getElementById("button-submit")
      .addEventListener("click", function () {
        card.submit({
          name,
          email,
          billingAddress,
        });
      });
  });

  //============PAY WITH REVOLUTPAY============
  React.useEffect(() => {
    RevolutCheckout(public_id, "prod").then(function (instance) {
      console.log("revolutpay function fired");
      instance.revolutPay({
        target: document.getElementById("revolut-pay"),
        phone: "+441632960022", // recommended
        buttonStyle: { variant: "light-outlined" },
        onSuccess() {
          console.log("Payment completed");
        },
        onError(error) {
          console.error("Payment failed: " + error.message);
        },
      });
    });
  }, []);

  //============PAY WITH REVOLUTPAY 2============
  // React.useEffect(() => {
  //   RevolutCheckoutLoader(public_id, "prod").then((RevolutCheckout) => {
  //     const { revolutPay } = RevolutCheckout.payments({
  //       publicToken: "pk_kIU6iOgto5T2fVasDCcDzoc8KE3ANwfPfl2Afd1vEhu9AZsa", // merchant public token
  //     });
  //     const paymentOptions = {
  //       totalAmount: sum,
  //       currency: currency, // 3-letter currency code
  //       buttonStyle: { variant: "light-outlined" },
  //       createOrder: () => ({ publicId: public_id }),
  //     };

  //     revolutPay.mount(
  //       document.getElementById("revolut-pay2.0"),
  //       paymentOptions
  //     );

  //     revolutPay.on("payment", (event) => {
  //       switch (event.type) {
  //         case "cancel": {
  //           window.alert(`User cancelled at: ${event.dropOffState}`);
  //           break;
  //         }
  //         case "success":
  //           window.alert("Payment with Revpay2 successful");
  //           break;
  //         case "error":
  //           window.alert(
  //             `Something went wrong with RevolutPay 2.0: ${event.error.toString()}`
  //           );
  //           break;
  //         default: {
  //           console.log(event);
  //         }
  //       }
  //     });
  //   });
  // }, []);


  RevolutCheckout.payments({
    locale: 'en',
    mode: "prod",// defaults to prod
    publicToken: "pk_kIU6iOgto5T2fVasDCcDzoc8KE3ANwfPfl2Afd1vEhu9AZsa" // merchant public token
}).then((paymentInstance) => {
  const paymentOptions = {
    totalAmount: sum,
    currency: currency, // 3-letter currency code
    buttonStyle: { variant: "light-outlined" },
    //SIMPLE FUNCTION METHOD

    // createOrder: () => ({ publicId: public_id }),

    //RETRIEVE ORDER METHOD
    // createOrder: async () => {
    //   const order =
    //   await fetch(`/card/retrieveOrderLive`, {
    //     method:"POST",
    //     body:JSON.stringify({order_id}),
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // })
    // .then((res) => res.json())
    // .then((data) => {return data})
    
    //   console.log("order paymentLive.js", order)
    //   return ({ publicId: order.public_id })}
      
      //CREATE ORDER METHOD
    createOrder: async () => {
      const order =
      await fetch(`/card/newOrderLive`, {
        method:"POST",
        body:JSON.stringify({amount: sum, currency}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {return data})
    
      console.log("order paymentLive.js", order)
      return ({ publicId: order.public_id })}
  
  };
  
  
  // Promise.resolve({publicId: 'sss'})

  const revolutPay = paymentInstance.revolutPay
  
  revolutPay.mount(
    document.getElementById("revolut-pay2.0"),
    paymentOptions
    );
    
    revolutPay.on("payment", (event) => {
      switch (event.type) {
        case "cancel": {
          window.alert(`User cancelled at: ${event.dropOffState}`);
          break;
        }
        case "success":
          window.alert("Payment with Revpay2 successful");
          break;
          case "error":
            window.alert(
              `Something went wrong with RevolutPay 2.0: ${event.error.toString()}`
              );
              break;
              default: {
                console.log(event);
              }
            }
          })
        })
  //============PAY WITH APPLE/GOOGLE PAY============

  const payWithRevolutApple = () => {
    // React.useEffect(() => {

    const RC = RevolutCheckout(public_id, "prod");
    const shippingOptions = [
      {
        id: "flex",
        label: "The big flex express shipping",
        amount: 1,
        description: "The shipping method faster than batman",
      },
      {
        id: "countrystrong",
        label: "Country strong shipping",
        amount: 3,
        description: "The shipping method faster than superman",
      },
    ];

    const paymentRequest = RC.paymentRequest({
      target: document.getElementById("revolut-payment-request"),
      requestShipping: true,
      shippingOptions,
      onShippingOptionChange: async (selectedShippingOption) => {
        console.log(
          "amount frontend",
          selectedShippingOption.label,
          sum + selectedShippingOption.amount
        );
        await UpdateOrderLive(
          sum + selectedShippingOption.amount,
          currency,
          order_id,
          history
        );
        // ideally compute new total price. calls can be made to a server here
        return Promise.resolve({
          status: "success",
          total: {
            amount: sum + selectedShippingOption.amount,
          },
        });
      },
      onShippingAddressChange: (selectedShippingAddress) => {
        // ideally compute new total price. calls can be made to a server here
        const newShippingOption = {
          id: "new-shipping",
          label: "The new ultra-fast method",
          amount: 5,
          description: "The shipping method faster than lightening",
        };

        return Promise.resolve({
          status: "success",
          shippingOptions: [newShippingOption, ...shippingOptions],
          total: {
            // amount: 5
            amount: sum + newShippingOption.amount,
          },
        });
      },
      onSuccess() {
        setResult("Paid");
        alert("Payment with Google/Apple pay was succesfull!");
      },
      onError(error) {
        setResult(`Error: ${error.message}`);
        alert(error);
      },
      // buttonStyle: { size: 'small', variant: 'light-outlined' },
    });

    paymentRequest.canMakePayment().then((result) => {
      if (result) {
        paymentRequest.render();
      } else {
        setResult("Not supported");
        paymentRequest.destroy();
      }
    });
  };
  // }, [])

  return (
    <div
      className="payment-live-page"
      style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}
    >
      <div>
        <Link className="pay-option-button" to="/">
          Home
        </Link>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            margin: " 10px auto",
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label></label>
            <input
              name="full_name"
              placeholder="Full Name"
              style={{ width: "100%" }}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label></label>
            <input
              name="email"
              placeholder="customer@example.com"
              style={{ width: "100%" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label></label>
            <div name="card"></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Billing Address</label>

            <input
              name="countryCode"
              placeholder="Country Code"
              onChange={getBillingAddress}
            />
            <input
              name="region"
              placeholder="Region"
              onChange={getBillingAddress}
            />
            <input
              name="city"
              placeholder="City"
              onChange={getBillingAddress}
            />
            <input
              name="streetLine1"
              placeholder="Address line 1"
              onChange={getBillingAddress}
            />
            <input
              name="streetLine2"
              placeholder="Address line 2"
              onChange={getBillingAddress}
            />
            <input
              name="postcode"
              placeholder="Postal Code"
              onChange={getBillingAddress}
            />
          </div>
        </form>
        <div
          style={{
            width: "400px",
            margin: "10px auto",
            border: "solid black 3px",
            borderRadius: "10px",
            padding: "6px",
            background: "#fff",
          }}
          id="card-field"
        ></div>
        <div
          className="payButtons"
          style={{
            margin: "10px auto",
            display: "flex",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <button className="pay-option-button" id="button-submit">
            Pay with Card
          </button>
          <button className="pay-option-button" onClick={() => payWithPopup()}>
            Pay with Popup
          </button>
          <button
            className="pay-option-button"
            onClick={() => payWithRevolutApple()}
          >
            Pay with Apple/Google Pay
          </button>
        </div>
        <div
          style={{
            width: "400px",
            margin: "10px auto",
            borderRadius: "10px",
            padding: "6px",
          }}
          id="revolut-pay"
        ></div>
        <div
          style={{
            width: "400px",
            margin: "10px auto",
            borderRadius: "10px",
            padding: "6px",
          }}
          id="revolut-pay2.0"
        ></div>
        <div
          style={{
            width: "400px",
            margin: "10px auto",
            borderRadius: "10px",
            padding: "6px",
          }}
          id="revolut-payment-request"
        ></div>
      </div>
      <div id="order-div">
        <pre>
          <strong>Order</strong>: {JSON.stringify(body, undefined, 2)}
        </pre>
        <button
          className="pay-option-button"
          onClick={() => RetrieveOrder("Live", order_id, history)}
        >
          Update Order
        </button>
      </div>
    </div>
  );
};

export default PaymentLive;
