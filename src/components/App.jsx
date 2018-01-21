import React from 'react'
import Main from './Main'
import Nav from './Nav'
import {connect} from 'react-redux'

const App = () => (
  <div>
    <Nav />
    <div className="content-wrapper">
      <Main />
    </div>

  </div>
)


function mapStateToProps(state){
  // console.log('state', state);
  return {}
}

export default connect(mapStateToProps, null)(App);
