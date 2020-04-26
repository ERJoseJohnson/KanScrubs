import React from 'react';
import './App.css';
import Chatbox from "./chat_ui/Chatbox";
import "tachyons";
import Login_n from "./login/Login_n";
import axios from "axios";


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      stored_value: "Your Message will appear hear",
      loggedin: 0,
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

  login = (username, password, queryType) => {
    console.log(username);
    const customerCreds = {
      username: username,
      password: password,
      queryType: queryType
    }
    console.log(customerCreds)
    let route = 'http://localhost:3001/login/'.concat(username)
    console.log(route)

    axios.post(route, customerCreds)
      .then((response) => {
        console.log(response.data);
        let stateOfReq = response.data.success
        let customerID = response.data.customer
        let agentID = response.data.agent
      }, (error) => {
        console.log(error);
      });

    this.setState({ loggedin: 1 });

    console.log("logged in ")
  };

  signout = () => {
    window.location.reload(true);
  }

  // Things to do before unloading/closing the tab
  doSomethingBeforeUnload = () => {
    // Do something
    window.alert("Are you sure you want to close ? ")
  }

  // Setup the `beforeunload` event listener
  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();

      ev.returnValue("are you sure you want to leave")
      return this.doSomethingBeforeUnload();
    });
  };

  componentDidMount() {
    // Activate the event listener
    this.setupBeforeUnloadListener();
  }



  test = () => {
    if (this.state.loggedin == 0) {
      return (
        <div>
          <Login_n userInfo={this.state} onSubmit={this.login} />
        </div>
      );
    } else {
      return (
        <div>
          <div className=""><Chatbox history={this.state.history} onMessage={this.updateHistory} signOut={this.signout} /></div>
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

