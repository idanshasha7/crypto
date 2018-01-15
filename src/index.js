import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { logUser } from './actions';
import reducer from './reducers';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CoinList from './components/CoinList'
import {firebaseApp} from './firebase.js';
import { Router, Route, browserHistory } from 'react-router'
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducer);
function signOut(){
  firebaseApp.auth().signOut();
}
firebaseApp.auth().onAuthStateChanged(user=>{
  if(user){
    //console.log("a user signin or up" + user);
    const { email } = user;
    store.dispatch(logUser(email));
    browserHistory.push('/crypto');
  }else{
    //console.log(" user has signed out ot still needs to sign in");
    browserHistory.replace('/signin');
  }
})

ReactDOM.render(


      <Provider store={store}>
        <Router path="/crypto" history={browserHistory} >
            <Route path="/crypto" component={App} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </Router>
      </Provider>



  , document.getElementById('root')
)
