import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {firebaseApp} from '../firebase';
import createHistory from 'history/createBrowserHistory';
import { withRouter } from 'react-router-dom'


const history = createHistory();


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

    const {email, password} = this.state
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch(error=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({error:error});
    })

      console.log(this.state)

  }

  render(){
    return (
       <div className="bg-dark" >
       <div className="container">
         <div className="card card-login mx-auto mt-5">
           <div className="card-header">Login</div>
           <div className="card-body">
             <form>
               <div className="form-group">
                 <label htmlFor="exampleInputEmail1">Email address</label>
                 <input
                   className="form-control"
                   type="text"
                   placeholder="email"
                   onChange={event => this.setState({email: event.target.value})}
                   />
               </div>
               <div className="form-group">
                 <label htmlFor="exampleInputPassword1">Password</label>
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
             <div className="text-center">
             <div> {this.state.error.message}</div>
               <Link to={'/registeration/signup'}> Sign Up instead </Link>

             </div>
           </div>
         </div>
       </div>

       </div>
    )
  }
}

//export default SignIn

function mapStateToProps(state){
  const { user } = state;
  return{
    user
  }
}


// export default withRouter(connect(mapStateToProps)(SignIn))
export default withRouter(connect(mapStateToProps)(SignIn))
