import React from "react";

const IssueList = ({ issues }) => {
  if (issues.length === 0) return null;

  return (
    <div>
      <h2>Issue list</h2>
      <ul>
        {issues.map((i) => (
          <li key={i.id}>{i.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;
