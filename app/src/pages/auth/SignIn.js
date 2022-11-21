import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

import Loading from "components/Loading";

import { handleError } from "utils/error";
import { showSuccessNotification } from "utils/notification";

import { signIn } from "services/auth";
import useDocumentTitle from "hooks/useDocumentTitle";

import {
  SUCCESS,
  REQUIRED,
  INVALID_EMAIL,
  SUCCESSFULLY_SIGNED_IN,
} from "constants/common";
import * as routes from "constants/routes";

const SignIn = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useDocumentTitle("Sign In");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      await signIn(values);

      navigate(routes.HOME);

      form.resetFields();
      showSuccessNotification(SUCCESS, SUCCESSFULLY_SIGNED_IN);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div>
        <h1 className="header-title">Sign In</h1>
      </div>
      <div>
        <Form
          name="basic"
          form={form}
          onFinish={onSubmit}
          validateTrigger={["onSubmit", "onBlur"]}
          autoComplete="off"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <div className="label">
            <p>Email</p>
          </div>
          <Form.Item
            colon={false}
            name="email"
            placeholder="Email"
            rules={[
              { required: true, message: REQUIRED },
              { type: "email", message: INVALID_EMAIL },
            ]}
          >
            <Input />
          </Form.Item>

          <div className="label">
            <p>Password</p>
          </div>
          <Form.Item
            name="password"
            placeholder="Password"
            colon={false}
            rules={[{ required: true, message: REQUIRED }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="button">
            <Button type="primary" htmlType="submit" size="large" block>
              {isSubmitting ? <Loading /> : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <p>
          Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
