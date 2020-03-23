import React from "react" ; 

class Forminp extends React.Component{
     state = {companyName: "" } ; 

     resetInput = (event) => {
        event.preventDefault() ; 
        this.setState({companyName : ""}) ; 
      } ; 
    render(){
        return(
            
            <div className="tc">
                <form onSubmit={ this.props.onSubmit}>
                    <input 
                        className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                        style={{width:"700px"}}
                        type="text" 
                        value={this.state.companyName}
                        onChange={event => this.setState({ companyName: event.target.value })}
                        placeholder="Enter Text here" 
                        required 
                    />
                    <button 
                    className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                    type="submit"
                    >Send</button>
                </form>
            </div>
        ) ; 
    }
}

export default Forminp ; 