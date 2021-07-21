import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import http from './../../utils/httpClient';
import notify from './../../utils/notify';

const defaultForm = {
    email: null
}
export class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            validFrom: false,
            isSubmitting: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        });
        http.post('/auth/forgot-password', { body: this.state.data })
            .then((data) => {
                console.log('Front End ForGot Password >>>>> ',data);
                notify.showInfo('Password reset link sent to your email please check your inbox');
                this.props.history.push('/');
                this.setState({
                    isSubmitting: false
                });
            })
            .catch((err) => {
                this.setState({
                    isSubmitting: false
                });
                notify.handleError(err);
            });

    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((previousState) => ({
            data: {
                ...previousState.data,
                [name]: value
            }
        }), () => {
            this.validateError(name);
        })
    }


    validateError(fieldName) {
        let errMsg;
        switch (fieldName) {
            case 'email':
                errMsg = this.state.data.email
                    ? this.state.data.email.includes('@')
                        ? ''
                        : 'Not an Valid Email'
                    : 'Email is required';

                break;

            default:
                break;
        }
        this.setState((err) => ({
            error: {
                ...err.error,
                [fieldName]: errMsg
            }
        }), () => {
            this.validateForm();
        })
    }

    validateForm() {
        const errors = Object
            .values(this.state.error)
            .filter(val => val);

        if (!errors.length) {
            this.setState({
                validFrom: true
            });
        }
    }

    render() {

        let btn = this.state.isSubmitting
            ? <button disabled type="submit" className="btn btn-info" > Submitting...</button>
            : <button disabled={!this.state.validFrom} type="submit" className="btn btn-primary" >Submit</button>

        return (
            <>
                <h2>Forgot Password</h2>
                <p>Please enter your email</p>
                <form method="POST" className="form-group" onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input className="form-control" name="email" placeholder="abc@gmail.com" onChange={this.handleChange} type="text" />
                    <p>{this.state.error.email}</p>
                    <br />
                    {btn}
                </form>
                <p>
                    back to  <Link to="/">login</Link>
                </p>
            </>
        )
    }
}