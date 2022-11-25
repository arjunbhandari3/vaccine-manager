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

import Label from "./Label";
import AllergyForm from "./AllergyForm";

import { handleError } from "utils/error";
import { getAllVaccines } from "redux/actions/vaccineAction";
import { showSuccessNotification } from "utils/notification";
import { addVaccine, formatVaccineData, updateVaccine } from "services/vaccine";

import {
  SUCCESS,
  REQUIRED,
  DATE_FORMAT,
  INVALID_DATE,
  INVALID_EXPIRY_DATE,
  VACCINE_ADDED_MESSAGE,
  VACCINE_EDITED_MESSAGE,
} from "constants/common";

const VaccineForm = (props) => {
  const { vaccine, form, onClose, isSubmitting, setIsSubmitting } = props;

  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const onSubmit = async (values) => {
    if (file) {
      values.photoUrl = file;
    }

    try {
      setIsSubmitting(true);

      const data = formatVaccineData(values, "submit");

      if (vaccine) {
        await updateVaccine(vaccine.id, data);
        showSuccessNotification(SUCCESS, VACCINE_EDITED_MESSAGE);
      } else {
        await addVaccine(data);
        showSuccessNotification(SUCCESS, VACCINE_ADDED_MESSAGE);
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

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={!isSubmitting && onSubmit}
      initialValues={{ numberOfDoses: 0, isMandatory: false, allergies: [] }}
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
            <DatePicker format={DATE_FORMAT} />
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
            <DatePicker format={DATE_FORMAT} />
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
            <InputNumber min={0} />
          </Form.Item>
        </Col>

        <Col span={11}>
          <Label label="Is Mandatory" />
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
        {vaccine?.photoUrl && (
          <img
            src={vaccine.photoUrl}
            alt="vaccine"
            style={{ width: "100px", height: "100px", marginRight: "10px" }}
          />
        )}
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
      <AllergyForm form={form} />
    </Form>
  );
};

export default VaccineForm;
