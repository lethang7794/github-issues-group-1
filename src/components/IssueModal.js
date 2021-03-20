import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Comment from './Comment';

const IssueModal = ({ showModal, handleCloseModal, issue }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (issue && issue.comments_url) {
        let result = await fetch(issue.comments_url);
        let json = await result.json();
        setComments(json);
      }
    }
    fetchData();
  }, [issue]);

  return (
    <Modal className='Modal' show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{issue.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Comment comment={issue} />

        <div className='Comments'>
          {comments.map((c, idx) => (
            <Comment comment={c} key={idx} />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IssueModal;
