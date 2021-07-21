import React, { Component } from 'react';
import http from './../../utils/httpClient';
import notify from './../../utils/notify';

const defaultForm = {
    password: '',
    confirmPassword: ''
}
export class ResetPassword extends Component {
    id;
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            validForm: false,
            isSubmitting: false,
        }
    }
    componentDidMount() {
        this.id = this.props.match.params['token']
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((pre) => ({
            data: {
                ...pre.data,
                [name]: value
            }
        }), () => this.validateErrors(name))
    }

    validateErrors(fieldName) {
        let err;
        switch (fieldName) {
            case 'password':
                err = this.state.data[fieldName]
                    ? this.state.data[fieldName].length > 2
                        ? ''
                        : "Weak Password"
                    : 'Password is required';
                break;
            case 'confirmPassword':
                err = this.state.data[fieldName]
                    ? this.state.data[fieldName] === this.state.data.password
                        ? ''
                        : "Confrim Password did not match"
                    : 'Confirm Password is required';
                break;
            default:
                break;
        }

        this.setState((pre) => ({
            error: {
                ...pre.error,
                [fieldName]: err
            }
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault();

        http.post(`/auth/reset-password/${this.id}`, { body: this.state.data })
            .then((data) => {
                notify.showSuccess('Password reset Successfull please login');
                this.props.history.push('/');
            })
            .catch((err) => {
                notify.handleError(err);
            })
    }

    render() {
        return (
            <>
                <h2>Reset Password</h2>
                <p>Choose your password wisely</p>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label>Password</label>
                    <input className="form-control" placeholder="Password" name="password" type="password" onChange={this.handleChange} ></input>
                    <p className="danger">{this.state.error.password}</p>
                    <label>Confirm Password</label>
                    <input className="form-control" placeholder="Password" name="confirmPassword" type="password" onChange={this.handleChange} ></input>
                    <p className="danger">{this.state.error.confirmPassword}</p>
                    <br />
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </>
        )
    }

}