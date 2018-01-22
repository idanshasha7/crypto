import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { logUser } from './actions';
import reducer from './reducers';
import App from './components/App';
import AddCoin from './components/AddCoin';
import SignIn from './components/SignIn';
import Schedule from './components/Schedule';
import SignUp from './components/SignUp';
import CoinList from './components/CoinList'
import {firebaseApp} from './firebase.js';
import { Router, Route, browserHistory } from 'react-router'
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const store = createStore(reducer);
function signOut(){
  firebaseApp.auth().signOut();
}
firebaseApp.auth().onAuthStateChanged(user=>{
  if(user){
    //console.log("a user signin or up" + user);
    const { email } = user;
    store.dispatch(logUser(email));
    //history.push('/crypto');
  }else{
    //console.log(" user has signed out ot still needs to sign in");
    history.replace('/signin');
  }
})

ReactDOM.render(
<div>
      <Provider store={store}>
        <BrowserRouter  basename='/crypto'>
        <div>
          <Route  path='/signin' component={SignIn}/>
          <Route  path='/signup' component={SignUp}/>
          <Route  path='/crypto' component={App}/>
        </div>
        </BrowserRouter>
      </Provider>

</div>

  , document.getElementById('root')
)
