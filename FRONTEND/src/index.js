import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App (2)';
import * as serviceWorker from './serviceWorker';
import rainbowSDK from 'rainbow-web-sdk';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// var onReady = function onReady() {

//   var myRainbowLogin = "spongebob@mymail.sutd.edu.sg";       // Replace by your login
//   var myRainbowPassword = "Kr@bbyP@tty69"; // Replace by your password

//   // The SDK for Web is ready to be used, so you can sign in
//   rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword)
//   .then(function(account) {
//         // Successfully signed to Rainbow and the SDK is started completely. Rainbow data can be retrieved.
//         let onNewMessageReceived = function(event) {

//           let message = event.detail.message;
//           let conversation = event.detail.conversation;
//           let messageContent = "";

//           // Acknowledge it
//           rainbowSDK.im.markMessageFromConversationAsRead(conversation, message);

//           // Text message received
//           messageContent = message.data;

//           // Send an answer
//           // rainbowSDK.im.sendMessageToConversation(conversation, messageContent + " read!");

//           console.log("APSDOKAOPSDKPAOSKDP");
//           let jid = "3ef04d45a9784a61bc1868a07ff9cf6d@sandbox-all-in-one-rbx-prod-1.rainbow.sbg"
//           // let myContact = rainbowSDK.contacts.getContactByJID("85f5342e76c44c219eeff89d2ee49483@sandbox-all-in-one-rbx-prod-1.rainbow.sbg");
//           // console.log(myContact);
//           let myContact;
//           rainbowSDK.contacts.searchByJid(jid).then((contact)=>{
//             rainbowSDK.contacts.addToNetwork(contact).then((theContact)=>{
//               myContact = theContact

//             }).then((err)=>{
//               console.log(err);

//             })
//           }).then((err)=>{
//             console.log(err)
//             rainbowSDK.conversations.openConversationForContact(myContact).then((conversation)=>{
//               rainbowSDK.im.sendMessageToConversation(conversation,"It works!");
//             }).catch((err)=>{
//               console.log(err)
//             })
//           })


//   };

//   document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, onNewMessageReceived)

//   })
//   .catch(function(err) {
//         // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
//         console.log("ERROR");
//   });


// // Listen when the SDK is ready
// document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady)
// };

// var onLoaded = function onLoaded() {
//   console.log('[Hello World] :: On SDK Loaded !');

//   rainbowSDK
//       .initialize('82246ae05a3611eabf7e77d14e87b936', 'OLt1Qpu7fsCDNvT0r42waj0l4EeLe1Wb2nox0vpWGrpuqg4uunxwztDbJFAJKfwD')
//       .then(() => {
//           console.log('[Hello World] :: Rainbow SDK is initialized!');
//       })
//       .catch(err => {
//           console.log('[Hello World] :: Something went wrong with the SDK.', err);
//       });
// };
// document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);

// document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
// rainbowSDK.start();
// rainbowSDK.load();
