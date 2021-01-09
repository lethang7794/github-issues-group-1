import React from "react";

const Label = ({ label }) => (
  <li
    key={label.id}
    className="Label"
    style={{ backgroundColor: `#${label.color}` }}
  >
    {label.name}
  </li>
);

export default Label;
