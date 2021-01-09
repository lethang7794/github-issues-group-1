import React from "react";
import Moment from "react-moment";
import Label from "./Label";

const Issue = ({ issue }) => {
  if (!issue) return null;

  let id = issue.id;
  let number = issue.number;
  let title = issue.title;
  let owner = issue.user.login;
  let avatar_url = issue.user.avatar_url;
  let updated_at = issue.updated_at;
  let body = issue.body;
  let labels = issue.labels;
  let comments = issue.comments;

  return (
    <li key={id} className="issue-item">
      <img src={avatar_url} alt={`${owner}`} className="avatar mr-3" />
      {/*Owner Avatar*/}
      <div className="content-body">
        <h4>
          {/* Issue Title with Number of the issue */}
          <span className="title">{title}</span>
          <span className="title">#{number}</span>
        </h4>
        <div className="">
          <span>@{owner}</span>
          <span>{comments}</span>
          <div>{body}</div>
          <span>
            <Moment fromNow>{updated_at}</Moment>
          </span>
          {labels.length > 0 && (
            <div>
              <p>Labels</p>
              <ul>
                {labels.map((label) => (
                  <Label label={label} />
                ))}
              </ul>
            </div>
          )}
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
