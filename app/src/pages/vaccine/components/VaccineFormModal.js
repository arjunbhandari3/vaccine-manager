import moment from "moment";
import { Modal, Form } from "antd";
import React, { useEffect, useState } from "react";

import VaccineForm from "./VaccineForm";

import { DATE_FORMAT } from "constants/common";

const VaccineFormModal = ({ vaccine, open, onCancel }) => {
  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (vaccine) {
      form.setFieldsValue({
        ...vaccine,
        releaseDate: moment(vaccine.releaseDate, DATE_FORMAT),
        expirationDate: moment(vaccine.expirationDate, DATE_FORMAT),
      });
    } else {
      form.resetFields();
    }
  }, [vaccine, form]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      closable={false}
      title={
        <h1 className="vaccines-header-title">
          {vaccine ? "Edit vaccine" : "Add vaccine"}
        </h1>
      }
      onOk={() => form.submit()}
      okText={vaccine ? "Update Vaccine" : "Add Vaccine"}
      confirmLoading={isSubmitting}
    >
      <VaccineForm
        form={form}
        vaccine={vaccine}
        onClose={onCancel}
        setIsSubmitting={setIsSubmitting}
      />
    </Modal>
  );
};

export default VaccineFormModal;
