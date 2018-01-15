import React, { Component } from 'react';
import {connect} from 'react-redux'
import {firebaseApp} from '../firebase';
import AddCoin from './AddCoin';
import CoinList from './CoinList';
import CoinRest from './CoinRest';
import Nav from './Nav';
import ExampleChart from './GraphCoin';
import { Link, Route, Switch } from 'react-router-dom';
import {  browserHistory, Router} from 'react-router';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  signOut(){
    firebaseApp.auth().signOut();
  }


  render(){
    return (
      <div>
      <Nav/>
      <div className="content-wrapper">

        <div class="container-fluid">


        <div style={{margin:'5px'}}>


        <div className="App">
        <AddCoin />
          <CoinList />

        <div>


        </div>



         </div>

        </div>


        </div>
        </div>


      </div>

    )
  }
}

function mapStateToProps(state){
  // console.log('state', state);
  return {}
}

export default connect(mapStateToProps, null)(App);
