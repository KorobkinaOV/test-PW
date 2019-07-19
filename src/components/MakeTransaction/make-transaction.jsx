import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUsersForTransactions, makeTransaction } from 'api';
import AutocompleteCustom from './components/AutocompleteCustom';
import Button from './components/Button';
import { showModal, getToastrMessage, getUserInfo } from 'actions';
import { getUserInfoApi } from 'api';
import RenderModalBody from 'components/RenderModalBody';

class MakeTransaction extends Component {
  state = {
    value: '',
    items: [],
    amount: '',
  }

  onFiltred = (value) => {
    if (value.length){
      getUsersForTransactions({ filter: value }).then((res) => {
        this.setState({ items: res.data })
      })
    }
    this.setState({value});
  }

  makeTransaction = () => {
    const { value, amount } = this.state;
    const { getToastrMessage, showModal, getUserInfo } = this.props;
    makeTransaction({ name: value, amount}).then((res) => {
      if (res.data.trans_token) {
        getToastrMessage({ type: 'success', message: 'Transaction is success' });
        this.setState({ value: '' })
        showModal({ show: false });
        getUserInfoApi().then((res) => {
          const user = res.user_info_token;
          getUserInfo({ name: user.name, balance: user.balance });
        })
      }
    })
  }

  renderModalBody = () => {
    const { value } = this.state;
    return (
      <RenderModalBody value={value} changeAmount={this.changeAmount} onComplete={makeTransaction} />
    )
  };

  onButtonClick = (event) => {
    event.preventDefault();
    const { getToastrMessage, showModal } = this.props;
    if (this.state.value !== '') {
      showModal({
        show: true,
        title: 'Make transaction',
        btnLabel: 'Make transaction',
        body: this.renderModalBody,
        onComplete: this.makeTransaction,
      });
    } else {
      getToastrMessage({ type: 'warn', message: 'Select user for transaction' });
    }
  };

  selectValue = (value) => {
    this.setState({ value });
  };

  changeAmount = (value) => {
    this.setState({ amount: value });
  };

  render() {
    const { value, items } = this.state;

    return(
      <div className='mb-5 mt-4'>
        <h5>Choose users for transactions: </h5>
        <form onSubmit={this.onButtonClick}>
          <AutocompleteCustom
            onFiltred={this.onFiltred}
            value={value}
            selectValue={this.selectValue}
            onKeyPress={this.handleKeyPress}
            items={items} />
          <Button/>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  showModal,
  getToastrMessage,
  getUserInfo
}




export default connect(null, mapDispatchToProps)(MakeTransaction);