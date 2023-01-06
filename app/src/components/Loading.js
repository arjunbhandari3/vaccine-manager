import React from "react";

const Loading = () => {
  return (
    <div className="loader black" data-testid="loading">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
};

export default Loading;
