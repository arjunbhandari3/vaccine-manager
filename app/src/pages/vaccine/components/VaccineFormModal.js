import { Modal, Form } from "antd";
import React, { useEffect, useState } from "react";

import VaccineForm from "./VaccineForm";

import { formatVaccineData } from "services/vaccine";

const VaccineFormModal = ({ vaccine, open, onCancel }) => {
  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (vaccine) {
      form.setFieldsValue(formatVaccineData(vaccine));
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
      onOk={() => !isSubmitting && form.submit()}
      okText={vaccine ? "Update Vaccine" : "Add Vaccine"}
      okButtonProps={{ disabled: isSubmitting }}
      confirmLoading={isSubmitting}
    >
      <VaccineForm
        form={form}
        vaccine={vaccine}
        onClose={onCancel}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />
    </Modal>
  );
};

export default VaccineFormModal;
