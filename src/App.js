import React from 'react';
import AppRoutes from './app.routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
// 
const App = () => {
    return (
        <div>
            <AppRoutes />
            <ToastContainer />
        </div>
    )
}

export default App;