import React from 'react';

const confirmDialog = ({ onConfirm, onCancel, text }) => {
  return (
    <div>
      <h5>{text}</h5>
      <button onClick={onConfirm}>Sí</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default confirmDialog;
