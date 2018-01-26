import React, { Component } from 'react';
import {connect} from 'react-redux';
import {coinRef} from '../firebase';
import {setCoins} from '../actions';
import { Chart } from 'react-google-charts';
import CoinItem from './CoinItem';
import axios from 'axios';
import AnimatedNumber from 'react-animated-number';
import {createStore} from 'redux';
import { logUser } from '../actions';
import reducer from '../reducers';
import {firebaseApp} from '../firebase.js';


const store = createStore(reducer);



class CoinList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userEmail:'',
      coins: [],
      coinValue:[],
      firstAssign:0,
      firstAssignBTC:0,
      firstAssignUSD:0,
      rankAssign:0,
      options: {
        title: 'Coin Value',
        is3D: 'true'

      },

      'totalAmount':0,
      'totalAmountBTC':0
    };
  }

  componentDidMount(){
    let userEmail = ' ';
    firebaseApp.auth().onAuthStateChanged(user=>{
      if(user){

        userEmail = user.email;

      }else{
        console.log(" sorry we try to locate the user without any success");

      }
    })

    let coinValue = [];

    coinRef.on('value', snap=>{
      //console.log("we have the fucking user" + userEmail);
      let coins = [];
      let coinValue = [["Coin","Value"]];

      let firstAssign = 0;
      let firstAssignBTC = 0;
      let firstAssignUSD = 0;
      let rankAssign = 0;
      let totalAmount = 0;
      let totalAmountBTC = 0;
      snap.forEach(cryCoin=>{


      let {email, value, coin, firstAssign,
                  firstAssignBTCCalc, firstAssignUSDCalc,rankAssign} = cryCoin.val();
      firstAssign = parseInt(firstAssign);
      firstAssignUSD = parseInt(firstAssignUSDCalc);
      firstAssignBTC = parseFloat(firstAssignBTCCalc);
      rankAssign = parseInt(rankAssign);
      const serverKey = cryCoin.key;

      //get coin icon from anthor api

      if (email === userEmail){
      //get all data of coin - price,change,total etc...
        axios.get(`https://api.coinmarketcap.com/v1/ticker/`+coin+'/')
          .then(res => {
            const restCoins = res.data.map(obj => obj);
            const priceValue = restCoins[0].price_usd * value
            const percentChange7d = restCoins[0].percent_change_7d;
            const cryValue = parseInt(priceValue);
            const cryptoRank = restCoins[0].rank;
            totalAmount = totalAmount + cryValue;
            totalAmountBTC = parseFloat(totalAmountBTC) +
                                (parseFloat(value)*parseFloat(restCoins[0].price_btc));
                                
            coinValue.push([coin,priceValue]);
            // console.log(cryValue)
            console.log(parseFloat(firstAssignBTCCalc))
            coins.push({email, value, coin, serverKey,cryValue,
                        firstAssign,firstAssignUSDCalc, firstAssignBTCCalc,
                         percentChange7d,
                         rankAssign,
                        cryptoRank});

            this.setState({coins, priceValue, value,
                          totalAmount,totalAmountBTC,
                          coinValue,percentChange7d});
                          console.log("this", this.state.totalAmountBTC);
        });


        this.props.setCoins(coins);
        }
      })


    })

  }

  componentWillUnmount() {


  }
  render(){
    //console.log('-coinList-');
    return(
      <div className="table-responsive">

      <div>
      <div className="total_coin" style={{
      margin: '15px auto',
      display: 'inline-block',
      width: '150px',
      fontSize: '22px',
      color: '#fff',
      height: '150px',
      background: '#337ab7',
      lineHeight: '150px',
      fontFamily: 'Arial',
      border: '2px solid #fec108',
      textAlign: 'center',
      borderRadius: '50%'
      }}>

      <AnimatedNumber component="int" value={this.state.coins.length}
          style={{
              transition: '1.2s ease-out',
              fontSize: 28,
              fontWeight:900,
              transitionProperty:
                  'background-color, color, opacity'
          }}
          frameStyle={perc => (
              perc === 100 ? {} : {backgroundColor: ''}
          )}
          duration={1200}
          stepPrecision={0}
          />
          </div>

        <div className="total_amount" style={{
    margin: '15px auto',
    display:'inline-block',
    left: '0',
    right: '0',
    width: '150px',
    fontSize: '22px',
    color: '#fff',
    height: '150px',
    background: '#4CAF50',
    lineHeight: '150px',
    fontFamily: 'Arial',
    border: '2px solid #fec108',
    textAlign: 'center',
    borderRadius: '50%'
}}>


            <AnimatedNumber component="int" value={this.state.totalAmount}
                style={{
                    transition: '1.2s ease-out',
                    fontSize: 22,
                    fontWeight:900,
                    transitionProperty:
                        'background-color, color, opacity'
                }}
                frameStyle={perc => (
                    perc === 100 ? {} : {backgroundColor: ''}
                )}
                duration={1200}
                stepPrecision={0}
                />$
            </div>
            <div className="total_amount" style={{
        margin: '15px auto',
        display:'inline-block',
        left: '0',
        right: '0',
        width: '150px',
        fontSize: '22px',
        color: '#fff',
        height: '150px',
        background: 'rgb(254, 193, 8)',
        lineHeight: '150px',
        fontFamily: 'Arial',
        border: '2px solid #fec108',
        textAlign: 'center',
        borderRadius: '50%'
    }}>


                <AnimatedNumber component="float" value={this.state.totalAmountBTC}
                    style={{
                        transition: '1.8s ease-out',
                        fontSize: 22,
                        fontWeight:900,
                        transitionProperty:
                            'background-color, color, opacity'
                    }}
                    frameStyle={perc => (
                        perc === 100 ? {} : {backgroundColor: ''}
                    )}
                    duration={1200}
                    stepPrecision={0}
                    />
                </div>
        </div>


      <table style={{fontSize:'13px'}} className="table table-striped">
        <tbody>
          <tr style={{fontSize: '14px'},{fontWeight:'bold'}}>

            <td style={{textAlign:'left'}}>
              Coin
            </td>
            <td>
              coinToUSD
            </td>
            <td>
              firstAssign
            </td>
            <td>
              percentIncrease
            </td>
            <td>
              Value
            </td>

            <td>
              percentChange7d
            </td>
            <td>
              rank
            </td>


          </tr>
      {

        this.state.coins.map((cryCoin, index) => {
          return (

            <CoinItem key={index}
              coin={cryCoin}
              totalAmount={this.state.totalAmount}


            />


          )
        })
      }
      </tbody>
      </table>

      <Chart
        chartType="PieChart"

        data={this.state.coinValue}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"


      />
      </div>
    )
  }
}

function mapStateToProps(state){
  const { coins } = state;
  const { totalAmount } = state;
  const { user } = state;
  const { coinValue } = state;
  const {firstAssign} = state;
  const {percentChange7d} = state;

  return {
    coins,
    totalAmount,
    firstAssign,
    user
  }

}


export default connect(mapStateToProps,{setCoins})(CoinList);
