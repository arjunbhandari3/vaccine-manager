import { notification } from "antd";

const showNotification = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

export const showSuccessNotification = (title = "Success", message) => {
  showNotification("success", title, message);
};

export const showErrorNotification = (title = "Error", message) => {
  showNotification("error", title, message);
};

export const showWarningNotification = (title, message) => {
  showNotification("warning", title, message);
};

export const showInfoNotification = (title, message) => {
  showNotification("info", title, message);
};
