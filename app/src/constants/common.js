export const ALLERGY_RISK = { LOW: "Low", MEDIUM: "Medium", HIGH: "High" };
export const ALLERGY_RISK_ENUM = Object.values(ALLERGY_RISK);

export const ALLERGY_RISK_COLOR = {
  [ALLERGY_RISK.LOW]: "#00C851",
  [ALLERGY_RISK.MEDIUM]: "#f0ad4e",
  [ALLERGY_RISK.HIGH]: "#d62728",
};

export const VACCINE_METADATA = {
  TOTAL: "Total",
  MANDATORY: "Mandatory",
  OPTIONAL: "Optional",
};

export const VACCINE_METADATA_ENUM = Object.values(VACCINE_METADATA);

export const VACCINE_INITIAL_METADATA = { total: 0, mandatory: 0, optional: 0 };

export const VACCINE_METADATA_COLOR = {
  [VACCINE_METADATA.TOTAL]: "blue",
  [VACCINE_METADATA.MANDATORY]: "red",
  [VACCINE_METADATA.OPTIONAL]: "green",
};

export const VACCINE_METADATA_COLOR_CODE = {
  [VACCINE_METADATA.TOTAL]: "#1890ff",
  [VACCINE_METADATA.MANDATORY]: "#d62728",
  [VACCINE_METADATA.OPTIONAL]: "#2ca02c",
};
