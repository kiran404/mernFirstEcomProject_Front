
import React from 'react';
import http from './../../utils/httpClient';
import notify from './../../utils/notify';
import { DefaultForm } from './add-product.component';

export class EditProduct extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            product: {
                ...DefaultForm
            },
            isSubmitting: false,
        }
    }

    handleChange = (e) => {
        const { type, name, checked } = e.target;
        let { value } = e.target;
        if (type === 'checkbox') {
            value = checked;
        }
        if (type === 'file') {
            value = e.target.files;
        }
        this.setState(previousState => ({
            product: {
                ...previousState.product,
                [name]: value
            }
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const productId = this.state.product._id;
        let url = `${process.env.REACT_APP_BASE_URL}/product/${productId}?token=${localStorage.getItem('token')}`
        this.setState({
            isSubmitting: true,
        });
        http.upload('PUT',url,this.state.product,this.state.product.update_image)
            .then((data) => {
                notify.showInfo('Product updated successfully');
                this.props.history.push('/product/view');
            })
            .catch(err => {
                this.setState({
                    isSubmitting: false
                });
                notify.handleError(err);
            })
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        http.get(`/product/${id}`, {}, true)
            .then((data) => {
                this.setState({
                    isLoading: false,
                    product: data
                })
            })
            .catch(err => notify.handleError(err));
    }

    render() {
        let imgUrl = `${process.env.REACT_APP_IMG_URL}${this.state.product.image}`
        let button = this.state.isSubmitting
            ? <button type="submit" disabled className="btn btn-info">submitting...</button>
            : <button type="submit" className="btn btn-primary">Submit</button>
        let discountDetails = this.state.product.discountedItem
            ? <div>
                <label htmlFor="discountType">Disocunt Type</label>
                <input className="form-control" id="discountType" type="text" value={this.state.product.discountType} placeholder="discountType" name="discountType" onChange={this.handleChange} />
                <label htmlFor="discountValue">Discount Value</label>
                <input className="form-control" id="discountValue" type="text" value={this.state.product.discountValue} placeholder="discountValue" name="discountValue" onChange={this.handleChange} />
            </div>
            : '';

        let content = this.state.isLoading
            ? <p>Show some beautiful loader</p>
            : <form className="form-group" onSubmit={this.handleSubmit} noValidate>
                <label htmlFor="name">name</label>
                <input className="form-control" id="name" type="text" value={this.state.product.name} placeholder="name" name="name" onChange={this.handleChange} />
                <label htmlFor="category">category</label>
                <input className="form-control" id="category" type="text" value={this.state.product.category} placeholder="category" name="category" onChange={this.handleChange} />
                <label htmlFor="brand">brand</label>
                <input className="form-control" id="brand" type="text" value={this.state.product.brand} placeholder="brand" name="brand" onChange={this.handleChange} />
                <label htmlFor="description">description</label>
                <input className="form-control" id="description" type="text" value={this.state.product.description} placeholder="description" name="description" onChange={this.handleChange} />
                <label htmlFor="price">price</label>
                <input className="form-control" id="price" type="text" value={this.state.product.price} placeholder="price" name="price" onChange={this.handleChange} />
                <label htmlFor="color">color</label>
                <input className="form-control" id="color" type="text" value={this.state.product.color} placeholder="color" name="color" onChange={this.handleChange} />
                <label htmlFor="weight">weight</label>
                <input className="form-control" id="weight" type="text" value={this.state.product.weight} placeholder="weight" name="weight" onChange={this.handleChange} />
                <label htmlFor="tags">tags</label>
                <input className="form-control" id="tags" type="text" value={this.state.product.tags} placeholder="tags" name="tags" onChange={this.handleChange} />
                <label htmlFor="manuDate">manuDate</label>
                <input className="form-control" id="manuDate" type="text" value={this.state.product.manuDate} placeholder="manuDate" name="manuDate" onChange={this.handleChange} />
                <label htmlFor="expiryDate">expiryDate</label>
                <input className="form-control" id="expiryDate" type="text" value={this.state.product.expiryDate} placeholder="expiryDate" name="expiryDate" onChange={this.handleChange} />
                <input id="discountedItem" type="checkbox" value={this.state.product.discountedItem} placeholder="discountedItem" name="discountedItem" onChange={this.handleChange} />
                <label htmlFor="discountedItem">Discounted Item</label>
                {discountDetails}
                <br />
                <p>Image</p>
                <img src={imgUrl} alt="product_image" width="150px"></img>
                <hr />
                <label>Choose Image</label>
                <input type="file" name="update_image" onChange={this.handleChange}></input>
                <br />
                {button}
            </form>
        return (
            <>
                <h2>Edit Product</h2>
                {content}
            </>
        )
    }
}