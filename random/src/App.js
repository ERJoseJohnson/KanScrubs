import React from 'react';
import './App.css';
import Chatbox from "./chat_ui/Chatbox";
import "tachyons";
import Login_n from "./login/Login_n" ; 



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      stored_value: "Your Message will appear hear",
      loggedin : 0 , 
      history: [], 
      userName: "",
      password: "",
      queryType: "",
    }


  }

  updateHistory = (event) => {
    event.preventDefault();
    this.setState({ stored_value: event.target[0].value });
  };

  login = () => {
    this.setState({loggedin : 1}) ; 
    console.log(this.state.loggedin) ;
    console.log("logged in ") 
    // create a call to routing engine 
    // log in 
    // load chat history 

  };



  test = () => {
    if(this.state.loggedin == 0 ){
      return (     
      <div>
        <Login_n userInfo={this.state} onSubmit={this.login}/>
      </div>
      ) ; 
    }else {
      return (
      <div>
        <div className=""><Chatbox history={this.state.history} onMessage={this.updateHistory} /></div>
      </div>
      ); 
    }

  };


  render() {
    return (

      this.test() 
    );
  }
}

export default App;

