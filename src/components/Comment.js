import React from 'react';
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';

const Comment = ({ comment, key }) => {
  let avatar_url = comment?.user?.avatar_url;
  let owner = comment?.user?.login;
  let updated_at = comment.updated_at;
  let body = comment.body;

  return (
    <div key={key} className='d-flex my-3 '>
      <div className='avatar mr-3'>
        <img src={avatar_url} alt={`${owner}`} />
      </div>
      <div
        className='rounded'
        style={{
          overflow: 'auto',
          wordBreak: 'normal',
          border: '1px solid rgba(0,0,0,.2)',
        }}
      >
        <div className='px-3 py-1 border-bottom'>
          <span style={{ fontWeight: 'bold' }}>{owner}</span>
          <span style={{ color: 'gray' }}> commented </span>
          <Moment fromNow style={{ color: 'gray' }}>
            {updated_at}
          </Moment>
        </div>
        <ReactMarkdown className='px-3 py-2'>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Comment;
