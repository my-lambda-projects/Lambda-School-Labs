import React from "react";

const AnotherButton = ({ label, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default AnotherButton;
