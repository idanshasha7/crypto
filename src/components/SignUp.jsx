import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {firebaseApp} from '../firebase';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }
  
  signUp(){
    console.log('this.state',this.state);
    const {email, password} = this.state
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .catch(error=>{
      console.log('error', error);
      this.setState({error});
    })
    if(this.state.error.message === ""){
      this.props.history.push('/crypto')
    }
  }

  render(){

    return (
      <div>
       <div className="bg-dark" >
       <div className="container">
         <div className="card card-register mx-auto mt-5">
           <div className="card-header">Register an Account</div>
           <div className="card-body">
           <form>
               <div className="form-group">
                 <label >Email address</label>
                 <input
                   className="form-control"
                   type="text"
                   placeholder="Email"
                   onChange={event => this.setState({email: event.target.value})}
                   />
               </div>
               <div className="form-group">
                     <label >Password</label>
                     <input
                       className="form-control"
                       type="password"
                       placeholder="Password"
                       onChange={event => this.setState({password: event.target.value})}
                       />
               </div>
               <button
                   className="btn btn-primary"
                   type="button"
                   onClick={()=> this.signUp()}
                   >
                     SignUp
               </button>
             </form>
             <div className="text-center">
                <Link className="d-block small mt-3" to={'/signin'}> Already a user? Sign in </Link>
                <div style={{color:'red'}}>{this.state.error.message}</div>
             </div>
           </div>
         </div>
       </div>
      </div>
      </div>
    )
  }
}



export default SignUp
