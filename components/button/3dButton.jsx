import React from "react";
// import "./Button.css"; // Import the CSS file containing the button styles

const ReactButton = ({handleCheckStatus,label}) => {
  return (
    <button className="pushable" onClick={handleCheckStatus}>
      <span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">
        {label}
      </span>
    </button>
  );
};

export default ReactButton;
