import React from "react";
import ChatHistory from "./ChatHistory";
import FormInp from "./FormInp";
import "./chat.css";
import send from "./rainbow/Send";
import axios from "axios";
import rainbowSDK from 'rainbow-web-sdk';

var outgoingMessage;
var incomingMessage = '';
var prevIncomingMessage = '';



class Chatbox extends React.Component {
    //constructor() {

    msgEnd = React.createRef();
    state = {
        companyName: 1,
        stored_value: "Your Message will appear hear",
        history: this.props.history,

    }





    //}


    updateHistory = (event) => {
        event.preventDefault();
        var new_history = this.props.history;
        // Just created a file bound variable to use with the getData() method
        outgoingMessage = event.target[0].value;
        console.log("APSDOKAOPSDKPAOSKDP");
        let jid = 'e887cc4d73c1483eba4e2214798d196c@sandbox-all-in-one-rbx-prod-1.rainbow.sbg'
        let myContact = rainbowSDK.contacts.getContactByJID(jid);
        console.log(myContact);
        rainbowSDK.conversations.openConversationForContact(myContact).then((conversation) => {
            rainbowSDK.im.sendMessageToConversation(conversation, outgoingMessage);
        }).catch((err) => {
            console.log(err)
        })
        new_history.push({ user: this.state.userName, message: outgoingMessage });
        super.setState({ history: new_history });
        this.setState({ companyName: 0 })
        // Sedning new message as POST request to server
        // postData(outgoingMessage);
        //send(event.target[0].value) ; 
        // try {
        //     const response = axios.post('http://localhost:8080/customerMessage', { incomingMessage: 'Hi there' });
        //     console.log('👉 Returned data:', response);
        // } catch (e) {
        //     console.log(`😱 Axios request failed: ${e}`);
        // }

        //http://localhost:8080/customerMessage
        // axios.post('http://10.12.84.5:8080/customerMessage', {
        //     incomingMessage: outgoingMessage
        // })
        //     .then((response) => {
        //         console.log(response);
        //     }, (error) => {
        //         console.log(error);
        //     });
        // send a post request 

        // axios.get('http://localhost:8080/adminResponse', { success: "Received admin message" })
        //     .then((response) => {
        //         console.log(response);
        //     })
    };

    receiveMessage = async () => {
        axios.get('http://10.12.84.5:8080/adminResponse', { success: "Received admin message" })
            .then((response) => {
                //if (incomingMessage != response.adminResponse) {
                console.log(response.data);
                console.log("this is the response from server", response.data.adminResponse);
                var new_history = this.state.history;
                // Just created a file bound variable to use with the getData() method
                incomingMessage = response.data.adminResponse;
                console.log("This is the incoming", incomingMessage)
                console.log("This is the previous one", prevIncomingMessage)
                if (incomingMessage != prevIncomingMessage && incomingMessage != null) {
                    prevIncomingMessage = response.data.adminResponse;
                    console.log("in the receiveMessage part")
                    this.updateAdminMessages();

                }
                this.render();
            })
        //console.log(response);
        //console.log("klsdfjaslkdfjslad");
        // if (prevIncomingMessage !== incomingMessage) {
        //     prevIncomingMessage = response.adminResponse;
        //     new_history.push({ user: "admin", message: incomingMessage });
        //     super.setState({ history: new_history });
        // }
    }
    updateAdminMessages = () => {
        var new_history = this.state.history;
        new_history.push({ user: "admin", message: incomingMessage });
        super.setState({ history: new_history });
        console.log("Updated admind messages");
    }

    render() {
        this.receiveMessage();
        console.log("rendering......")
        return (

            <div className="par">
                <div className="header">
                    <button className="logout br2 shadow grow" onClick={this.props.signOut}>SIGN OUT</button>
                </div>
                <div className="chatBox pb2">
                    <p className="head1 pb1 pa4 tc">ALCATEL</p>
                    <div className="chatHis"><ChatHistory history={this.props.history} /></div>
                    <FormInp onSubmit={this.updateHistory} history={this.props.history} />

                </div>
            </div>


        );
    }
}

// receiveMessage = () => {
//     axios.get('http://localhost:8080/adminResponse', { success: "Received admin message" })
//         .then((response) => {
//             //if (incomingMessage != response.adminResponse) {
//             console.log(response.adminResponse);
//             var new_history = this.state.history;
//             // Just created a file bound variable to use with the getData() method
//             incomingMessage = response.adminResponse;
//         })
//     console.log(response);
//     //console.log("klsdfjaslkdfjslad");
//     // if (prevIncomingMessage !== incomingMessage) {
//     //     prevIncomingMessage = response.adminResponse;
//     //     new_history.push({ user: "admin", message: incomingMessage });
//     //     super.setState({ history: new_history });
//     // }
// }
// updateAdminMessages = () => {
//     prevIncomingMessage = response.adminResponse;
//     new_history.push({ user: "admin", message: incomingMessage });
//     super.setState({ history: new_history });
//     console.log("Updated admind messages");
// }
export default Chatbox;


{/* <div className="ba bw2 pa2 bg-light-yellow br4" >

<div className="chatbox"><ChatHistory history={this.state.history} /></div>
<FormInp onSubmit={this.updateHistory} history={this.state.history} />

</div> */}