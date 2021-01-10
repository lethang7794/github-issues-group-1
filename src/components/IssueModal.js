import React from "react";
import { Modal, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
const IssueModal = ({ i, showModal, handleClose }) => {
  console.log(i);
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {i.number}, @ {i.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMarkdown>{i.body}</ReactMarkdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IssueModal;
