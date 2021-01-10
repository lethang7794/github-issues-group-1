import React from "react";
import Moment from "react-moment";
import Label from "./Label";

const Issue = ({ issue, handleIssueClick }) => {
  if (!issue) return null;

  let id = issue.id;
  let number = issue.number;
  let title = issue.title;
  let owner = issue.user.login;
  let avatar_url = issue.user.avatar_url;
  let updated_at = issue.updated_at;
  let body = issue.body;
  let labels = issue.labels;
  // let comments = issue.comments;

  const truncateString = (str, num) => {
    if (!str) return null;
    if (str.length <= num) return str;
    return str.slice(0, num) + "...";
  };

  return (
    <li key={id} className="issue-item" onClick={() => handleIssueClick(issue)}>
      <img src={avatar_url} alt={`${owner}`} className="avatar mr-3" />
      <div className="content-body">
        <h4>
          <span className="title">{title}</span>
          <span className="number">#{number}</span>
          {labels.length >= 0 && (
            <ul className="labels reset">
              {labels.map((label) => (
                <Label label={label} />
              ))}
            </ul>
          )}
        </h4>
        <div className="">
          <div className="issue__body">{truncateString(body, 80)}</div>
        </div>
        <div>
          <span className="gray-text user-id">@{owner}</span>
          {/* <div className="description">{body}</div> */}
          <div className="time-and-comment gray-text">
            <span>
              <span className="last-updated">Last updated:</span>
              <Moment fromNow>{updated_at}</Moment>
            </span>
            {/* <span>comment {comments}</span> */}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Issue;

// [x] Issue Title with Number of the issue ~
// [x] Owner of the Issue ~
// [x] Owner Avatar ~
// [x] How long ago the issue was updated in a human-friendly format (e.g. 2 days ago) (Hint: react-moment)
// [x] Body of the Issue ~
// [x] Labels of the issue
