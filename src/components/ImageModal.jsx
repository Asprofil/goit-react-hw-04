import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal isOpen={!!image} onRequestClose={onClose}>
      <button onClick={onClose}>Close</button>
      <img src={image.urls.regular} alt={image.alt_description} />
      <p>Author: {image.user.name}</p>
      <p>Likes: {image.likes}</p>
      <p>{image.description}</p>
    </Modal>
  );
};

export default ImageModal;
