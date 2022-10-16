import moment from "moment";
import React, { useEffect } from "react";
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
import { addVaccine, editVaccine, getVaccineById } from "services/vaccine";

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

  useEffect(() => {
    if (isEditForm) {
      const fetchVaccine = async () => {
        const vaccine = await getVaccineById(vaccineId);

        form.setFieldsValue({
          ...vaccine,
          releaseDate: moment(vaccine.releaseDate).format("DD-MM-YYYY"),
          expirationDate: moment(vaccine.expirationDate).format("DD-MM-YYYY"),
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
    values.picture?.file?.originFileObj &&
      formData.append("photoUrl", values.picture.file.originFileObj);

    if (isEditForm) {
      await editVaccine(vaccineId, formData);
    } else {
      await addVaccine(formData);
    }

    showSuccessNotification(
      isEditForm ? VACCINE_EDITED_MESSAGE : VACCINE_ADDED_MESSAGE
    );

    navigate(routes.VACCINES);
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
            <DatePicker defaultValue={moment()} />
          </Form.Item>
        </Col>

        <Col span={11}>
          <Label label="Expiration Date" isCompulsory />
          <Form.Item
            colon={false}
            name="expirationDate"
            rules={[
              { required: true, message: REQUIRED },
              {
                type: "date",
                message: INVALID_DATE,
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("releaseDate") < value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(INVALID_EXPIRY_DATE);
                },
              }),
            ]}
          >
            <DatePicker defaultValue={moment()} />
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

      <Label label="Image" isCompulsory={!isEditForm} />
      <Form.Item
        colon={false}
        name="photoUrl"
        rules={[
          {
            required: !isEditForm,
            message: !isEditForm ? REQUIRED : null,
          },
        ]}
      >
        <Upload maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item className="button--form-item">
        <Button type="primary" htmlType="submit" size="large" block>
          {!isEditForm ? "Add Vaccine" : "Edit Vaccine"}
        </Button>
      </Form.Item>
    </Form>
  );
};
