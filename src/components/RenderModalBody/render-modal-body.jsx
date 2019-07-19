import React from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions';

class RenderModalBody extends React.Component {
  state = {
    amountError: false,
    amount: ''
  }

  componentDidMount() {
    this.setState({ amount: this.props.amount });
  }

  render() {
    const { balance, value, changeAmount, onComplete, showModal } = this.props;
    const { amountError, amount } = this.state;

    const checkAmount = (value) => {
      if (balance < value) {
        this.setState({ amountError: true });
      } else {
        this.setState({
          amountError: false,
         });
         changeAmount(value);
      }

      this.setState({ amount: value });
    }

    return(
      <div>
        <div className="modal-body">
          <div>User: {value}</div>
          <div className='form-group pt-2'>
            <label>Enter PW amount: </label>
            <input
              className={`form-control ${amountError ? 'is-invalid' : ''}`}
              onChange={(e) => checkAmount(e.target.value)}
              value={amount}
              />
            { amountError &&
              <small className='text-danger'>
                Transaction amount not greater than the current balance
              </small>
            }
          </div>
        </div>
        <div className="modal-footer">
              <button
                type="button"
                onClick={onComplete}
                disabled={amountError}
                className="btn btn-primary">
                  Make transaction
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => showModal({ show: false })}
                data-dismiss="modal">
                  Close
              </button>
            </div>
      </div>
    );
  };
}

const mapStateToProps = ({ userInfo }) => {
  return {
    balance: userInfo.balance,
  }
}

const mapDispatchToProps = {
  showModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderModalBody);