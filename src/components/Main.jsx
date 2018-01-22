import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Schedule0 from './Schedule0'
import Schedule from './Schedule'
import AddCoin from './AddCoin'
import CoinRest from './CoinRest'
import CoinList from './CoinList'
import SignIn from './SignIn'
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/crypto' component={AddCoin}/>
      <Route path='/crypto/AddCoin' component={AddCoin}/>
      <Route path='/crypto/CoinRest' component={CoinRest}/>
      <Route path='/crypto/CoinList' component={CoinList}/>
      <Route  component={CoinRest}/>
    </Switch>
  </main>
)

export default Main
