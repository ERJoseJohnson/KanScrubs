import React from "react";
import axios from "axios";


class Login extends React.Component {
    state = {
        userName: "",
        password: "",
        queryType: "General"
    };

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ queryType: event.target.value });
    };

    sendLoginDetails = () => {
        let url = 'http://localhost:8080/user/' + this.state.userName;
        // username: this.state.userName, password: this.state.password, queryType: this.state.queryType
        axios.post(url, { username: this.state.userName, password: this.state.password, queryType: this.state.queryTypey })
            .then((response) => {
                //if (incomingMessage != response.adminResponse) {
                console.log(response.data);
                console.log("Environment to set up", response.data.environment);
            })
    };

    render() {

        return (

            <div className=" FormInput ba br3 pa2  " >

                <form className="tc" onSubmit={this.props.onSubmit}>
                    <input
                        className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                        style={{ width: "430px" }}
                        type="text"
                        value={this.state.userName}
                        onChange={event => this.setState({ userName: event.target.value })}
                        placeholder="Username"
                        required
                    />
                    <input
                        className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                        style={{ width: "430px" }}
                        type="password"
                        value={this.state.password}
                        onChange={event => this.setState({ password: event.target.value })}
                        placeholder="Password"
                        required
                    />


                    <select
                        onChange={this.handleChange}
                        defaultValue={this.state.queryType}
                        placeholder={"Query Type"}
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
                        onClick={this.sendLoginDetails}>Submit</button>
                </form>




            </div>
        );
    }
}

export default Login; 