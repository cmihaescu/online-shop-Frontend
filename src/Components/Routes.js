import React from 'react'
import Home from './Home'
import PaymentSandbox from './PaymentSandbox'
import PaymentLive from './PaymentLive';
import {
    Switch,
    Route
  } from "react-router-dom";

function Routes() {
    return (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path='/cardSandbox'>
            <PaymentSandbox />
          </Route>
          <Route path='/cardLive'>
            <PaymentLive />
          </Route>     
          <Route path='/*'>
            <div> Path not found</div>
          </Route>
        </Switch>
    )   
}

export default Routes