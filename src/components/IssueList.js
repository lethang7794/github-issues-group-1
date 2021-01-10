import React from "react";
import Issue from "./Issue";

const IssueList = ({ issues }) => {
  if (issues.length === 0) return null;

  return (
    <div>
      <h2>Issue list</h2>
      <ul className="issues">
        {issues.map((i) => (
          <Issue issue={i} />
        ))}
      </ul>
    </div>
  );
};

export default IssueList;
