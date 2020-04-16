import React from "react";
import "./MessageBox.css" ; 
import logo from "./loading.gif" ; 

// add message in APP , onchange 
// change the routing 


class MessageBox extends React.Component {
    state = { message : this.props.message };


    render() {
        return(
            <div className="msg tc pa3">
                
                <div className="box tc pl2 pr2  br1">
                    <p className="head1 tc">{"Please wait while we find you a suitable agent"}</p>
                    <img src={logo} alt={"loading"}/>
                    <p className="head2">{this.props.message}</p>
                </div>
            </div>
        ) ; 
    }
}

export default MessageBox; 