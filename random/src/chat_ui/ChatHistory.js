import React from "react" ; 
import Message from "./Message" ; 

class ChatHistory extends React.Component{
    state = {companyName: "" } ; 
   render(){
    const messageArray = this.props.history.map((user,element) => {
        return <Message key={element} id={this.props.history[element].id} 
                        user={this.props.history[element].user} message={this.props.history[element].message}/> })
       return(
           
           <div className="bb" >
               {messageArray}

           </div>
       ) ; 
   }
}

export default ChatHistory; 