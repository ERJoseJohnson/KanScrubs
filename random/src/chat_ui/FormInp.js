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


            <div className="tc">

                <form onSubmit={this.resetInput}>
                    <input
                        className="bg-light-green dib br2 pa3 ma2 shadow-5 tc"
                        style={{ width: "700px" }}
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
        );
    }
}

export default Forminp; 