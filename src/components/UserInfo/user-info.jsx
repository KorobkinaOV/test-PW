import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// import { getUserInfoApi } from 'api';
// import { getUserInfo } from 'actions';

const SpanStyled = styled.span`
  font-size: 18px;
`;

const DataStyle = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

class UserInfo extends React.Component {

  render() {
    const { name, balance } = this.props;
    return(
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex pr-3'>
          <SpanStyled>Name: </SpanStyled>
          <DataStyle className='pl-3'>{name}</DataStyle>
        </div>
        <div className='d-flex'>
          <SpanStyled>Balance: </SpanStyled>
          <DataStyle className='pl-3'>{balance} PW</DataStyle>
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ userInfo }) => {
  return {
    name: userInfo.name,
    balance: userInfo.balance
  }
}

export default connect(mapStateToProps)(UserInfo);