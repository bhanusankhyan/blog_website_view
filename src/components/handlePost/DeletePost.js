import {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeletePost = ( {showDeleteModal, handleCancel, handleDelete} ) => {
  return(
    <Modal show={showDeleteModal} onHide={handleCancel} size={'xl'}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure want to delete this post.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleDelete}>
        Delete
      </Button>

    </Modal.Footer>
    </Modal>
  )
}

export default DeletePost;
