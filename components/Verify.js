import React, { useState } from 'react';
import VerifyModal from './verifyModal';
import ConfirmDialog from './confirmDialog';

const Verify = ({ isOpen, onRequestClose, onConfirm, text }) => {
  return (
    <VerifyModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ConfirmDialog onConfirm={onConfirm} onCancel={onRequestClose} text={text} />
    </VerifyModal>
  );
};

export default Verify;
