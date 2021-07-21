import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './register.component.css';
import APIClient from './../../utils/httpClient';
import notify from './../../utils/notify';
export class Register extends Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            name: null,
            email: null,
            emailError: null,
            usernameError: null,
            passwordErr: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault(); //question?

        let emailError;
        let usernameError;
        let passwordError;
        if (!this.state.email) {
            emailError = 'Email is required field';
        } else {
            emailError = this.state.email.includes('@')
                ? null
                : 'Invalid email format'
        }

        if (emailError || usernameError || passwordError) {
            this.setState({
                emailError,
                usernameError,
                passwordError
            })
        } else {
            // BE call now
            APIClient.post('/auth/register', { body: this.state })
                .then(() => {
                    notify.showSuccess('Registration Successfull');
                    this.props.history.push('/');// redirect to login
                })
                .catch((err) => {
                    notify.handleError(err);
                })

        }




        // i should get form data here
        // if form data is ready call BE with those data
        // navigation

        // axios // promise
        // rxjs // observables
    }

    render() {
        let form = (
            <div>
                <h2>Register</h2>
                <p>Please provide your details to register</p>
                <form className="form-group" onSubmit={this.handleSubmit.bind(this)} noValidate >
                    <label htmlFor="name">Name</label>
                    <input name="name" className="form-control" id="name" onChange={this.handleChange} type="text" placeholder="Name" />
                    <label htmlFor="email">Email</label>
                    <input name="email" className="form-control" id="email" onChange={this.handleChange} type="text" placeholder="Email" required />
                    <p className="danger">{this.state.emailError}</p>
                    <label htmlFor="username">Username</label>
                    <input name="username" className="form-control" id="username" onChange={this.handleChange} type="text" placeholder="Username" required />
                    <label htmlFor="password">Password</label>
                    <input name="password" className="form-control" id="password" type="password" onChange={this.handleChange} type="text" placeholder="Password" required />
                    <br></br>
                    <button className="btn btn-primary">Register</button>
                </form>
                <p> Already Registered</p>
                <p>back to <Link to="/">login</Link></p>
            </div>

        );
        return form;
    }

}