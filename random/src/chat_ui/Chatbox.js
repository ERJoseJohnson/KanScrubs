import React from "react";
import ChatHistory from "./ChatHistory";
import FormInp from "./FormInp";
import send from "./rainbow/Send";
var outgoingMessage;


class Chatbox extends React.Component {

    state = {
        companyName: "",
        stored_value: "Your Message will appear hear",
        history: this.props.history,
    }



    updateHistory = (event) => {
        event.preventDefault();
        var new_history = this.state.history;
        // Just created a file bound variable to use with the getData() method
        outgoingMessage = event.target[0].value;
        new_history.push({ user: "customer1", message: outgoingMessage });
        super.setState({ history: new_history });
        // Sedning new message as POST request to server
        postData(outgoingMessage);
        //send(event.target[0].value) ; 
        // send a post request 
    };

    render() {
        return (

            <div className="ba bw2 pa2 bg-light-yellow br4" >
                <ChatHistory history={this.state.history} />
                <FormInp onSubmit={this.updateHistory} />
            </div>
        );
    }
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);
    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
}

function postData(outgoingMessage) {
    // // create a new XMLHttpRequest
    // var xhr = new XMLHttpRequest()

    // // get a callback when the server responds
    // xhr.addEventListener('load', () => {
    //     // update the state of the component with the result here
    //     console.log(xhr.responseText)
    // })
    // // open the request with the verb and the url
    // xhr.open('POST', 'localhost:8080/customerMessage')
    // xhr.setRequestHeader('Content-Type', 'text/plain');
    // // send the request
    // xhr.send(JSON.stringify({ incomingMessage: outgoingMessage }))

    var url = 'http://10.12.155.18:8080';
    console.log("url created");
    var xhr = createCORSRequest('PUT', url);
    console.log("create cors request")
    xhr.setRequestHeader('X-Custom-Header', 'value');
    console.log("xhr sending")
    xhr.send();
    console.log("sent");

    // $.ajax({
    //     type: 'POST',
    //     url: 'localhost:8080/customerMessage',
    //     crossDomain: true,
    //     data: '{"message":"json"}',
    //     dataType: 'json',
    //     success: function (responseData, textStatus, jqXHR) {
    //         //var value = responseData.someKey;
    //         console.log("POST Success")
    //     },
    //     error: function (responseData, textStatus, errorThrown) {
    //         alert('POST failed.');
    //     }
    // });
}
export default Chatbox; 