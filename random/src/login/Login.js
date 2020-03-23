import React from "react" ; 


class Login extends React.Component{
    state = {userName: "",
                password: "",
                queryType : "General" } ; 

    handleChange = (event) => {
        event.preventDefault() ; 
        this.setState({queryType : event.target.value}) ; 
        } ; 

   render(){

       return(
           
           <div className=" FormInput ba br3 pa2  " >

                <form className="tc" onSubmit={ this.props.onSubmit}>
                    <input 
                        className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                        style={{width:"430px"}}
                        type="text" 
                        value={this.state.userName}
                        onChange={event => this.setState({ userName: event.target.value })}
                        placeholder="Username" 
                        required 
                    />
                    <input 
                        className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                        style={{width:"430px"}}
                        type="password" 
                        value={this.state.password}
                        onChange={event => this.setState({ password: event.target.value })}
                        placeholder="Password" 
                        required 
                    />

                        
                        <select  
                            onChange={this.handleChange} 
                            defaultValue = {this.state.queryType}
                            placeholder = {"Query Type"}
                            className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                        >
                            <option value="General">General Query</option>
                            <option value="Mortgage">Mortgage</option>
                            <option value="Card">Card</option>
                            <option value="Credit">Credit</option>
                            <option value="Insurance">Insurance</option>

                        </select>


                    <button 
                    className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                    type="submit"
                    >Submit</button>
                </form>


               

           </div>
       ) ; 
   }
}

export default Login; 