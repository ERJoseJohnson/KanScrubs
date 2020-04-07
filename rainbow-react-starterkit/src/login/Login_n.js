import React from "react";
import axios from "axios";
import "./Login_n.css" ; 


class Login_n extends React.Component {
    state = {
        userName: "",
        password: "",
        queryType: "General"
    };

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ queryType: event.target.value });
    };

    sendLoginDetails = (event) => {
        // let url = 'http://localhost:8080/user/' + this.state.userName;
        // // username: this.state.userName, password: this.state.password, queryType: this.state.queryType
        // axios.post(url, { username: this.state.userName, password: this.state.password, queryType: this.state.queryTypey })
        //     .then((response) => {
        //         //if (incomingMessage != response.adminResponse) {
        //         console.log(response.data);
        //         console.log("Environment to set up", response.data.environment);
        //     })
        if ((this.state.userName == "") || (this.state.password == "")){
            window.alert("Please fill up login details. \n We wish you a pleasant experience.") ; 
        } else {
            console.log(this.state.userName) ; 
            console.log(this.state.password) ; 
            console.log(this.state.queryType) ; 
            this.props.onSubmit() ; 
        }
        // console.log("logged in ") ; 
    };

    render() {

        return (
            <div className="rootes  pl4 pr4 ">
                
                <div className="loginBox  pl4 pb4 pr4 ">
                    <p className="head1 pb3 pa4">ALCATEL</p>
                    <p className="head2 tc pb3">CUSTOMER ENQUIRY</p>
                    
                    <div className="tc">
                
                        <input
                                className=""
                                type="text"
                                value={this.state.userName}
                                onChange={event => this.setState({ userName: event.target.value })}
                                placeholder="  Username"
                                required
                            />
                        <div className="pa2"/>
                        <input
                                className=" "
                                type="password"
                                value={this.state.password}
                                onChange={event => this.setState({ password: event.target.value })}
                                placeholder="  Password"
                                required
                            />
                        <div className="pa2"/>
                        <select
                                onChange={this.handleChange}
                                defaultValue={this.state.queryType}
                                placeholder={"Query Type"}
                                className=""
                            >
                                <option value="General" >  General Query</option>
                                <option value="Mortgage" className="o-20">  Mortgage</option>
                                <option value="Card">  Card</option>
                                <option value="Credit">  Credit</option>
                                <option value="Insurance">  Insurance</option>

                            </select>
                        <div className="pa3"/>
                        <button className="grow" onClick={this.sendLoginDetails}>LOGIN</button>
                    
                    </div>
                
                </div>
                
                




            </div>
        );
    }
}

export default Login_n; 