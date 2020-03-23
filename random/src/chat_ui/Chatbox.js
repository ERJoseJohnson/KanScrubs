import React from "react" ; 
import ChatHistory from "./ChatHistory" ; 
import FormInp from "./FormInp" ; 
import send from "./rainbow/Send" ; 



class Chatbox extends React.Component{

    state = {companyName: "" ,
             stored_value : "Your Message will appear hear",
             history : this.props.history, } 


    updateHistory = (event) => {
        event.preventDefault() ; 
        var new_history = this.state.history ; 
        new_history.push({user : "customer1" , message : event.target[0].value}) ; 
        super.setState({history:new_history}) ; 
        //send(event.target[0].value) ; 
        // send a post request 
      } ; 



   render(){
       return(
           
           <div className="ba bw2 pa2 bg-light-yellow br4" >
               <ChatHistory history={this.state.history}/>
               <FormInp onSubmit={this.updateHistory}/>
           </div>
       ) ; 
   }
}

export default Chatbox; 