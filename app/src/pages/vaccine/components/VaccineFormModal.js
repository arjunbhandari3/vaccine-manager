import moment from "moment";
import { Modal, Form } from "antd";
import React, { useEffect, useState } from "react";

import VaccineForm from "./VaccineForm";

const VaccineFormModal = ({ vaccine, open, onCancel }) => {
  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (vaccine) {
      form.setFieldsValue({
        ...vaccine,
        releaseDate: moment(vaccine.releaseDate, "YYYY-MM-DD"),
        expirationDate: moment(vaccine.expirationDate, "YYYY-MM-DD"),
      });
    }
  }, [vaccine, form]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
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
