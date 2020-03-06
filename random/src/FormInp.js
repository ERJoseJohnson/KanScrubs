import React from "react" ; 

class Forminp extends React.Component{
     state = {companyName: "" } ; 
    render(){
        return(
            
            <div >
                <form onSubmit={this.props.onSubmit}>
                    <input 
                        className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                        type="text" 
                        value={this.state.companyName}
                        onChange={event => this.setState({ companyName: event.target.value })}
                        placeholder="Enter Text here" 
                        required 
                    />
                    <button 
                    className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                    type="submit">Publish</button>
                </form>
            </div>
        ) ; 
    }
}

export default Forminp ; 