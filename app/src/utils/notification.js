import { notification } from "antd";

import { ERROR, SUCCESS } from "constants/common";

const showNotification = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

export const showSuccessNotification = (title = SUCCESS, message) => {
  showNotification("success", title, message);
};

export const showErrorNotification = (title = ERROR, message) => {
  showNotification("error", title, message);
};
