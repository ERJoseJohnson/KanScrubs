import React from "react";
import Message from "./Message";
var msgEnd;


class ChatHistory extends React.Component {
    state = { companyName: "" };
    msgEnd = React.createRef();

    componentDidMount() {
        this.scrollToBottom()
    }
    componentDidUpdate() {
        this.scrollToBottom()
    }
    scrollToBottom = () => {
        this.msgEnd.current.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        const messageArray = this.props.history.map((user, element) => {
            return <Message key={element} id={this.props.history[element].id}
                user={this.props.history[element].user} message={this.props.history[element].message} />
        })
        return (

            <div className="" >
                {messageArray}
                <div ref={this.msgEnd} />
            </div>
        );
    }
}

export default ChatHistory; 