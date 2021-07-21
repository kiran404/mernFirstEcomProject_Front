import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import notify from '../../utils/notify';
import http from './../../utils/httpClient';

export class Login extends Component {
    constructor(props) {
        super(props); //
        this.state = {
            username: 'Broadway',
            password: 'testing',
        }
    }

    // componentDidMount() {
    //     localStorage.clear();
    // }

    handleSubmit(e) {
        e.preventDefault();
        http.post('/auth/login', { body: this.state, })
            .then((data) => {
                notify.showInfo(`Welcome ${data.user.username}`);
                console.log('data >>>', data);
                // webstorage
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                
                this.props.history.push('/dashboard');

            })
            .catch((err) => {
                notify.handleError(err);
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // whenever a state is changed render method will be called
    render() {
        // 
        // this function required in class component
        // render will return single node
        return (
            <div>
                <h2>Login</h2>
                <h3>Welcome to Our Web Store</h3>
                <p>Please provide your details to login</p>
                <form className="form-group" onSubmit={this.handleSubmit.bind(this)} noValidate>
                    <label htmlFor="username">Username</label>
                    <input name="username" className="form-control" id="username" onChange={this.handleChange} type="text" placeholder="Username" required />
                    <label htmlFor="password">Password</label>
                    <input name="password" className="form-control" id="password" type="password" onChange={this.handleChange} type="text" placeholder="Password" required />
                    <br></br>
                    <button className="btn btn-primary">Login</button>
                </form>
                <p> Don't have an Account?</p>
                <div>
                    <span>Register <NavLink to="/register">here</NavLink></span>
                    <span className="float-right"><NavLink to="/forgot-password">forgot password?</NavLink></span>
                </div>

            </div >
        )
    }
}


