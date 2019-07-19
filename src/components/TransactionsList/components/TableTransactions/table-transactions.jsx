import React from 'react';
import styled from 'styled-components';

import RepeatImg from 'images/refresh.svg';

const Repeat = styled.img`
  width: 20px;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  max-height: 600px;
`;

const TableTransactions = ({ data, repeatTransaction }) => {
  return(
    <TableWrapper className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date/Time</th>
            <th scope="col">Correspondent Name</th>
            <th scope="col">Transaction amount</th>
            <th scope="col">Resulting balance</th>
            <th scope="col">Repeat transaction</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.username}</td>
                <td>{item.amount} PW</td>
                <td>{item.balance} PW</td>
                <td>
                  {
                    item.amount < 0
                    ? <Repeat
                        src={RepeatImg}
                        onClick={() => repeatTransaction(item.username, item.amount)} />
                    : null
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </TableWrapper>
  );
}

export default TableTransactions;