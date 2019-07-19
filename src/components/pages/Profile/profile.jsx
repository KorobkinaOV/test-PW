import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LogOut from 'images/logout.svg';
import TransactionsList from 'components/TransactionsList';
import UserInfo from 'components/UserInfo';
import MakeTransaction from 'components/MakeTransaction';
import { getUserInfo } from 'actions';
import { getUserInfoApi } from 'api';

const LogOutImg = styled.img`
  width: 30px;
  cursor: pointer;
`;

const Profile = ({ history, getUserInfo }) => {

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }

  getUserInfoApi().then((res) => {
    const user = res.user_info_token;
    getUserInfo({ name: user.name, balance: user.balance });
  })

  return(
    <div className='container'>
      <div className='d-flex justify-content-between pt-3'>
        <h2>Parrot Wings</h2>
        <UserInfo />
        <LogOutImg
          src={LogOut}
          onClick={logout}
          alt='logout' />
      </div>
      <MakeTransaction />
      <TransactionsList />
    </div>
  );
}

const mapDispatchToProps = {
  getUserInfo,
}

export default withRouter(connect(null, mapDispatchToProps)(Profile));