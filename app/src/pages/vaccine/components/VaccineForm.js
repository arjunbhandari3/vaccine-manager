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
      <FormItem
        colon={false}
        name="name"
        label="Name"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input placeholder="Vaccine name" />
      </FormItem>

      <FormItem
        colon={false}
        name="description"
        label="Description"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input.TextArea rows={4} placeholder="Vaccine description" />
      </FormItem>

      <FormItem
        colon={false}
        name="manufacturer"
        label="Manufacturer"
        rules={[{ required: true, message: REQUIRED }]}
      >
        <Input placeholder="Vaccine manufacturer" />
      </FormItem>

      <Row justify="start">
        <Col span={11}>
          <FormItem
            colon={false}
            name="releaseDate"
            label="Release Date"
            rules={[{ required: true, message: REQUIRED }]}
          >
            <DatePicker format={DATE_FORMAT} />
          </FormItem>
        </Col>

        <Col span={11}>
          <FormItem
            colon={false}
            name="expirationDate"
            label="Expiration Date"
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
          <FormItem
            colon={false}
            name="numberOfDoses"
            label="Number of Doses"
            rules={[{ required: true, message: REQUIRED }]}
          >
            <InputNumber min={0} />
          </FormItem>
        </Col>

        <Col span={11}>
          <FormItem
            colon={false}
            name="isMandatory"
            label="Is Mandatory"
            valuePropName="checked"
          >
            <Switch checked={false} />
          </FormItem>
        </Col>
      </Row>

      <FormItem
        name="photoUrl"
        label="Image"
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
            <Button
              icon={<UploadOutlined />}
              disabled={file}
              data-testid="upload"
            >
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
