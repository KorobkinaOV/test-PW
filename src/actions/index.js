export const getToastrMessage = ({ type, message}) => {
  return {
    type: 'GET_TOASTR_MESSAGE',
    payload: { type, message }
  }
}

export const showModal = (values) => {
  return {
    type: 'SHOW_MODAL',
    payload: values,
  }
}

export const getUserInfo = (values) => {
  return {
    type: 'GET_USER_INFO',
    payload: values
  }
}