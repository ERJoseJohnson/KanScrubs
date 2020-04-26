import React from "react" ; 
import "./chat.css" ; 

class Message extends React.Component{
    state = {companyName: "" } ; 
   render(){
       return(
           
           <div className="">
               <p className = "sender pl3 dib ma2  tc">{this.props.user}</p>
               <p className=" message f6 pl5">{this.props.message}</p>

           </div>
       ) ; 
   }
}

export default Message ; 