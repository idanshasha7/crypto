import React, { Component } from 'react';
import { Link } from 'react-router';

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
  }

  render(){
    return (

       <div className="bg-dark" >
       <div class="container">
         <div class="card card-register mx-auto mt-5">
           <div class="card-header">Register an Account</div>
           <div class="card-body">
           <form>
               <div class="form-group">
                 <label for="exampleInputEmail1">Email address</label>
                 <input
                   className="form-control"
                   type="text"
                   placeholder="Email"
                   onChange={event => this.setState({email: event.target.value})}
                   />
               </div>
               <div class="form-group">
                     <label for="exampleInputPassword1">Password</label>
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
             <div class="text-center">
                <Link class="d-block small mt-3" to={'/signin'}> Already a user? Sign in </Link>
             </div>
           </div>
         </div>
       </div>
      </div>
    )
  }
}

export default SignUp;
