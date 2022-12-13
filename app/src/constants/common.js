import config from "config/config";

export const APP_TITLE = "Vaccine Manager";

export const PRODUCTION = "production";
export const DEVELOPMENT = "development";

export const APP_ENVIRONMENT = config.env || DEVELOPMENT;

export const DATE_FORMAT = "YYYY-MM-DD";

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_NUMBER = 1;
export const MIN_DEBOUNCE_TIME = 500;

export const DEFAULT_VACCINE_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtjpM7aoR4kbaH9c6j-uKN4SDiuiekzLTgA&usqp=CAU";

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

export const SUCCESS = "Success";
export const ERROR = "Error";
export const GENERIC_ERROR = "Oops! Something went wrong";

export const SUCCESSFULLY_SIGNED_IN = "Signed in Successfully!";
export const SUCCESSFULLY_SIGNED_UP = "Signed up Successfully! Please Sign In.";
export const SUCCESSFULLY_SIGNED_OUT = "Signed out Successfully!";

export const REQUIRED = "Required!";
export const INVALID_EMAIL = "Please enter valid email!";
export const INVALID_CONFIRM_PASSWORD =
  "The two passwords that you entered do not match!";
export const INVALID_PASSWORD = "Password must be at least 6 characters long!";
export const INVALID_DATE = "Please enter valid date!";
export const INVALID_EXPIRY_DATE =
  "Expiry date must be greater than release date!";

export const VACCINE_ADDED_MESSAGE = "New Vaccine Added Successfully!";
export const VACCINE_EDITED_MESSAGE = "Vaccine Edited Successfully!";
export const VACCINE_MANDATORY_UPDATE_MESSAGE =
  "Vaccine Mandatory Status Updated.";
export const VACCINE_DELETED_MESSAGE = "Vaccine Deleted Successfully!";
