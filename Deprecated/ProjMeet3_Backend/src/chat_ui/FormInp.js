import React from "react";

class Forminp extends React.Component {
    state = { companyName: "" };


    resetInput = (event) => {

        this.props.onSubmit(event);
        this.setState({ companyName: "" });
    };

    render() {
        if (this.props.companyName === 0) {
            this.setState({ companyName: "" });
            super.setState({ companyName: 1 });
        }
        return (


            <div className="tc bt bw1">

                <form className=" form " onSubmit={this.resetInput}>
                    <input
                        className="pa2"
                            
                        type="text"
                        value={this.state.companyName}
                        onChange={event => this.setState({ companyName: event.target.value })}
                        placeholder="Enter Text here"
                        required
                    />
                    <div className="send"><button className="">SEND</button></div>
                    
                </form>
            </div>
        );
    }
}

export default Forminp; 