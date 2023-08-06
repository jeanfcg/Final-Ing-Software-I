import React, { useState } from 'react';
import verifyModal from './verifyModal';
import confirmDialog from './confirmDialog';

const verify = ({ isOpen, onRequestClose, onConfirm, text }) => {
  return (
    <verifyModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <confirmDialog onConfirm={onConfirm} onCancel={onRequestClose} text={text} />
    </verifyModal>
  );
};

export default verify;
