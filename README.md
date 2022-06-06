# Getting Started with Revolut Merchant API

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [ExpressJS](https://expressjs.com/en/starter/installing.html).

## Starting the project

First, you need to create a revolut business [sandbox account](https://sandbox-business.revolut.com/signin?rr=d8dea). From there you will take your API_KEY (profile-> Merchant API -> Production API KEY). 
Second, install the dependencies on the client side as well as on the server side.
So in your project directory run "npm install", after that cd into "Server" and run "npm install" there as well.

Make sure you also create a .env file in the "Server" folder where you will add API_KEY= "your API_Key" from your revolut or revolut-sandbox account or from your real account in case you have a Business account with Revolut.

Open 2 terminals: first for your Server folder and one in your project directory. Run "npm start" in both of them.

Enjoy placing virtual orders!


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `Short description`

When you open the project, you wil get to the Home page (Home.js Component from Components folder). Here you can add items to your cart and then click on the "Checkout" button which fires the Checkout function.The Checkout function is defined in the Checkout.js from the Components folder, even though it is not a react component.

The Checkout JS redirects you to the Card page (Payment.js component) and sends a request to the card-backend.js from the routes folder found in the Server folder. The card-backend.js adds the API_KEY from your .env file and sends the request forward to the Revolut Merchant endpoint. Upon receiving the response from the endpoint it forwards it back to the front end, in this case Checkout.js

The response contains the public_id of the order which you just created, which is being sent with useHistory React Hook  from Checkout.js to Payment.js. Here the public_id is passed to RevolutCheckout and based on the button you choose, you will make the payment either with Popup, with the created Cardfield or Revolut Pay.

The payment methods are to be found in Payment.js Component.
