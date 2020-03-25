import React from "react";
import ChatHistory from "./ChatHistory";
import FormInp from "./FormInp";
import send from "./rainbow/Send";
import axios from "axios";

var outgoingMessage;
var incomingMessage = '';
var prevIncomingMessage = '';


class Chatbox extends React.Component {
    constructor() {
        state = {
            companyName: "",
            stored_value: "Your Message will appear hear",
            history: this.props.history,
        }
    }

    updateHistory = (event) => {
        event.preventDefault();
        var new_history = this.state.history;
        // Just created a file bound variable to use with the getData() method
        outgoingMessage = event.target[0].value;
        new_history.push({ user: "customer1", message: outgoingMessage });
        super.setState({ history: new_history });
        // Sedning new message as POST request to server
        // postData(outgoingMessage);
        //send(event.target[0].value) ; 
        // try {
        //     const response = axios.post('http://localhost:8080/customerMessage', { incomingMessage: 'Hi there' });
        //     console.log('👉 Returned data:', response);
        // } catch (e) {
        //     console.log(`😱 Axios request failed: ${e}`);
        // }

        axios.post('http://localhost:8080/customerMessage', {
            incomingMessage: outgoingMessage
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        // send a post request 

        // axios.get('http://localhost:8080/adminResponse', { success: "Received admin message" })
        //     .then((response) => {
        //         console.log(response);
        //     })
    };

    receiveMessage = () => {
        axios.get('http://localhost:8080/adminResponse', { success: "Received admin message" })
            .then((response) => {
                //if (incomingMessage != response.adminResponse) {
                console.log(response.adminResponse);
                var new_history = this.state.history;
                // Just created a file bound variable to use with the getData() method
                incomingMessage = response.adminResponse;
            })
        console.log(response);
        //console.log("klsdfjaslkdfjslad");
        // if (prevIncomingMessage !== incomingMessage) {
        //     prevIncomingMessage = response.adminResponse;
        //     new_history.push({ user: "admin", message: incomingMessage });
        //     super.setState({ history: new_history });
        // }
    }
    updateAdminMessages = () => {
        prevIncomingMessage = response.adminResponse;
        new_history.push({ user: "admin", message: incomingMessage });
        super.setState({ history: new_history });
        console.log("Updated admind messages");
    }

    render() {
        // this.receiveMessage();
        // //console.log("rendering......")
        // if (prevIncomingMessage != incomingMessage) {
        //     this.updateAdminMessages();
        // }
        return (

            <div className="ba bw2 pa2 bg-light-yellow br4" >

                <ChatHistory history={this.state.history} />
                <FormInp onSubmit={this.updateHistory} />

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