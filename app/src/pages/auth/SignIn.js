import React from "react";
import { Link } from "react-router-dom";

import AuthForm from "./components/AuthForm";
import useDocumentTitle from "hooks/useDocumentTitle";

import * as routes from "constants/routes";

const SignIn = () => {
  useDocumentTitle("Sign In");

  return (
    <div className="auth-container">
      <div>
        <h1 className="header-title">Sign In</h1>
      </div>
      <AuthForm isSignUp={false} />
      <div>
        <p>
          Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
