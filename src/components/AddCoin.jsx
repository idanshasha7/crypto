import React, { Component } from 'react';
import { connect } from 'react-redux';
import {coinRef} from '../firebase';
import axios from 'axios';


class AddCoin extends Component {
  constructor(props){
    super(props);
    this.state = {
      'value' : '',
      'firstAssign':'',
      'rankAssign':'',
       'coins': [],
       'coin': ''
    }
  }
  componentDidMount() {
    axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=100`)
      .then(res => {
        const coins = res.data.map(obj => obj);
        this.setState({ coins });

      });
  }
AddCoin(){
  console.log('this.state: - ', this.state.value)
  const value  = this.state.value;
  const coin  = this.state.coin;
  const firstAssign = this.state.firstAssign;
  const rankAssign = this.state.rankAssign;
  const { email } = this.props.user;
  axios.get(`https://api.coinmarketcap.com/v1/ticker/`+coin+'/')
    .then(res => {
      const restCoins = res.data.map(obj => obj);
      const firstAssign = restCoins[0].price_usd * value;
      const rankAssign =  restCoins[0].rank;


        if (value !== ''){
          coinRef.push({email, value, coin, firstAssign, rankAssign})
        }
    });

}

  render(){
    return(
      <div className="from-inline">
      <div>
      <div class="container">
        <div class="card card-login mx-auto mt-5">
          
          <div class="card-body">

            <form>

              <div class="form-group">
                <label for="exampleInputPassword1">Coin name:</label>

                <select onChange={event => this.setState({coin: event.target.value})}>
                <option key='0' ></option>
                {this.state.coins.map(coin =>
                        <option key={coin.rank} value={coin.id} >{coin.name}</option>
                    )}

              </select>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Value</label>
                <input
                  type="text"
                  placeholder="Coin Amount"
                  className="form-control"
                  style={{marginRight: '5px'}}
                  onChange={event => this.setState({value: event.target.value})}
                />

              </div>


              <button
                className="btn btn-success"
                type="button"
                onClick={() => this.AddCoin()}
                >
                Add Coin
              </button>
            </form>

          </div>
        </div>
      </div>

      </div>
        <div className="form-group">





        </div>
      </div>
    )

  }
}
function mapStateToProps(state){
  const {user} = state;
  return {
    user
  }
}


export default connect(mapStateToProps, null)(AddCoin);
