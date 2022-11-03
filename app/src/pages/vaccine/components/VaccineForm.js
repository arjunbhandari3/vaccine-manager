import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import { UploadOutlined } from "@ant-design/icons";

import { showSuccessNotification } from "utils/notification";
import { addVaccine, updateVaccine, getVaccineById } from "services/vaccine";

import {
  REQUIRED,
  INVALID_DATE,
  INVALID_EXPIRY_DATE,
  VACCINE_ADDED_MESSAGE,
  VACCINE_EDITED_MESSAGE,
} from "constants/common";
import * as routes from "constants/routes";

export const VaccineForm = (props) => {
  const { isEditForm = false } = props;

  const { id: vaccineId } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isEditForm) {
      const fetchVaccine = async () => {
        const vaccine = await getVaccineById(vaccineId);

        form.setFieldsValue({
          ...vaccine,
          releaseDate: moment(
            moment(vaccine.releaseDate).format("YYYY-MM-DD"),
            "YYYY-MM-DD"
          ),
          expirationDate: moment(
            moment(vaccine.expirationDate).format("YYYY-MM-DD"),
            "YYYY-MM-DD"
          ),
        });
      };

      fetchVaccine();
    }
  }, [isEditForm, vaccineId, form]);

  const onSubmit = async (values) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("numberOfDoses", values.numberOfDoses);
    formData.append("manufacturer", values.manufacturer);
    formData.append("releaseDate", values.releaseDate);
    formData.append("expirationDate", values.expirationDate);
    formData.append("isMandatory", values.isMandatory);
    file && formData.append("photoUrl", file);

    if (isEditForm) {
      await updateVaccine(vaccineId, formData);
    } else {
      await addVaccine(formData);
    }

    showSuccessNotification(
      isEditForm ? VACCINE_EDITED_MESSAGE : VACCINE_ADDED_MESSAGE
    );

    navigate(routes.HOME);
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
      name="basic"
      form={form}
      initialValues={{ isMandatory: false }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Label label="Name" isCompulsory />
      <Form.Item
        colon={false}
        name="name"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input />
      </Form.Item>

      <Label label="Description" isCompulsory />
      <Form.Item
        colon={false}
        name="description"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Label label="Manufacturer" isCompulsory />
      <Form.Item
        colon={false}
        name="manufacturer"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input />
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
            <InputNumber min={0} defaultValue={0} />
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
      <Form.Item colon={false} name="photoUrl">
        <Upload
          maxCount={1}
          beforeUpload={(file) => {
            setFile(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item className="button">
        <Button type="primary" htmlType="submit" size="large" block>
          {!isEditForm ? "Add Vaccine" : "Edit Vaccine"}
        </Button>
      </Form.Item>
    </Form>
  );
};
