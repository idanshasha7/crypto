import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { logUser } from './actions';
import reducer from './reducers';
import App from './components/App';
import AddCoin from './components/AddCoin';
import Schedule from './components/Schedule';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CoinList from './components/CoinList'
import {firebaseApp} from './firebase.js';
import { Router, Route, browserHistory } from 'react-router'
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { withRouter } from 'react-router-dom'

const history = createHistory();
const store = createStore(reducer);
const SignInB = withRouter(SignIn)

function signOut(){
  firebaseApp.auth().signOut();
}
firebaseApp.auth().onAuthStateChanged(user=>{
  if(user){
    //console.log("a user signin or up" + user);
    const { email } = user;
    store.dispatch(logUser(email));
    console.log('hi you are user!')
    history.push('/crypto');
  }else{
    //console.log(" user has signed out ot still needs to sign in");
    // history.push('/crypto/signin');
    // console.log(process.env)
    history.push('/registeration/signin');
    console.log('hi you are not user!')


  }
})

ReactDOM.render(
<div>
      <Provider store={store}>
        <Router  history={history}>
        <div>
          <Route  path='/registeration/signin' component={SignIn}/>


          <Route  path='/registeration/signup' component={SignUp}/>
          <Route  path='/crypto' component={App} />

        </div>
        </Router>
      </Provider>

</div>

  , document.getElementById('root')
)
