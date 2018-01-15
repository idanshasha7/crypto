import React from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import axios from 'axios';

class CoinRest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restCoins: []
    };
  }

  componentDidMount() {
    axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=30`)
      .then(res => {
        const restCoins = res.data.map(obj => obj);
        this.setState({ restCoins });
        //this.props.restCoins(restCoins);
      });
  }


  render() {
    let coin ='';
    return (
      <div className="table-responsive" style={{maxWidth: '500px'}}>
        <h5>Coin value by CoinMarketCap </h5>
        <table style={{textAlign: 'left'}} className="table table-striped">
        <tbody>
        <tr>
            <td>
              Coin
            </td>
            <td>
              Price
            </td>
            <td>
              Change 7 day ago
            </td>
        </tr>

        {this.state.restCoins.map(coin =>
            <tr key={coin.rank}>
                <td>
                <img src={coin.name ? "../images/icons/" + coin.name + ".png"
                                    : "../images/icons/generic.png" }
                                    style={{width: '20px',marginRight:'3px'}}/>
                  {coin.name}
                </td>
                <td>
                <strong> {coin.price_usd}$</strong>
                </td>

                <td>
                  {coin.percent_change_7d}%
                </td>
            </tr>
            )}
            </tbody>
        </table>





      </div>
    );
  }
}

function mapStateToProps(state){
  const { restCoins } = state;
  return{
    restCoins
  }
}

export default connect(mapStateToProps,null)(CoinRest);

//export default CoinRest;
