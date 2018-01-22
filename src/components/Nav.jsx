import React, { Component } from 'react';
import {connect} from 'react-redux'
import {firebaseApp} from '../firebase';
import AddCoin from './AddCoin';
import CoinList from './CoinList';
import CoinRest from './CoinRest';
import ExampleChart from './GraphCoin';
import { Link, Route, Switch } from 'react-router-dom';


class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  signOut(){
    firebaseApp.auth().signOut();
    console.log('you click signout');
    this.props.history.push('/crypto')

  }


  render(){

    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <img src="crypto/public/images/icons/generic.png" style={{width:'25px'}}/>
        <span style={{color:'#fff',marginLeft:'5px'}} >Follow your money</span>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
              <Link className="nav-link" to={'/crypto/restcoin'}
                data-target="#exampleModal">  <i className="fa fa-fw fa-dashboard"></i>
                <span className="nav-link-text">Dashboard</span></Link>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
            <Link className="nav-link" to={'/crypto/addcoin'}
              data-target="#exampleModal">  <i className="fa fa-fw fa-dashboard"></i>
              <span className="nav-link-text">Charts</span></Link>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Tables">
            <Link className="nav-link" to={'/crypto/restcoin'}
              data-target="#exampleModal">  <i className="fa fa-fw fa-dashboard"></i>
              <span className="nav-link-text">Tables</span></Link>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
            <Link className="nav-link" to={'/crypto/coinlist'}
              data-target="#exampleModal">  <i className="fa fa-fw fa-dashboard"></i>
              <span className="nav-link-text">Components</span></Link>
              <ul className="sidenav-second-level collapse" id="collapseComponents">
                <li>
                  <a href="navbar.html">Navbar</a>
                </li>
                <li>
                  <a href="cards.html">Cards</a>
                </li>
              </ul>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Example Pages">
              <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseExamplePages" data-parent="#exampleAccordion">
                <i className="fa fa-fw fa-file"></i>
                <span className="nav-link-text">Example Pages</span>
              </a>
              <ul className="sidenav-second-level collapse" id="collapseExamplePages">
                <li>
                  <a href="login.html">Login Page</a>
                </li>
                <li>
                  <a href="register.html">Registration Page</a>
                </li>
                <li>
                  <a href="forgot-password.html">Forgot Password Page</a>
                </li>
                <li>
                  <a href="blank.html">Blank Page</a>
                </li>
              </ul>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Menu Levels">
              <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti" data-parent="#exampleAccordion">
                <i className="fa fa-fw fa-sitemap"></i>
                <span className="nav-link-text">Menu Levels</span>
              </a>
              <ul className="sidenav-second-level collapse" id="collapseMulti">
                <li>
                  <a href="#">Second Level Item</a>
                </li>
                <li>
                  <a href="#">Second Level Item</a>
                </li>
                <li>
                  <a href="#">Second Level Item</a>
                </li>
                <li>
                  <a className="nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti2">Third Level</a>
                  <ul className="sidenav-third-level collapse" id="collapseMulti2">
                    <li>
                      <a href="#">Third Level Item</a>
                    </li>
                    <li>
                      <a href="#">Third Level Item</a>
                    </li>
                    <li>
                      <a href="#">Third Level Item</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Link">
              <a className="nav-link" href="#">
                <i className="fa fa-fw fa-link"></i>
                <span className="nav-link-text">Link</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav sidenav-toggler">
            <li className="nav-item">
              <a className="nav-link text-center" id="sidenavToggler">
                <i className="fa fa-fw fa-angle-left"></i>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto" style={{float:'right'}}>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-fw fa-envelope"></i>
                <span className="d-lg-none">Messages
                  <span className="badge badge-pill badge-primary">12 New</span>
                </span>
                <span className="indicator text-primary d-none d-lg-block">
                  <i className="fa fa-fw fa-circle"></i>
                </span>
              </a>
              <div className="dropdown-menu" aria-labelledby="messagesDropdown">
                <h6 className="dropdown-header">New Messages:</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <strong>David Miller</strong>
                  <span className="small float-right text-muted">11:21 AM</span>
                  <div className="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end of the box so they don't overflow over to the sides!</div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <strong>Jane Smith</strong>
                  <span className="small float-right text-muted">11:21 AM</span>
                  <div className="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!</div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <strong>John Doe</strong>
                  <span className="small float-right text-muted">11:21 AM</span>
                  <div className="dropdown-message small">I've sent the final files over to you for review. When you're able to sign off of them let me know and we can discuss distribution.</div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item small" href="#">View all messages</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-fw fa-bell"></i>
                <span className="d-lg-none">Alerts
                  <span className="badge badge-pill badge-warning">6 New</span>
                </span>
                <span className="indicator text-warning d-none d-lg-block">
                  <i className="fa fa-fw fa-circle"></i>
                </span>
              </a>
              <div className="dropdown-menu" aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">New Alerts:</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <span className="text-success">
                    <strong>
                      <i className="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                  </span>
                  <span className="small float-right text-muted">11:21 AM</span>
                  <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <span className="text-danger">
                    <strong>
                      <i className="fa fa-long-arrow-down fa-fw"></i>Status Update</strong>
                  </span>
                  <span className="small float-right text-muted">11:21 AM</span>
                  <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <span className="text-success">
                    <strong>
                      <i className="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                  </span>
                  <span className="small float-right text-muted">11:21 AM</span>
                  <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item small" href="#">View all alerts</a>
              </div>
            </li>
            <li className="nav-item">
              <form className="form-inline my-2 my-lg-0 mr-lg-2">
                <div className="input-group">
                  <input className="form-control" type="text" placeholder="Search for..."/>
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </form>
            </li>
            <li className="nav-item">

              <Link className="nav-link" to={'/crypto'}
               onClick={()=> this.signOut()}
                data-target="#exampleModal">
                Logout</Link>
            </li>
          </ul>
        </div>
      </nav>


      </div>

    )
  }
}

function mapStateToProps(state){
  // console.log('state', state);
  return {}
}

export default connect(mapStateToProps, null)(Nav);
