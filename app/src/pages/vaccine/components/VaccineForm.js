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
import ImgCrop from "antd-img-crop";
import { useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import Label from "./Label";
import AllergyForm from "./AllergyForm";

import { handleError } from "utils/error";
import { getAllVaccines } from "redux/actions/vaccineAction";
import { showSuccessNotification } from "utils/notification";
import { addVaccine, formatVaccineData, updateVaccine } from "services/vaccine";

import {
  SUCCESS,
  REQUIRED,
  INVALID_DATE,
  INVALID_EXPIRY_DATE,
  VACCINE_ADDED_MESSAGE,
  VACCINE_EDITED_MESSAGE,
} from "constants/messages";
import { DATE_FORMAT } from "constants/date";

const VaccineForm = (props) => {
  const { vaccine, form, onClose, isSubmitting, setIsSubmitting } = props;

  const dispatch = useDispatch();

  const allergies = Form.useWatch("allergies", form);

  const [file, setFile] = useState(null);
  const [isLastAllergyEmpty, setIsLastAllergyEmpty] = useState(false);

  useEffect(() => {
    if (allergies?.length === 0) {
      setIsLastAllergyEmpty(false);
    }

    if (allergies?.length > 0) {
      const lastAllergy = allergies[allergies.length - 1];
      if (lastAllergy?.allergy || lastAllergy?.risk) {
        setIsLastAllergyEmpty(false);
      } else {
        setIsLastAllergyEmpty(true);
      }
    }
  }, [allergies]);

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

  const FormItem = Form.Item;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={!isSubmitting && onSubmit}
      initialValues={{ numberOfDoses: 0, isMandatory: false, allergies: [] }}
      autoComplete="off"
      scrollToFirstError={true}
    >
      <Label label="Name" isCompulsory />
      <FormItem
        colon={false}
        name="name"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input placeholder="Vaccine name" />
      </FormItem>

      <Label label="Description" isCompulsory />
      <FormItem
        colon={false}
        name="description"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input.TextArea rows={4} placeholder="Vaccine description" />
      </FormItem>

      <Label label="Manufacturer" isCompulsory />
      <FormItem
        colon={false}
        name="manufacturer"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input placeholder="Vaccine manufacturer" />
      </FormItem>

      <Row justify="start">
        <Col span={11}>
          <Label label="Release Date" isCompulsory />
          <FormItem
            colon={false}
            name="releaseDate"
            rules={[{ required: true, message: REQUIRED }]}
          >
            <DatePicker format={DATE_FORMAT} />
          </FormItem>
        </Col>

        <Col span={11}>
          <Label label="Expiration Date" isCompulsory />
          <FormItem
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
          </FormItem>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={11}>
          <Label label="Number of Doses" isCompulsory />
          <FormItem
            colon={false}
            name="numberOfDoses"
            rules={[{ required: true, message: REQUIRED }]}
          >
            <InputNumber min={0} />
          </FormItem>
        </Col>

        <Col span={11}>
          <Label label="Is Mandatory" />
          <FormItem colon={false} name="isMandatory" valuePropName="checked">
            <Switch checked={false} />
          </FormItem>
        </Col>
      </Row>

      <Label label="Image" />
      <FormItem
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
        <ImgCrop rotate>
          <Upload
            name="photoUrl"
            listType="picture"
            maxCount={1}
            accept="image/*"
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            onRemove={() => setFile(null)}
          >
            <Button icon={<UploadOutlined />} disabled={file}>
              Click to upload
            </Button>
          </Upload>
        </ImgCrop>
      </FormItem>
      <AllergyForm isLastAllergyEmpty={isLastAllergyEmpty} />
    </Form>
  );
};

export default VaccineForm;
