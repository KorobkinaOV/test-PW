import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { showModal } from 'actions';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0,0,0,0.4);
  left: 0;
  top: 0;
`;

const Modal = ({ showModal, title, body, btnLabel, onComplete }) => {
  console.log(body);
  return(
    <Wrapper>
      <div className="modal d-block" tabIndex="1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => showModal({ show: false })}
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {body()}
          </div>
        </div>
      </div>
    </ Wrapper>
  );
};

const mapDispatchToProps = {
  showModal,
}

const mapStateToProps = ({ showModal }) => {
  return {
    title: showModal.title ,
    body: showModal.body,
    btnLabel: showModal.btnLabel,
    onComplete: showModal.onComplete
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);