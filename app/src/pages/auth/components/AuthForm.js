import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

import Loading from "components/Loading";

import { handleError } from "utils/error";
import { showSuccessNotification } from "utils/notification";

import { signIn, signUp } from "services/auth";

import {
  SUCCESS,
  REQUIRED,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  SUCCESSFULLY_SIGNED_IN,
  SUCCESSFULLY_SIGNED_UP,
  INVALID_CONFIRM_PASSWORD,
} from "constants/common";
import * as routes from "constants/routes";

const AuthForm = (props) => {
  const { isSignUp } = props;

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      if (isSignUp) {
        const { confirmPassword, ...rest } = values;

        await signUp(rest);
      } else {
        await signIn(values);
      }

      navigate(isSignUp ? routes.SIGN_IN : routes.HOME);
      form.resetFields();
      showSuccessNotification(
        SUCCESS,
        isSignUp ? SUCCESSFULLY_SIGNED_UP : SUCCESSFULLY_SIGNED_IN
      );
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      name="basic"
      form={form}
      onFinish={!isSubmitting && onSubmit}
      validateTrigger={["onSubmit", "onBlur"]}
      autoComplete="off"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      {isSignUp && (
        <>
          <div className="label">
            <p>Name</p>
          </div>
          <Form.Item
            colon={false}
            name="name"
            rules={[{ required: true, message: REQUIRED }]}
          >
            <Input />
          </Form.Item>
        </>
      )}

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
          ...(isSignUp ? [{ min: 6, message: INVALID_PASSWORD }] : []),
        ]}
      >
        <Input.Password />
      </Form.Item>

      {isSignUp && (
        <>
          <div className="label">
            <p>Confirm Password</p>
          </div>
          <Form.Item
            name="confirmPassword"
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
        </>
      )}

      <Form.Item className="button">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loading /> : isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
