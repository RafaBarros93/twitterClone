import React, { Component } from 'react';

import './Login.css';

import twitterLogo from '../twitter.svg';

class Login extends Component {
   state ={
       username: '',
   }; 
   
   handleInputChange = e =>{
     this.setState({username:e.target.value});
   };
   handleOnSubmit = e =>{
      e.preventDefault();

    const {username} = this.state;
    console.log(username);

    if(!username.length) return;

      localStorage.setItem('@GoTwitter:username',username);

      this.props.history.push('/timeline');
    };
  
    render() {
      return (
     <div className="login-wrapper">
        <img src={twitterLogo} alt="GoTwitter"/>
        <form onSubmit={this.handleOnSubmit}>
           <input value={this.state.username} onChange={this.handleInputChange} placeholder="Nome do Usuário"/>
           <button type="submit">Login</button>
        </form>     
    </div>
    );
  }
}

export default Login;