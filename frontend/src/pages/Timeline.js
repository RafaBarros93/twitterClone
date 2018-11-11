import React, { Component } from 'react';
import api from '../server/api';
import socket from 'socket.io-client';

import './Timeline.css';
import twitterLogo from '../twitter.svg';
import Tweet from '../components/Tweet';

class Timeline extends Component {
    state = {
        tweets:[], 
        newTweet: '',
    };

 async componentDidMount(){
    
    this.subrscribeToEvents();
    
    const response = await api.get('tweets');

      this.setState({tweets: response.data});
    };

    subrscribeToEvents = () =>{
      const io = socket('http://localhost:3000');

       io.on('tweet',data => {
           this.setState({tweets:[data,... this.state.tweets]});
       });

       io.on('like',data => {
          this.setState({tweets: this.state.tweets.map(tweet => tweet._id === data._id ? data : tweet)
        });
      });
    };
    
    handleInpuntChange = e =>{
        this.setState({newTweet:e.target.value});
    };

    handleNewTweet = async e =>{
        if(e.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');

        await api.post('tweets',{content,author});

        this.setState({newTweet:''})
    };
    
 render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="GoTwitter"/>
              
        <form>
           <textarea 
           value={this.state.newTweet} 
           onChange={this.handleInpuntChange} 
           onKeyDown={this.handleNewTweet}
           placeholder="O que está acontecendo?"
         
           />
        </form>
       <ul className ="tweet-list">
        {this.state.tweets.map(tweet => <Tweet tweet={tweet} key={tweet._id}  />)}
     </ul>
     </div>
   );
  }
}

export default Timeline;