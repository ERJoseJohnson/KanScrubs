import React from 'react';
import './App.css';
import Chatbox from "./chat_ui/Chatbox";
import "tachyons";
import Login_n from "./login/Login_n";
import axios from "axios";
import rainbowSDK from 'rainbow-web-sdk';
import MessageBox from "./intermediate/MessageBox";

let msg;
let prevMessage;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      stored_value: "Your Message will appear hear",
      loggedin: 0,
      history: [{ user: "Agent", message: "How may I help you? 😊" }],
      userName: "",
      password: "",
      queryType: "",
      message: "",
      agentJID: "",
      customerID: "",
      message: " ", //"You have been loggedin successfully",
      route: null,
      customerCreds: null,
      stateOfReq: null,
    }
  }

  // init rainbow sdk and set up listening
  onReady = () => {

    var myRainbowLogin = this.state.userName; //"JohnDoe@mymail.sutd.edu.sg";       // Replace by your login
    var myRainbowPassword = this.state.password; //"IAmJohnDoes1!"; // Replace by your password

    console.log('this is the username', this.state.userName)
    console.log('this is the password', this.state.password)
    console.log(myRainbowLogin)
    console.log(myRainbowPassword)
    // The SDK for Web is ready to be used, so you can sign in
    rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword)
      .then(function (account) {
        // Successfully signed to Rainbow and the SDK is started completely. Rainbow data can be retrieved.

      })
      .catch(function (err) {
        // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
        //this.setState({ message: "You entered the wrong credentials" });
        window.location.reload(true);
        window.alert("You have entered invalid credentials. Please try again.")
        console.log("ERROR");
        console.log(err)

      });
  };

  onLoaded = () => {
    console.log('[Hello World] :: On SDK Loaded !');

    rainbowSDK
      .initialize('82246ae05a3611eabf7e77d14e87b936', 'OLt1Qpu7fsCDNvT0r42waj0l4EeLe1Wb2nox0vpWGrpuqg4uunxwztDbJFAJKfwD')
      .then(() => {
        console.log('[Hello World] :: Rainbow SDK is initialized!');
      })
      .catch(err => {
        console.log('[Hello World] :: Something went wrong with the SDK.', err);
      });
  };
  updateHistory = (event) => {
    // send message code
    event.preventDefault();
    this.setState({ stored_value: event.target[0].value });
  };

  login = (username, password, queryType) => {
    //console.log(username, "*********************************")

    // SQL injection safety
    if (username.length > 40 || password.length > 40 || username.includes("'") || username.includes(";")) {
      window.alert("Username or Password is invalid. Please do not include any special characters besides '@' and '.'");
      window.location.reload();
      return;
    }
    this.state.userName = username;
    //this.setState({ userName: username });
    this.setState({ password: password });
    this.setState({ queryType: queryType });
    console.log(username);
    const customerCreds = {
      username: username,
      password: password,
      queryType: queryType
    }
    console.log('Customer cred', customerCreds);
    let route = 'http://localhost:3001/login/'.concat(username);
    console.log(route);

    let stateOfReq;
    axios.post(route, customerCreds)
      .then((response) => {
        console.log(response.data);
        this.setState({ customerID: response.data.customer });
        this.setState({ agentJID: response.data.agent });
        stateOfReq = response.data.success
        let customerID = response.data.customer
        let agentJID = response.data.agent

        if (stateOfReq == 'true') {
          // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5");
          this.setState({ loggedin: 2 }); // changed
          this.render();
        }
        else if (stateOfReq == 'false') {
          this.setState({ message: "The credentials you entered were wrong ! Please reload and try again" })
          this.setState({ loggedin: 1 });
          this.render();
          //this.setState({loggedin : 1})
        }

      }, (error) => {
        console.log(error);
      });

    // console.log("#############################################");

    document.addEventListener(rainbowSDK.RAINBOW_ONREADY, this.onReady);

    document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, this.onLoaded);
    rainbowSDK.start();
    rainbowSDK.load();


    console.log("logged in ")
  };

  signout = () => {

    if (this.userName == "") {
      window.location.reload(true);
      return;

    }
    let route = 'http://localhost:3001/signout/' + this.state.userName
    axios.post(route, { username: this.state.userName })
      .then((response) => {
        console.log(response.data)
      }, (error) => {
        console.log(error);
      });

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

  onNewMessageReceived = (event) => {

    let message = event.detail.message;
    let conversation = event.detail.conversation;
    let messageContent = "";

    console.log(message)

    // Acknowledge it
    rainbowSDK.im.markMessageFromConversationAsRead(conversation, message);

    // Text message received
    messageContent = message.data;
    console.log(messageContent)
    msg = messageContent;
    console.log(msg)
    var new_history = this.state.history;
    new_history.push({ user: "Agent", message: messageContent });
    this.setState({ history: new_history });
  };

  componentDidMount() {
    // Activate the event listener
    this.setupBeforeUnloadListener();
    document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, this.onNewMessageReceived);
    document.addEventListener(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, this.onStateChange);

  }

  componentWillUnmount() {
    this.signout()
  }

  onStateChange = () => {
    if (rainbowSDK.connection.getState() == 'RAINBOW_CONNECTIONDISCONNECTED') {
      console.log('The state change to disconnect!')
      this.signout();
    }
  }

  wait = async (stat, route, customerCreds) => {
    let stateOfReq = stat;
    console.log(stateOfReq);
    axios.post(route, customerCreds)
      .then((response) => {
        console.log(response.data);
        this.setState({ customerID: response.data.customer });
        this.setState({ agentJID: response.data.agent });
        stateOfReq = response.data.success
        let customerID = response.data.customer
        let agentJID = response.data.agent

      }, (error) => {
        console.log(error);
      });
    if (stateOfReq == 'true') {
      this.setState({ loggedin: 2 });
    }
  }
  test = () => {
    if (this.state.loggedin == 0) {
      return (
        <div>

          <Login_n userInfo={this.state} onSubmit={this.login} />
        </div>
      );
    } else if (this.state.loggedin == 1) {
      //console.log("************************");
      return (
        <div>
          <MessageBox message={this.state.message} />
        </div>
      );
    }
    else if (this.state.loggedin == 2) {
      return (
        <div>
          <div className=""><Chatbox history={this.state.history} onMessage={this.updateHistory} signOut={this.signout} agent={this.state.agentJID} /></div>
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

