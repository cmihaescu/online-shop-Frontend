import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Checkout from "./Requests/Checkout";
import RevolutCheckout from "@revolut/checkout";

//  - pt package.json "proxy":"http://localhost:4000"
// "proxy": "https://revolut-server.herokuapp.com/"

function Home() {
  const [currency, setCurrency] = useState("USD");
  const [searchfield, setSearchfield] = useState("");
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [refreshState, setRefreshState] = useState(false);
  // const [capture, setCapture] = useState(0);
  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "RON",
    "JPY",
    "CZK",
    "AUD",
    "CAD",
    "AED",
    "CHF",
    "DKK",
    "HKD",
    "NOK",
    "NZD",
    "PLN",
    "QAR",
    "SEK",
    "SGD",
    "TRY",
    "ZAR",
  ];
  const [result, setResult] = useState(null);
  let customer_id = "16ec0824-1a78-4032-adfa-fefab834a591";

  const items = [
    { name: "Backpack", price: 150 },
    { name: "Hat", price: 0.05 },
    { name: "Jacket", price: 300 },
    { name: "Boots", price: 250 },
    { name: "Skis", price: 600 },
    { name: "Gloves", price: 10 },
    { name: "Shirt", price: 20 },
    { name: "Pants", price: 25 },
    { name: "Glasses", price: 40 },
    { name: "Snowboard", price: 500 },
  ];

  let history = useHistory();

  useEffect(() => {
    const reducer = (prevVal, currVal) => prevVal + currVal;
    setSum(cart.map((item) => item.price).reduce(reducer, 0));
  }, [cart]);

  const addToCart = (i) => {
    setCart([...cart, items[i]]);
  };

  const removeFromCart = (i) => {
    cart.splice(i, 1);
    setCart([...cart]);
  };

  //============PAY WITH APPLE/GOOGLE PAY============

  // const payWithRevolutApple = () => {
  //   const RC = RevolutCheckout("6dd2395d-1f7e-4f7e-8d87-2979304340ba", "prod");
  //   const shippingOptions = [
  //     {
  //       id: "flex",
  //       label: "The big flex express shipping",
  //       amount: 1,
  //       description: "The shipping method faster than batman",
  //     },
  //     {
  //       id: "countrystrong",
  //       label: "Country strong shipping",
  //       amount: 3,
  //       description: "The shipping method faster than superman",
  //     },
  //   ];

  //   const paymentRequest = RC.paymentRequest({
  //     target: document.getElementById("revolut-payment-request"),
  //     requestShipping: true,
  //     shippingOptions,
  //     onShippingOptionChange: (selectedShippingOption) => {
  //       // ideally compute new total price. calls can be made to a server here
  //       return Promise.resolve({
  //         status: "success",
  //         total: {
  //           amount: sum + selectedShippingOption.amount,
  //         },
  //       });
  //     },
  //     onShippingAddressChange: (selectedShippingAddress) => {
  //       // ideally compute new total price. calls can be made to a server here
  //       const newShippingOption = {
  //         id: "new-shipping",
  //         label: "The new ultra-fast method",
  //         amount: 5,
  //         description: "The shipping method faster than lightening",
  //       };

  //       return Promise.resolve({
  //         status: "success",
  //         shippingOptions: [newShippingOption, ...shippingOptions],
  //         total: {
  //           amount: 5,
  //           // amount: amount + newShippingOption.amount,
  //         },
  //       });
  //     },
  //     onSuccess() {
  //       setResult("Paid");
  //       alert("Payment with Google/Apple pay was succesfull!");
  //     },
  //     onError(error) {
  //       setResult(`Error: ${error.message}`);
  //       alert(error);
  //     },
  //     // buttonStyle: { size: 'small', variant: 'light-outlined' },
  //   });

  //   paymentRequest.canMakePayment().then((result) => {
  //     if (result) {
  //       paymentRequest.render();
  //     } else {
  //       setResult("Not supported");
  //       paymentRequest.destroy();
  //     }
  //   });
  // };

  return (
    <div className="container">
      <h1> Revolut Shop </h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
        <div className="items">
          <div className="itemsList" style={{ textAlign: "left" }}>
            <ul>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "5px",
                }}
              >
                <input
                  style={{ display: "inline-block", margin: "1em 5px 5px 5px" }}
                  placeholder="Search item"
                  onChange={(event) => {
                    setSearchfield(event.target.value);
                  }}
                ></input>
                <select
                  className="pay-option-button"
                  style={{ padding: "0px 10px" }}
                  onChange={(event) => setCurrency(event.target.value)}
                  placeholder="USD"
                >
                  {currencies.map((currency) => (
                    <option key={currency}> {currency} </option>
                  ))}
                </select>
              </li>
              {items
                .filter((item) =>
                  item.name.toLowerCase().includes(searchfield.toLowerCase())
                )
                .map((item, i) => {
                  return (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "5px",
                      }}
                    >
                      {item.name} Price:{" "}
                      {currency === "USD"
                        ? Math.round(Number(item.price))
                        : currency === "GBP"
                        ? Math.round(Number(item.price) * 0.74)
                        : currency === "EUR"
                        ? Math.round(Number(item.price) * 0.87)
                        : currency === "JPY"
                        ? Math.round(Number(item.price) * 127, 12)
                        : Math.round(Number(item.price) * 4.28)}{" "}
                      {currency}
                      <button
                        className="pay-option-button"
                        onClick={() => {
                          addToCart(i);
                        }}
                      >
                        Add to cart
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="Cart" style={{ textAlign: "center" }}>
          {cart.length > 0 ? (
            <div>
              <h2>Cart</h2>
              <ul style={{ listStyle: "none" }}>
                {cart.map((item, i) => {
                  return (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "40%",
                        margin: "0 auto",
                      }}
                    >
                      {item.name}
                      <button
                        className="pay-option-button"
                        onClick={() => removeFromCart(i)}
                        style={{ margin: "5px" }}
                      >
                        Remove from Cart
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                className="pay-option-button"
                onClick={() =>
                  Checkout(sum, currency, history, "Sandbox")
                }
              >
                {" "}
                Go to Checkout-Sandbox
              </button>
              <button
                className="pay-option-button"
                onClick={() => Checkout(sum, currency, history, "Live")}
              >
                {" "}
                Go to Checkout-Live
              </button>
              <p
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)",
                }}
              >
                Total:{" "}
                {currency === "GBP"
                  ? Math.round(sum * 0.74)
                  : currency === "EUR"
                  ? Math.round(sum * 0.87)
                  : currency === "RON"
                  ? Math.round(sum * 4.28)
                  : Math.round(sum)}{" "}
                {currency}
              </p>
              {/* <p>
                {String.fromCharCode(8211)} OR {String.fromCharCode(8211)}
              </p> */}
              {/* <button
                className="pay-option-button Gpay-button"
                onClick={() => {
                  payWithRevolutApple();
                  CheckoutLive(sum, currency, history);}}
              >
                {" "}
                <p
                  style={{display:'inline-block'}}
                  > Issue order for <span>&nbsp;</span></p>
                <img
                  style={{display:'inline-block', verticalAlign:'middle'}}
                  width="50px"
                  alt="Google Pay (GPay) Logo (2018-2020)"
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Google_Pay_%28GPay%29_Logo_%282018-2020%29.svg/512px-Google_Pay_%28GPay%29_Logo_%282018-2020%29.svg.png"
                  }
                />
              </button> */}
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
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
