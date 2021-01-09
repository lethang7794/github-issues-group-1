import React from "react";
import Moment from "react-moment";

const IssueList = ({ issues }) => {
  return (
    <div>
      <h2>{issues.id} Issue list</h2>
      <ul>
        {issues.map((i) => (
          <li key={i.id} className="issue-item">
            <img
              src={i.user.avatar_url}
              alt="User Avatar"
              class="avatar mr-3"
            ></img>{" "}
            {/*Owner Avatar*/}
            <div className="content-body">
              <h4>
                {/* Issue Title with Number of the issue */}
                <span className="title">{i.id}</span>
                <span className="title">{i.title}</span>
              </h4>
              <div className="">
                <span>@{i.user.login}</span>
                <span>{i.comments}</span>
                <div>{i.body}</div>
                <span>
                  <Moment fromNow>{i.updated_at}</Moment>
                </span>
                <div>Labels of the issue</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;

// Issue Title with Number of the issue ~
// Owner of the Issue ~
// Owner Avatar ~
// How long ago the issue was updated in a human-friendly format (e.g. 2 days ago) (Hint: react-moment)
// Body of the Issue ~
// Labels of the issue
