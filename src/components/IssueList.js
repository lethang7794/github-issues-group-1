import React from "react";
import Moment from "react-moment";

const IssueList = ({ issues }) => {
  return (
    <>
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
                <span className="title">#{i.id}</span>
                <span className="title">{i.title}</span>
              </h4>
              <div className="sub-body">
                <span className="gray-text">@{i.user.login}</span>
                <div className="description">{i.body}</div>
                <div className="time-and-comment">
                  <span>
                    <Moment fromNow className="gray-text">
                      {i.updated_at}
                    </Moment>
                  </span>
                  <span className="gray-text">comment {i.comments}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default IssueList;

// Issue Title with Number of the issue ~
// Owner of the Issue ~
// Owner Avatar ~
// How long ago the issue was updated in a human-friendly format (e.g. 2 days ago) (Hint: react-moment)
// Body of the Issue ~
// Labels of the issue
