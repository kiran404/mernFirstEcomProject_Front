import React from 'react';
import http from './../../utils/httpClient';
import notify from './../../utils/notify';


export const DefaultForm = {
    name: null,
    category: null,
    description: null,
    brand: null,
    price: null,
    image: null,
    color: null,
    batchNo: null,
    manuDate: null,
    expiryDate: null,
    origin: null,
    discountedItem: null,
    discountType: null,
    discountValue: null,
    weight: null,
    tags: null,
}

export class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            },
            error: {
            },
            validForm: false,
            isSubmitting: false
        }
    }

    handleChange = (e) => {
        const { type, checked, name } = e.target;
        let { value } = e.target;
        if (type === 'checkbox') {
            value = checked;
        }
        if (type === 'file') {
            value = e.target.files;
        }

        this.setState((previousState) => ({
            data: {
                ...previousState.data,
                [name]: value
            }
        }), () => {
            this.validateErrors(name);
        })
    }
    validateErrors(fieldName) {
        let error;

        // prepare logic
        switch (fieldName) {
            case 'name':
                error = this.state.data[fieldName].length ? '' : 'Name is required'
                break;
            case 'category':
                error = this.state.data[fieldName].length ? '' : 'Category is required'
                break;
            default:
                break;
        }

        this.setState((previousState) => ({
            error: {
                ...previousState.error,
                [fieldName]: error
            }
        }), () => {
            this.validateForm();
        });
    }

    validateForm() {
        var errors = Object
            .values(this.state.error)
            .filter(err => err);

        this.setState({
            validForm: errors.length === 0,
        })
    }

    handleSubmit = (e) => {
        let url = `${process.env.REACT_APP_BASE_URL}/product?token=${localStorage.getItem('token')}`;

        e.preventDefault();
        this.setState({
            isSubmitting: true
        })

        http.upload("POST", url, this.state.data, this.state.data.image)
            .then((data) => {
                console.log('check data BBBB: ', data); // yo data ma dataheru aayeko xaki xaina 
                notify.showSuccess('Proudct Added Successfully');
                this.props.history.push('/product/view');
            })
            .catch((err) => {
                notify.handleError(err);
            })
        // http.post('/product', { body: this.state.data }, true)
        //     .then(() => {
        //         notify.showSuccess("product added successfully");
        //         this.props.history.push('/product/view');
        //     })
        //     .catch(err => {
        //         this.setState({ isSubmitting: false });
        //         notify.handleError(err)
        //     });
    }
    
    
    // mandatory method for stateful components
    render() {
        // sake samma application ko logic render vitra
        let button = this.state.isSubmitting
            ? <button type="submit" disabled className="btn btn-info">submitting...</button>
            : <button disabled={!this.state.validForm} type="submit" className="btn btn-primary">Submit</button>

        let discountDetails = this.state.data.discountedItem
            ? <div>
                <label htmlFor="discountType">Disocunt Type</label>
                <input className="form-control" id="discountType" type="text" placeholder="discountType" name="discountType" onChange={this.handleChange} />
                <label htmlFor="discountValue">Discount Value</label>
                <input className="form-control" id="discountValue" type="text" placeholder="discountValue" name="discountValue" onChange={this.handleChange} />
            </div>
            : '';

        return (
            <div>
                <h2>Add Product</h2>
                <p>Please insert the data in the given form</p>
                <form className="form-group" onSubmit={this.handleSubmit} noValidate>
                    <label htmlFor="name">name</label>
                    <input className="form-control" id="name" type="text" placeholder="name" name="name" onChange={this.handleChange} />
                    <p>{this.state.error.name}</p>
                    <label htmlFor="category">category</label>
                    <input className="form-control" id="category" type="text" placeholder="category" name="category" onChange={this.handleChange} />
                    <p>{this.state.error.category}</p>
                    <label htmlFor="brand">brand</label>
                    <input className="form-control" id="brand" type="text" placeholder="brand" name="brand" onChange={this.handleChange} />
                    <label htmlFor="description">description</label>
                    <input className="form-control" id="description" type="text" placeholder="description" name="description" onChange={this.handleChange} />
                    <label htmlFor="price">price</label>
                    <input className="form-control" id="price" type="text" placeholder="price" name="price" onChange={this.handleChange} />
                    <label htmlFor="color">color</label>
                    <input className="form-control" id="color" type="text" placeholder="color" name="color" onChange={this.handleChange} />
                    <label htmlFor="weight">weight</label>
                    <input className="form-control" id="weight" type="text" placeholder="weight" name="weight" onChange={this.handleChange} />
                    <label htmlFor="tags">tags</label>
                    <input className="form-control" id="tags" type="text" placeholder="tags" name="tags" onChange={this.handleChange} />
                    <label htmlFor="manuDate">manuDate</label>
                    <input className="form-control" id="manuDate" type="text" placeholder="manuDate" name="manuDate" onChange={this.handleChange} />
                    <label htmlFor="expiryDate">expiryDate</label>
                    <input className="form-control" id="expiryDate" type="text" placeholder="expiryDate" name="expiryDate" onChange={this.handleChange} />
                    <input id="discountedItem" type="checkbox" placeholder="discountedItem" name="discountedItem" onChange={this.handleChange} />
                    <label htmlFor="discountedItem">Discounted Item</label>
                    {discountDetails}
                    <br />
                    <label htmlFor="image">Choose Image</label>
                    <input id="image" type="file" name="image" onChange={this.handleChange} className="form-control"></input>

                    <br />
                    {button}
                </form>
            </div>
        )
    }
}