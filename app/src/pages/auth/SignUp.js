import React from "react";
import { Link } from "react-router-dom";

import AuthForm from "./components/AuthForm";
import useDocumentTitle from "hooks/useDocumentTitle";

import * as routes from "constants/routes";

const SignUp = () => {
  useDocumentTitle("Sign Up");

  return (
    <div className="auth-container">
      <div>
        <h1 className="header-title">Sign Up</h1>
      </div>
      <AuthForm isSignUp={true} />
      <div>
        <p>
          Already have an account? <Link to={routes.SIGN_IN}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
