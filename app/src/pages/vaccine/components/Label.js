import React from "react";

const Label = ({ label, isCompulsory = false }) => {
  return (
    <div className="form-label">
      {label}
      {isCompulsory && <span className="form-label--required">*</span>}
    </div>
  );
};

export default Label;
