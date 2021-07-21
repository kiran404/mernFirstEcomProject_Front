import React from 'react';
import http from './../../utils/httpClient';
import notify from './../../utils/notify';
import { Link } from 'react-router-dom';

export class ViewProduct extends React.Component {

    constructor() {
        super();
        this.state = {
            products: [],
            isLoading: false,
            hideActions: false
        }

    }

    componentDidMount() {
        // life cycle of component
        if (this.props.data) {
            this.setState({
                products: this.props.data,
                hideActions: true,
            })
        } else {
            http.get('/product', {}, true)
                .then((data) => {
                    console.log('products >>', data);
                    this.setState({
                        products: data,
                    })
                })
                .catch((err) => {
                    notify.handleError(err);
                })
        }

    }

    handleEdit = (e) => {
        e.preventDefault();

    }

    handleDelete = (id, i) => {
        console.log('id >>', id);
        http.delete(`/product/${id}`, {}, true)
            .then((data) => {
                notify.showInfo('Product removed successfully');
                const { products } = this.state;
                products.splice(i, 1);
                this.setState({ products });
            })
            .catch((err) => {
                notify.handleError(err);
            })
        // e.preventDefault();
        // let confirmation = confirm('Are you sure to remove ?');
        // if (confirmation) {
        //     alert('proceed with delete');
        // }

    }

    render() {
        let imgUrl = process.env.REACT_APP_IMG_URL;

        // let data = this.state.products ? this.state.products.map((product, i) => {
        let data = this.state.products.map((product, i) => {
            let redirectURL = `/product/edit/${product._id}`;
            let img_url = `${imgUrl}${product.image}`
            let btn = this.state.hideActions
                ? ''
                : <>
                    <Link to={redirectURL}>
                        <button className="btn btn-info">
                            edit
                    </button>
                    </Link>
                    <button className="btn btn-danger" onClick={() => this.handleDelete(product._id, i)} >
                        del
                </button>
                </>

            return (
                <tr key={product._id}>
                    <td>{i + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.color ? product.color : 'N/A'}</td>
                    <td>
                        <img src={img_url} alt="product_img.png" width="200px"></img>
                    </td>
                    <td>
                        {btn}
                    </td>
                </tr >
            )
        })
    return (
            <div>
                <h2>View Products</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Color</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </div >
        )
    }
}