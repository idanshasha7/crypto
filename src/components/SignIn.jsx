import React, { Component } from 'react';
import { Link } from 'react-router';
import {firebaseApp} from '../firebase';

class SignIn extends Component {
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

  signIn(){
    console.log('this.state',this.state);
    const {email, password} = this.state
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch(error=>{
      console.log('error', error);
      this.setState({error});
    })
  }

  render(){
    return (
       <div className="bg-dark" >
       <div class="container">
         <div class="card card-login mx-auto mt-5">
           <div class="card-header">Login</div>
           <div class="card-body">
             <form>
               <div class="form-group">
                 <label for="exampleInputEmail1">Email address</label>
                 <input
                   className="form-control"
                   type="text"
                   placeholder="email"
                   onChange={event => this.setState({email: event.target.value})}
                   />
               </div>
               <div class="form-group">
                 <label for="exampleInputPassword1">Password</label>
                 <input
                   className="form-control"
                   type="password"
                   placeholder="password"
                   onChange={event => this.setState({password: event.target.value})}
                   />
               </div>


               <button
                   className="btn btn-primary"
                   type="button"
                   onClick={()=> this.signIn()}
                   >
                     Login
               </button>
             </form>
             <div class="text-center">
             <div> {this.state.error.message}</div>
               <Link to={'/signup'}> Sign Up instead </Link>

             </div>
           </div>
         </div>
       </div>

       </div>
    )
  }
}

export default SignIn;
