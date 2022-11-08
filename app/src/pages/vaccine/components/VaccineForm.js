import {
  Row,
  Col,
  Form,
  Input,
  Upload,
  Button,
  Switch,
  DatePicker,
  InputNumber,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

import AllergyForm from "./AllergyForm";

import { handleError } from "utils/error";
import { showSuccessNotification } from "utils/notification";
import { addVaccine, updateVaccine } from "services/vaccine";
import { getAllVaccines } from "redux/actions/vaccineAction";

import {
  REQUIRED,
  INVALID_DATE,
  INVALID_EXPIRY_DATE,
  VACCINE_ADDED_MESSAGE,
  VACCINE_EDITED_MESSAGE,
} from "constants/common";

const VaccineForm = ({ vaccine, form, onClose, setIsSubmitting }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const onSubmit = async (values) => {
    const data = {
      ...values,
      releaseDate: moment(values.releaseDate).format("YYYY-MM-DD"),
      expirationDate: moment(values.expirationDate).format("YYYY-MM-DD"),
    };

    if (file) {
      data.photoUrl = file;
    }

    if (data?.allergies?.length > 0) {
      data.allergies = JSON.stringify(data.allergies);
    }

    try {
      setIsSubmitting(true);
      if (vaccine) {
        await updateVaccine(vaccine.id, data);
        showSuccessNotification(VACCINE_EDITED_MESSAGE);
      } else {
        await addVaccine(data);
        showSuccessNotification(VACCINE_ADDED_MESSAGE);
      }

      await dispatch(getAllVaccines());

      // reset form
      form.resetFields();
      onClose();
    } catch (err) {
      handleError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const Label = ({ label, isCompulsory = false }) => {
    return (
      <div className="form-label">
        {label}
        {isCompulsory && <span className="form-label--required">*</span>}
      </div>
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        numberOfDoses: 0,
        isMandatory: false,
        releaseDate: moment(),
        expirationDate: moment(),
      }}
      autoComplete="off"
    >
      <Label label="Name" isCompulsory />
      <Form.Item
        colon={false}
        name="name"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input placeholder="Vaccine name" />
      </Form.Item>

      <Label label="Description" isCompulsory />
      <Form.Item
        colon={false}
        name="description"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input.TextArea rows={4} placeholder="Vaccine description" />
      </Form.Item>

      <Label label="Manufacturer" isCompulsory />
      <Form.Item
        colon={false}
        name="manufacturer"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input placeholder="Vaccine manufacturer" />
      </Form.Item>

      <Row justify="start">
        <Col span={11}>
          <Label label="Release Date" isCompulsory />
          <Form.Item
            colon={false}
            name="releaseDate"
            rules={[{ required: true, message: REQUIRED }]}
          >
            <DatePicker />
          </Form.Item>
        </Col>

        <Col span={11}>
          <Label label="Expiration Date" isCompulsory />
          <Form.Item
            colon={false}
            format="YYYY-MM-DD"
            name="expirationDate"
            rules={[
              { required: true, message: REQUIRED },
              {
                type: "date",
                message: INVALID_DATE,
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (
                    !value ||
                    moment(value).isAfter(getFieldValue("releaseDate"))
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(INVALID_EXPIRY_DATE);
                },
              }),
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={11}>
          <Label label="Number of Doses" isCompulsory />
          <Form.Item
            colon={false}
            name="numberOfDoses"
            rules={[{ required: true, message: REQUIRED }]}
          >
            <InputNumber min={0} initialValues={0} />
          </Form.Item>
        </Col>

        <Col span={11}>
          <Label label="Is Mandatory" isCompulsory />
          <Form.Item colon={false} name="isMandatory" valuePropName="checked">
            <Switch checked={false} />
          </Form.Item>
        </Col>
      </Row>

      <Label label="Image" />
      <Form.Item
        name="photoUrl"
        valuePropName="file"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }

          return e && e.fileList;
        }}
      >
        <Upload
          name="photoUrl"
          listType="picture"
          maxCount={1}
          accept="image/*"
          beforeUpload={(file) => {
            setFile(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <AllergyForm />
    </Form>
  );
};

export default VaccineForm;
