import React from "react";
import { Modal, Button } from "react-bootstrap";

const IssueModal = ({ showModal, handleCloseModal, selectedIssue }) => {
  if (selectedIssue === null) return null;
  let issue = selectedIssue;
  return (
    <Modal show={showModal} onHide={handleCloseModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{issue.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCloseModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IssueModal;
