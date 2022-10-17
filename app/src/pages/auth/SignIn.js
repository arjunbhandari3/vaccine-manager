import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

import {
  showErrorNotification,
  showSuccessNotification,
} from "utils/notification";
import { signIn } from "services/auth";
import useDocumentTitle from "hooks/useDocumentTitle";

import {
  REQUIRED,
  INVALID_EMAIL,
  SUCCESSFULLY_SIGNED_IN,
} from "constants/common";
import * as routes from "constants/routes";

const SignIn = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useDocumentTitle("Sign In");

  const onSubmit = async (values) => {
    try {
      await signIn(values.email, values.password);

      navigate(routes.VACCINES);

      showSuccessNotification(SUCCESSFULLY_SIGNED_IN);
    } catch (error) {
      showErrorNotification(error?.response?.data?.error);
    }

    form.resetFields();
  };

  return (
    <div className="auth-container">
      <div>
        <h1 className="auth-heading">Sign In</h1>
      </div>
      <div>
        <Form
          name="basic"
          form={form}
          onFinish={onSubmit}
          validateTrigger="onSubmit"
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
          <Form.Item className="button--form-item">
            <Button type="primary" htmlType="submit" size="large" block>
              Sign In
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
