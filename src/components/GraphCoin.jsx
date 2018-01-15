import React from 'react';
import { Chart } from 'react-google-charts';
import {connect} from 'react-redux';

class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {
            // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper

        },
      },
    ];

    this.state = {
      coinsGraph: [],
      valueCoin: [],
      options: {
        title: 'Age vs. Weight comparison',
        hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      rows: [
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7],
      ],
      columns: [
        {
          type: 'number',
          label: 'Age',
        },
        {
          type: 'number',
          label: 'Weight',
        },
      ],
    };
    this.props.coins.map((cryCoin, index) => {
        //coinsGraph.push({cryCoin.coin});
        //valueCoin.push({cryCoin.title});
        //this.setState({coinsGraph});
        //this.setState({valueCoin});
    })

  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.coins !== this.state.coins) {
      this.setState({ coins: nextProps.coins });

    }
  }
  render() {
    //console.log('graph -- ', this.props.coins)
    return (

      <div>
      {
        this.props.coins.map((cryCoin, index) => {
          return (

            <Chart
                chartType="ScatterChart"
              rows={cryCoin.coin}
              columns={cryCoin.title}
              options={this.state.options}
              graph_id="ScatterChart"
              width="100%"
              height="400px"
              chartEvents={this.chartEvents}
            />


          )
        })
      }


      </div>



    );
  }
}


function mapStateToProps(state){
  const { coins } = state;
  const { user } = state;
  return {
    coins,
    user
  }

}
export default connect(mapStateToProps,null)(ExampleChart);
