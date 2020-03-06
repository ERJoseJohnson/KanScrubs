import React from "react" ; 
//import {state_out} from "./state_out" ; 

class Forminp extends React.Component{
     state = {companyName: "" } ; 
    render(){
        return(
            
            <div >
                <form >
                    <input 
                        className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                        type="text" 
                        value={this.props.state.incoming }
                        onChange={event => this.props.setState({ incoming:event.target[0].value })}
                        //onChange={event => this.props.onChange }
                        placeholder="--" 
                        required 
                    />
                </form>
            </div>
        ) ; 
    }
}

export default Forminp ; 