const initialState = {
  toastrMessage: {},
  showModal: {
    show: false,
    title: '',
    btnLabel: '',
    body: () => null,
    onComplete: () => null,
  },
  userInfo: {
    name: '',
    balance: 0
  }
}

const reducer = (state = initialState, action) => {
  const { showModal } = state;
  switch (action.type) {
    case 'GET_TOASTR_MESSAGE':
      return {
        ...state,
        toastrMessage: action.payload
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        ...showModal,
        showModal: action.payload
      };
    case 'GET_USER_INFO':
      return {
        ...state,
        userInfo: action.payload
      }
    default:
      return state;
  }
}

export default reducer;