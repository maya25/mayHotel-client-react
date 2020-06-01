import React from "react";
import Modal from "react-modal";
import "./CancelModel.scss";
import Box from '../Box/Box';

export default ({ title, text, open, onClose, onConfirm }) => (
  <>
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="cancel-modal-container"
    >
      <div className="cancel-modal">
        <div className="cancel-modal-header">
          <h3 className="cancel-modal-title">{title}</h3>
        </div>
        <div className="cancel-modal-content">
          <Box>
            <p className="cancel-modal-text">{text}</p>
          </Box>
        </div>
        <div className="cancel-modal-button-container">
          <button className="close-modal-button" onClick={onClose}>ביטול</button>
          <button className="confirm-modal-button" onClick={onConfirm}>אישור</button>
        </div>
      </div>
    </Modal>
  </>
);