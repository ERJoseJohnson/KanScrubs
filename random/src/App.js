import React from 'react';
import './App.css';
import Forminp from './FormInp';
import FormOut from "./FormOut" ; 
import {state_out} from "./state_out" ; 
import "tachyons" ; 



class App extends React.Component{
  constructor(){
      super() ; 
      
      this.state = {
          stored_value : "Your Message will appear hear",
          incoming : state_out.incoming_value, 
      }

  }

  storeValue = (event) => {
    event.preventDefault() ; 
    this.setState({stored_value : event.target[0].value}) ;  
  } ; 



  render(){
      return (
      <div>
          <h1 className="tc">Alcatel  Routing  Engine</h1>
            <h2 className=" pa3 ma2">Send Message</h2>
            <Forminp onSubmit={this.storeValue}/>
            <p className="bg-blue dib br4 pa3 ma2 shadow-5 tc">{this.state.stored_value}</p>
            <h2 className=" pa3 ma2">Incomming message</h2>
            <FormOut state={this.state} onChange={this.incomingValue}/>

      </div>
      ) ; 
  }
}

export default App;
