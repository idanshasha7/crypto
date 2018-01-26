import React, { Component } from 'react';
import { connect } from 'react-redux';
import { coinRef} from '../firebase';
import { Chart } from 'react-google-charts';




class CoinItem extends Component {
  removeCoin(){

    const { email } = this.props.user;
    const { value , serverKey } = this.props.coin;

    coinRef.child(serverKey).remove();
  }
  getpercentIncrease(firstAssign, cryValue){
    let percentIncrease =  (parseFloat(cryValue)-parseFloat(firstAssign))/
                            ((parseFloat(cryValue)+parseFloat(firstAssign))/2)
                            *100;
    if (isNaN(percentIncrease)||(percentIncrease == Infinity)){
      percentIncrease = 0;
    }else{
      percentIncrease = percentIncrease.toFixed(2);
    }
    return percentIncrease;
  }




  render(){
    let {firstAssign,firstAssignBTCCalc, firstAssignUSDCalc, email, value, coin,
          cryValue, percentChange7d, cryptoRank, rankAssign} = this.props.coin;
    let percentIncreaseTd = null;
    let percentChange7dTd = null;
    // console.log(this.props.coin)
    firstAssignUSDCalc = parseInt(firstAssignUSDCalc);
    let coinIcom = '/public/images/icons/'+coin +'.png';
    const {totalAmount} = this.props.totalAmount;
    //let {firstAssign} = this.props.firstAssign;
    let percentIncrease = this.getpercentIncrease(firstAssignUSDCalc,cryValue);
    if (percentIncrease > 0) {
      percentIncreaseTd =   <td style={{color: 'green'}}> {percentIncrease}% </td>;
    } else {
      percentIncreaseTd = <td style={{color: 'red'}}> {percentIncrease}% </td>;
    }
    if (percentChange7d > 0) {
      percentChange7dTd =   <td style={{color: 'green'}}> {percentChange7d}% </td>;
    } else {
      percentChange7dTd = <td style={{color: 'red'}}> {percentChange7d}% </td>;
    }

    //console.log('----- coinItem call me ! ');
     //console.log('---coinItem---',this.props.coin);
    //  console.log('coin object', cryptoRank);



    return (

          <tr>
            <td style={{textAlign: 'left', whiteSpace: 'nowrap'}}>

            <img src={coinIcom ? coinIcom : "crypto/public/images/icons/generic.png" }
                  style={{width: '20px',marginRight:'3px'}}/>

               <strong>{coin}</strong>
            </td>
            <td>
              {cryValue}$
            </td>
            <td>
              {firstAssignUSDCalc}$ / {firstAssignBTCCalc}
            </td>
            {percentIncreaseTd}
            <td>
              {value}
            </td>
            {percentChange7dTd}
            <td style={{ whiteSpace: 'nowrap'}}>
              {rankAssign} -> {cryptoRank}
            </td>
            <td>
            <button className="btn btn-sm btn-primary"
                    onClick={()=> this.removeCoin()}>
              Remove
            </button>
            </td>
        </tr>
        // <strong>Value : {title} </strong>
        // <strong>Coin : {coin} </strong>
        // <strong>, coinToUSD : {cryValue}$ </strong>

        // <span style={{marginRigt:'5px'}}> submitted by <em>{email} </em></span>






    )
  }
}



function mapStateToProps(state){
  const { user } = state;
  return{
    user
  }
}

export default connect(mapStateToProps,null)(CoinItem);
