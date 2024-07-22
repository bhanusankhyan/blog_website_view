import {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeletePost = ( {showDeleteModal, handleCancel, handleDelete, text, type} ) => {
  return(
    <Modal show={showDeleteModal} onHide={handleCancel} size={'l'}>
    <Modal.Header closeButton>
      <Modal.Title>Delete this {type}!!!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="mt-4 mb-4">
      {text}
    </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>

    </Modal.Footer>
    </Modal>
  )
}

export default DeletePost;
