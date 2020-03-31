import React from 'react';
import './App.css';
import Chatbox from "./chat_ui/Chatbox";
import { state_out } from "./state_out";
import "tachyons";
import Login from './login/Login';
import axios from "axios";



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      stored_value: "Your Message will appear hear",
      incoming: state_out.incoming_value,
      history: [], 
      a : "", 
    }

    this.userInfo = {
      userName: "",
      password: "",
      queryType: "",
    }

  }

  updateHistory = (event) => {
    event.preventDefault();
    this.setState({ stored_value: event.target[0].value });
  };

  login = (event) => {
    event.preventDefault();
    console.log("logged in")
    // create a call to routing engine 
    // log in 
    // load chat history 

  };

  update = (data) => {
    this.setState({a : data.a})
  } ; 




  render() {
    
    axios.get('http://127.0.0.1:5000/adminResponse', { success: "Received admin message" })
    .then((response) => {
        console.log(response.data) ;
        var sendResponse = response.data;
        axios.get('http://localhost:8080/chatEnv', sendResponse)
        .then((response) => {
            console.log(response.data) ; 
             
          })
      })
    return (
      <div>
        <h1>{this.state.a}</h1>
        <h1 className="tc">Alcatel  Routing  Engine</h1>
        <div className="pl4 pr4"><Login userInfo={this.userInfo} onSumbit={this.login} /></div>
        <h2 className=" pa3 ma2 pl5">Assigned Admin = </h2>
        <div className="pl5 pr5"><Chatbox history={this.state.history} onMessage={this.updateHistory} /></div>
      </div>
    );
  }
}

export default App;

//
//<h2 className=" pa3 ma2">Incomming message</h2>
//<FormOut state={this.state} onChange={this.incomingValue}/>