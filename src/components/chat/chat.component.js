import React, { Component } from 'react';
import * as io from 'socket.io-client';
export class ChatComponent extends Component {
    socket;
    user;
    constructor() {
        super();
        this.socket = io.connect('http://localhost:8081');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            messages: [],
            requestData: {
                senderName: '',
                senderId: '',
                message: '',
                receiverName: '',
                receiverId: '',
                // time: new Date().getTime()
            }
        }
    }

    componentDidMount() {
        this.socket.emit('hi', 'Hello from react');
        this.socketBlock();
    }

    socketBlock() {
        this.socket.on('hello', (data) => {
            console.log('data in hello >>>', data);
        })
        // this.socket.on('reply-msg', (msg) => {
        //     console.log('messages >>', msg);
        //     // let messages = this.state.messages.push(msg.mess);
        //     // this.setState({
        //     //     messages
        //     // });

        // })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.socket.emit('new-msg', this.state.requestData);
        let updatedMessage = this.state.messages;
        console.log('updated message >>', updatedMessage);
        updatedMessage.push('hi +' + this.state.requestData.message);
        this.setState({
            messages: updatedMessage
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((pre) => ({
            requestData: {
                ...pre.requestData,
                [name]: value
            }
        }))
    }

    render() {
        let msgData = this.state.messages.map((msg) => (
            <li>{msg}</li>
        ))
        return (
            <>
                <p>Let's Chat <ins>{this.user.username}</ins></p>
                <div className="row">
                    <div className="col-md-6">
                        {msgData}
                    </div>
                    <div className="col-md-6">
                        <form className="form-group" onSubmit={this.handleSubmit}>
                            <input name="message" type="text" className="form-control"></input>
                            <button className="btn btn-success" type="submit">send</button>
                        </form>
                    </div>

                </div>

            </>
        )
    }
}