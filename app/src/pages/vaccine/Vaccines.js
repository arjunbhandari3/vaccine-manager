import React, { useState } from "react";
import { PageHeader, Button } from "antd";

import VaccineModal from "./components/VaccineModal";
import VaccineTable from "./components/VaccineTable";

export const Vaccines = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="vaccines-container">
      <VaccineModal visible={showModal} onCancel={() => setShowModal(false)} />

      <PageHeader
        title={<h1 className="vaccines-header-title">All Vaccines</h1>}
        extra={[
          <Button type="primary" onClick={() => setShowModal(true)}>
            Add vaccine
          </Button>,
        ]}
      />
      <VaccineTable />
    </div>
  );
};
