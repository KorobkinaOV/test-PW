import React from 'react';
import { connect } from 'react-redux';

import { getTransactionsList, makeTransaction, getUserInfoApi } from 'api';
import { showModal, getToastrMessage, getUserInfo } from 'actions';
import RenderModalBody from 'components/RenderModalBody';
import TableTransactions from './components/TableTransactions';


class TransactionsList extends React.Component {
  state = {
    data: [],
    selectName: '',
    amount: ''
  }

  componentDidMount() {
    getTransactionsList().then((res) => {
      this.setState({ data: res.trans_token });
    })
  }

  repeatTransaction = (name, amount) => {
    const { showModal } = this.props;
    this.setState({ selectName: name, amount: amount * (-1)});
    showModal({
      show: true,
      title: 'Make transaction',
      btnLabel: 'Make transaction',
      body: () => this.renderModalBody(name, amount * (-1)),
      onComplete: this.makeTransaction,
    });
  }

  makeTransaction = () => {
    const { selectName, amount } = this.state;
    const { getToastrMessage, showModal, getUserInfo } = this.props;
    makeTransaction({ name: selectName, amount}).then((res) => {
      if (res.data.trans_token) {
        getToastrMessage({ type: 'success', message: 'Transaction is success' });
        this.setState({ selectName: '' });
        showModal({ show: false });
        getUserInfoApi().then((res) => {
          const user = res.user_info_token;
          getUserInfo({ name: user.name, balance: user.balance });
        })
      }
    })
  }

  renderModalBody = (name, amount) => {
    return (
      <RenderModalBody
        value={name}
        changeAmount={this.changeAmount}
        onComplete={this.makeTransaction}
        amount={amount} />
    )
  };

  changeAmount = (value) => {
    this.setState({ amount: value });
  };

  render() {
    const { data } = this.state;
    return(
      data && data.length > 0
        ? <TableTransactions data={data} repeatTransaction={this.repeatTransaction} />
        : <h6>You have no transactions yet.</h6>
    );
  }
};

const mapDispatchToProps = {
  showModal,
  getToastrMessage,
  getUserInfo
}

export default connect(null, mapDispatchToProps)(TransactionsList);