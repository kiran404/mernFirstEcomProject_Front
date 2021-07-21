// assume this file is routing configuration
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Register } from './components/register/register.component';
import { Login } from './components/login/login.component';
import NavBar from './components/header/navbar.component';
import SideBar from './components/sidebar/sidebar.component';
import { Dashboard } from './components/dashboard/dashboard.component';
import { AddProduct } from './components/products/add-product.component';
import { ViewProduct } from './components/products/view-product.component';
import { EditProduct } from './components/products/edit-product.component';
import { SearchProduct } from './components/products/search-product.component';
import { ForgotPassword } from './components/forgot-password/forgot-password.component';
import { ResetPassword } from './components/reset-password/reset-password.component';

// import { ForgotPassword } from './components/forgot-password/forgot-password.component';
// import { ChatComponent } from './components/chat/chat.component';

class NotFound extends Component {

    render() {
        return (
            <div>
                <h2>Page Not Found</h2>
                <p>I am 404 Error handler page</p>
            </div>
        )
    }
}

const ProtectedRoute = ({ component: Component, ...data }) => {
    return (
        <Route {...data} render={(props) => {
            return (
                localStorage.getItem('token')
                    ? (
                        <>
                            <div className="navmenu">
                                <NavBar />
                            </div>
                            <div className="sidemenu">
                                <SideBar />
                            </div>
                            <Component {...props} />
                        </>
                    )
                    : (
                        <Redirect to="/" /> // TODO redirect will take additional props
                    )
            )
        }} />
    )
}
 


const appRouting = () => {
    return (
        <Router>
            <div>
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/forgot-password" component={ForgotPassword}></Route>
                        <Route path="/reset-password/:token" component={ResetPassword}></Route>
                        {/* <Route path="/about" component={About}></Route> */}
                        <ProtectedRoute path="/dashboard" component={Dashboard} />
                        <ProtectedRoute path="/product/add" component={AddProduct} />
                        <ProtectedRoute path="/product/edit/:id" component={EditProduct} />
                        <ProtectedRoute path="/product/view" component={ViewProduct} />
                        <ProtectedRoute path="/product/search" component={SearchProduct} />
                        {/* <ProtectedRoute path="/chat" component={ChatComponent} /> */}
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>

            </div>

        </Router >
    )
}

export default appRouting;