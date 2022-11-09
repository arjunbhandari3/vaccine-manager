import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

import Loading from "components/Loading";

import { handleError } from "utils/error";
import { showSuccessNotification } from "utils/notification";

import { signUp } from "services/auth";
import useDocumentTitle from "hooks/useDocumentTitle";

import {
  REQUIRED,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  SUCCESSFULLY_SIGNED_UP,
  INVALID_CONFIRM_PASSWORD,
} from "constants/common";
import * as routes from "constants/routes";

const SignUp = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useDocumentTitle("Sign Up");

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const { email, password } = values;

      await signUp(email, password);

      navigate(routes.SIGN_IN);
      form.resetFields();

      showSuccessNotification(SUCCESSFULLY_SIGNED_UP);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div>
        <h1 className="header-title">Sign Up</h1>
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
            colon={false}
            rules={[
              { required: true, message: REQUIRED },
              {
                min: 6,
                message: INVALID_PASSWORD,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="label">
            <p>Confirm Password</p>
          </div>
          <Form.Item
            name="confirm-password"
            colon={false}
            rules={[
              { required: true, message: REQUIRED },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(INVALID_CONFIRM_PASSWORD);
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="button">
            <Button type="primary" htmlType="submit" size="large" block>
              {isSubmitting ? <Loading /> : "Sign Up"}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <p>
          Already have an account? <Link to={routes.SIGN_IN}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
