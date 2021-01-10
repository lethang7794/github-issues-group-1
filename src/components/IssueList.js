import React from "react";
import Moment from "react-moment";

const IssueList = ({ issues, handleIssueClick }) => {
  return (
    <div>
      {/* <h2>{issues.id} Issue list</h2> */}
      <ul className="issues">
        {issues.map((i) => (
          <a id="noUnderline" href="#" onClick={() => handleIssueClick(i)}>
            <li key={i.number} className="issue-item">
              <img
                src={i.user.avatar_url}
                alt="User Avatar"
                class="avatar mr-3"
              ></img>{" "}
              {/*Owner Avatar*/}
              <div className="content-body">
                <h4>
                  {/* Issue Title with Number of the issue */}
                  <span className="title">#{i.id}</span>
                  <span className="title">{i.title}</span>
                </h4>
                <div>
                  <span className="gray-text user-id">@{i.user.login}</span>
                  <div className="description">{i.body}</div>
                  <div className="time-and-comment gray-text">
                    <span>
                      <span className="last-updated">Last updated:</span>
                      <Moment fromNow>{i.updated_at}</Moment>
                    </span>
                    <span>comment {i.comments}</span>
                  </div>
                </div>
              </div>
            </li>
          </a>
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
