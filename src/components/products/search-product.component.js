import React from 'react';
import http from './../../utils/httpClient';
import notify from './../../utils/notify';
import { ViewProduct } from './view-product.component';

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

export class SearchProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                ...DefaultForm
            },
            error: {
                ...DefaultForm
            },
            validForm: false,
            isSubmitting: false,
            isLoading: false,
            categories: [],
            showName: false,
            allProducts: [],
            searchResult: [],
        }
    }

    componentDidMount() {
        http.get('/product/search', { body: {} }, true)
            .then((data) => {
                let categories = [];
                (data || []).forEach((item, i) => {
                    if (categories.indexOf(item.category) === -1) {
                        categories.push(item.category);
                    }
                });
                this.setState({
                    categories,
                    allProducts: data,
                });
            })
    }

    handleChange = (e) => {
        const { type, checked, name } = e.target;
        let { value } = e.target;
        if (type === 'checkbox') {
            value = checked;
        }
        if (name === 'category') {
            this.setState({
                showName: true
            })
        }
        let toDate = (name === 'multipleDateRange' && value === false)
            ? null
            : value

        this.setState((previousState) => ({
            data: {
                ...previousState.data,
                [name]: value,
                toDate: toDate
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
        e.preventDefault();
        // this.setState({
        //     isSubmitting: true
        // })
        http.post('/product/search', { body: this.state.data }, true)
            .then((data) => {
                if (!data.length) {

                    notify.showSuccess("no any product matched your search query");
                } else {
                    this.setState({
                        searchResult: data
                    });
                }
            })
            .catch(err => {
                this.setState({ isSubmitting: false });
                notify.handleError(err)
            });
    }

    searchAgain = (e) => {
        this.setState({
            searchResult: [],
        })
    }


    // mandatory method for stateful components
    render() {
        let selectOptions = this.state.categories.map((item, i) => (
            <option key={i} value={item}>{item}</option>
        ))
        let selectOptionsForName = this.state.allProducts
            .filter(item => item.category === this.state.data.category)
            .map((item, i) => (
                <option key={i} value={item.name}>{item.name}</option>
            ))

        // sake samma application ko logic render vitra
        let button = this.state.isSubmitting
            ? <button type="submit" disabled className="btn btn-info">submitting...</button>
            : <button disabled={!this.state.validForm} type="submit" className="btn btn-primary">Submit</button>

        let nameContent = <div>
            <label htmlFor="name">name</label>
            <select name="name" className="form-control" onChange={this.handleChange}>
                <option selected disabled value="">(Select Name)</option>
                {selectOptionsForName}
            </select>
            <p>{this.state.error.name}</p>
        </div>


        let name = this.state.showName
            ? nameContent
            : '';

        let toDateContent = <div>
            <label htmlFor="toDate">To Date</label>
            <input className="form-control" id="toDate" type="date" name="toDate" onChange={this.handleChange} />
        </div>
        let toDate = this.state.data.multipleDateRange
            ? toDateContent
            : '';
        // show search result
        let mainContent = !this.state.searchResult.length
            ? <div>
                <h2>Search Product</h2>
                <form className="form-group" onSubmit={this.handleSubmit} noValidate>
                    <label htmlFor="category">category</label>
                    <select name="category" className="form-control" onChange={this.handleChange}>
                        <option defaultValue="selected" disabled value="">(Select Category)</option>
                        {selectOptions}
                    </select>
                    <p>{this.state.error.category}</p>
                    {name}
                    <label htmlFor="brand">brand</label>
                    <input className="form-control" id="brand" type="text" placeholder="brand" name="brand" onChange={this.handleChange} />
                    <label htmlFor="minPrice">Min Price</label>
                    <input className="form-control" id="minPrice" type="text" placeholder="Min Price" name="minPrice" onChange={this.handleChange} />
                    <label htmlFor="maxPrice">Max Price</label>
                    <input className="form-control" id="maxPrice" type="text" placeholder="Max Price" name="maxPrice" onChange={this.handleChange} />
                    <label htmlFor="color">color</label>
                    <input className="form-control" id="color" type="text" placeholder="color" name="color" onChange={this.handleChange} />
                    <label htmlFor="weight">weight</label>
                    <input className="form-control" id="weight" type="text" placeholder="weight" name="weight" onChange={this.handleChange} />
                    <label htmlFor="tags">tags</label>
                    <input className="form-control" id="tags" type="text" placeholder="tags" name="tags" onChange={this.handleChange} />
                    <label htmlFor="fromDate">From Date</label>
                    <input className="form-control" id="fromDate" type="date" name="fromDate" onChange={this.handleChange} />
                    <input type="checkbox" id="multipleDateRange" name="multipleDateRange" onChange={this.handleChange} />
                    <label htmlFor="multipleDateRange">Multiple Date Range</label>
                    {toDate}
                    <br />
                    {button}
                </form>
            </div>
            : <div>
                <button className="btn btn-success" onClick={this.searchAgain} >search again</button>
                <ViewProduct data={this.state.searchResult} />
            </div>

        return (
            mainContent
        )
    }
}