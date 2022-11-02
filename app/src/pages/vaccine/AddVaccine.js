import React from "react";

import useDocumentTitle from "hooks/useDocumentTitle";
import { VaccineForm } from "./components/VaccineForm";

export const AddVaccine = (props) => {
  useDocumentTitle("Add Vaccine");

  return (
    <div className="add-vaccine-container">
      <div>
        <h1 className="vaccines-header-title">Add New Vaccine</h1>
      </div>
      <div>
        <VaccineForm />
      </div>
    </div>
  );
};
