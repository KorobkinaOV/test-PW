import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';

const Toastr = ({ toastrMessage }) => {
  const notify = ({message, type}) => {
    switch(type) {
      case 'error':
        return toast.error(message);

      case 'success':
        return toast.success(message)

      case 'warn':
        return toast.warn(message)

      case 'info':
        return toast.info(message)

      default:
        return null
    }
  }

  if (toastrMessage !== {}){
    notify(toastrMessage);
  }
  return(
    <ToastContainer />
  );
}

const mapDispatchToProps = ({ toastrMessage }) => {
  return {toastrMessage};
}

export default connect(mapDispatchToProps)(Toastr);