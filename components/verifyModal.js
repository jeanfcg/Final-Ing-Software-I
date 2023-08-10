import React from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const verifyModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmación"
      ariaHideApp={false}
      className="modal-dialog"
    >
      <div className="modal-content container">
        {children}
      </div>
    </Modal>
  );
};

export default verifyModal;
