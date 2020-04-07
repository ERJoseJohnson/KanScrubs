import React from 'react';
import './App.css';
import Chatbox from "./chat_ui/Chatbox";
import "tachyons";
import Login_n from "./login/Login_n";
import axios from "axios";
import rainbowSDK from 'rainbow-web-sdk';



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      stored_value: "Your Message will appear hear",
      loggedin: 0,
      history: [{ user: "customer1", message: "asdfasdf" }],
      userName: "",
      password: "",
      queryType: "",
      message: "",
    }


  }

  // init rainbow sdk and set up listening
  onReady = () => {

    var myRainbowLogin = this.state.userName; //"JohnDoe@mymail.sutd.edu.sg";       // Replace by your login
    var myRainbowPassword = this.state.password; //"IAmJohnDoes1!"; // Replace by your password
    var msg;
    console.log('this is the username', this.state.userName)
    console.log('this is the password', this.state.password)
    console.log(myRainbowLogin)
    console.log(myRainbowPassword)
    // The SDK for Web is ready to be used, so you can sign in
    rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword)
      .then(function (account) {
        // Successfully signed to Rainbow and the SDK is started completely. Rainbow data can be retrieved.
        let onNewMessageReceived = function (event) {

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


          // var new_history = this.state.history;
          // new_history.push({ user: "admin", message: messageContent });
          // this.setState({ history: new_history });

          // Send an answer
          // rainbowSDK.im.sendMessageToConversation(conversation, messageContent + " read!");

          // console.log("APSDOKAOPSDKPAOSKDP");
          // let jid = "3ef04d45a9784a61bc1868a07ff9cf6d@sandbox-all-in-one-rbx-prod-1.rainbow.sbg"
          // // let myContact = rainbowSDK.contacts.getContactByJID("85f5342e76c44c219eeff89d2ee49483@sandbox-all-in-one-rbx-prod-1.rainbow.sbg");
          // // console.log(myContact);
          // let myContact;
          // rainbowSDK.contacts.searchByJid(jid).then((contact) => {
          //   rainbowSDK.contacts.addToNetwork(contact).then((theContact) => {
          //     myContact = theContact

          //   }).then((err) => {
          //     console.log(err);

          //   })
          // }).then((err) => {
          //   console.log(err)
          //   rainbowSDK.conversations.openConversationForContact(myContact).then((conversation) => {
          //     rainbowSDK.im.sendMessageToConversation(conversation, "It works!");
          //   }).catch((err) => {
          //     console.log(err)
          //   })
          // })
          console.log("I am here ******************************************")
          var new_history = this.state.history;
          new_history.push({ user: this.state.userName, message: msg });
          console.log(new_history);
          this.setState({ history: new_history });

        };
        document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, onNewMessageReceived)


      })
      .catch(function (err) {
        // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
        console.log("ERROR");
        console.log(err)
      });
    // console.log("I am here ******************************************")
    // var new_history = this.state.history;
    // new_history.push({ user: this.state.userName, message: msg });
    // console.log(new_history);
    // this.setState({ history: new_history });
    this.setState({ loggedin: 1 });
    // this.render();
    // Listen when the SDK is ready
    // document.addEventListener(rainbowSDK.RAINBOW_ONREADY, this.onReady)
  };

  receiveMessage = function (event) {
    // let onNewMessageReceived = function (event) {

    let message = event.detail.message;
    let conversation = event.detail.conversation;
    let messageContent = "";

    console.log(message)

    // Acknowledge it
    rainbowSDK.im.markMessageFromConversationAsRead(conversation, message);

    // Text message received
    messageContent = message.data;
    console.log(messageContent)

    var new_history = this.state.history;
    new_history.push({ user: "admin", message: messageContent });
    this.setState({ history: new_history });
    // };

    document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, this.onNewMessageReceived)
  }
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
    console.log(username, "*********************************")
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
    // console.log(customerCreds);
    let route = 'http://localhost:3001/login/'.concat(username);
    console.log(route);

    let stateOfReq = "false";
    // while (stateOfReq == "false") {

    //   axios.post(route, customerCreds)
    //     .then((response) => {
    //       console.log(response.data);
    //       stateOfReq = response.data.success
    //       let customerID = response.data.customer
    //       let agentID = response.data.agent
    //     }, (error) => {
    //       console.log(error);
    //     });
    // }

    document.addEventListener(rainbowSDK.RAINBOW_ONREADY, this.onReady);

    document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, this.onLoaded);
    rainbowSDK.start();
    rainbowSDK.load();


    //this.setState({ loggedin: 1 });

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
          <p className="tc">{this.state.message}</p>
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

