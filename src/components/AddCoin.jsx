import React, { Component } from 'react';
import { connect } from 'react-redux';
import {coinRef} from '../firebase';
import axios from 'axios';
import CoinList from './CoinList'


class AddCoin extends Component {
  constructor(props){
    super(props);
    this.state = {
      'value' : '',
      'firstAssignBTC' : '',
      'bitcoinPrice': '',
      'firstAssignUSD' : '',
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
      axios.get(`https://api.coinmarketcap.com/v1/ticker/bitcoin/`)
        .then(res => {
          const bitcoinPrice = res.data.map(obj => obj);
          // console.log('bitcoinPrice',bitcoinPrice[0].price_usd);
          this.setState({ bitcoinPrice: bitcoinPrice[0].price_usd });

      });
      const binance = require('node-binance-api');
      binance.options({
      APIKEY: 'vPCVEYKqK16HcQ0Oq7cESs6IOHKXDLA7zw54qnA2VeDuN5JK3CrJ60ckBlb93ggN',
      APISECRET: '5UDkm7OBPxc5mPTfu0uy5YeeCKcraBl21J7PU2Xja73tLVb2nzKUOxtGyYSH9eD7',
      // APIKEY: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
      // APISECRET: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Credentials':true,
      useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
      test: true // If you want to use sandbox mode where orders are simulated
    });
    // binance.options({
  //     APIKEY: 'vPCVEYKqK16HcQ0Oq7cESs6IOHKXDLA7zw54qnA2VeDuN5JK3CrJ60ckBlb93ggN',
  //     APISECRET: '5UDkm7OBPxc5mPTfu0uy5YeeCKcraBl21J7PU2Xja73tLVb2nzKUOxtGyYSH9eD7',
  //   'Access-Control-Allow-Origin':  '*',
  //     useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  //     test: true
  //   });
    binance.balance((error, balances) => {
    console.log("balances()", balances);

  });

  }
  AddCoin(){
    console.log('this.state: - ', this.state.value)
    const value  = this.state.value;
    const coin  = this.state.coin;
    const firstAssign = this.state.firstAssign;
    let firstAssignBTC = this.state.firstAssignBTC;
    let firstAssignUSD = this.state.firstAssignUSD;
    const rankAssign = this.state.rankAssign;
    const { email } = this.props.user;
    // if (firstAssignBTC > 0){
    //   firstAssignUSD = parseFloat(this.state.bitcoinPrice)*
    //                             parseFloat(firstAssignBTC);
    // }else if (firstAssignUSD > 0 ){
    //   firstAssignBTC = (parseFloat(firstAssignUSD)/
    //                             (parseFloat(this.state.bitcoinPrice)));
    // }

    console.log("cash money: ", firstAssignUSD,"value btc : " ,firstAssignBTC)
    let firstAssignBTCCalc = '';
    let firstAssignUSDCalc = '';

    axios.get(`https://api.coinmarketcap.com/v1/ticker/`+coin+'/')
      .then(res => {
        const restCoins = res.data.map(obj => obj);
        const firstAssign = restCoins[0].price_usd * value;
        if ((parseFloat(firstAssignBTC) === '0' && parseFloat() ==='0')||
            (firstAssignBTC === '' && firstAssignUSD ==='')){
            firstAssignBTCCalc = parseFloat(restCoins[0].price_usd) /
                                        parseFloat(this.state.bitcoinPrice);
            firstAssignUSDCalc = parseFloat(restCoins[0].price_usd);
            this.setState({firstAssignUSD:firstAssignUSDCalc});
            this.setState({firstAssignBTC:firstAssignBTCCalc});
        }else{
            firstAssignUSDCalc = firstAssignUSD;
            firstAssignBTCCalc = firstAssignBTC;
        }
        const rankAssign =  restCoins[0].rank;
          if (value !== ''){
            console.log("btc: ", firstAssignBTC, " usd: ",firstAssignUSD )
            coinRef.push({email, value, coin, firstAssign, rankAssign,
                        firstAssignBTCCalc, firstAssignUSDCalc})
          }
      });
      //clear filed
      let first_assign_dollar = document.getElementById("first_assign_dollar");
      let first_assign_btc = document.getElementById("first_assign_btc");
      let coin_amount = document.getElementById("coin_amount");
      first_assign_dollar.value = "";
      first_assign_btc.value = "";
      coin_amount.value = "";


}
setFirstAssignBTC(firstAssignBTC){
  let fixPrice = parseFloat(this.state.bitcoinPrice) * parseFloat(firstAssignBTC);
  this.setState({firstAssignBTC:firstAssignBTC})
  this.setState({firstAssignUSD:fixPrice})
  if(firstAssignBTC ===""){
    this.setState({firstAssignUSD:0})
  }

}
setFirstAssignUSD(firstAssignUSD){
  let fixPrice = (parseFloat(firstAssignUSD)/
                            (parseFloat(this.state.bitcoinPrice)));
  console.log('fixPrice',fixPrice);
  this.setState({firstAssignBTC:fixPrice})
  this.setState({firstAssignUSD:firstAssignUSD})

  if(firstAssignUSD ===""){
    this.setState({firstAssignBTC:0})
  }
}

  render(){
    return(
      <div className="from-inline">
      <div>
      <div className="container">
        <div className="card card-login mx-auto mt-5">

          <div className="card-body">

            <form id="add_coin_form">

                <label htmlFor="exampleInputPassword1">Coin name:</label>
                <select onChange={event => this.setState({coin: event.target.value})}>
                <option key='0' ></option>
                  {this.state.coins.map(coin =>
                        <option key={coin.rank} value={coin.id} >{coin.name}</option>
                    )}
                  </select>
                <input
                  id="coin_amount"
                  type="text"
                  placeholder="Coin Amount"
                  className="form-control"
                  style={{marginRight: '5px'}}
                  onChange={event => this.setState({value: event.target.value})}
                />
                <label   style={{marginTop: '5px'}}>
                  FirstAssign by:
                </label>
                <input
                  id="first_assign_btc"
                  type="text"
                  placeholder="BTC"
                  className="form-control"
                  style={{marginRight: '5px'}}
                  value={this.state.firstAssignBTC}
                  onChange={event => this.setFirstAssignBTC(event.target.value)}
                />

                <input
                  type="text"
                  id="first_assign_dollar"
                  placeholder="USD"
                  className="form-control"
                  value={this.state.firstAssignUSD}
                  style={{marginRight: '5px',marginTop:'10px'}}
                  onChange={event => this.setFirstAssignUSD(event.target.value)}
                />





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
        <div className="form-group" style={{margin: '20px'}}>
          <CoinList />

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
