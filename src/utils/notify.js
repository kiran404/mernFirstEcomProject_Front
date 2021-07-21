import { toast } from 'react-toastify'

const showSuccess = (msg) => {
    toast.success(msg);
}

const showInfo = (msg) => {
    toast.info(msg);
}

const showWarning = (msg) => {
    toast.warn(msg);
}
const showError = (errMsg) => {
    toast.error(errMsg);
}

const handleError = (error) => {
    // debugger;
    // collect error from entire application
    // check for error
    // parse error message
    // show appropriate error message
    const err = error && error.response && error.response.data;
    if (err) {
        if (typeof (err.msg) == 'string') {
            showError(err.msg)
        }
    }
}

export default {
    showInfo,
    showSuccess,
    showWarning,
    handleError
}