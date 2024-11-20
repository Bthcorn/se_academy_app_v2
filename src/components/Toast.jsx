import React from 'react'
import toast from 'react-hot-toast'

const Toast = (message, type
) => {
    switch (type) {
        case 'success':
            return toast.success(message)
        case 'error':
            return toast.error(message)
        case 'loading':
            return toast.loading(message)
        default:
            return toast(message)
    }
}

export default Toast