import React from "react" ; 

class Message extends React.Component{
    state = {companyName: "" } ; 
   render(){
       return(
           
           <div className="bb">
               <h5 className = "bg-light-green dib br3 pa2 ma2 f6 lh-copy tc">{this.props.user}</h5>
               <p className="pl3">{this.props.message}</p>

           </div>
       ) ; 
   }
}

export default Message ; 