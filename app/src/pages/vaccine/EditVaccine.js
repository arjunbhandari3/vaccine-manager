import React from "react";

import { VaccineForm } from "./components/VaccineForm";

export const EditVaccine = (props) => {
  return (
    <div className="add-vaccine-container">
      <div>
        <h1 className="add-vaccine-heading">Edit Vaccine</h1>
      </div>
      <div>
        <VaccineForm isEditForm={true} />
      </div>
    </div>
  );
};
