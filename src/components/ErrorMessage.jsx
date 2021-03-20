import React from 'react';
import Alert from 'react-bootstrap/Alert';

// Check the error type, status from error array and show whatever we want.
const ErrorMessage = ({ error }) => {
  let message;

  if (error[0] === 'response') {
    message = `${error[1]}${!!error[2] ? ` - ${error[2]}` : ''}`;
  }
  if (error[0] === 'fetch') {
    message = `Can't connect to the server!`;
  }

  return (
    <Alert variant='danger'>
      <div className='error-message-wrapper'>{message}</div>
    </Alert>
  );
};

export default ErrorMessage;
