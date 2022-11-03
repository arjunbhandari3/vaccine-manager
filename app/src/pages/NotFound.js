import { Link } from "react-router-dom";

export const NotFound = (props) => {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <Link to="/">Return to home</Link> or try again.
      </p>
    </div>
  );
};
