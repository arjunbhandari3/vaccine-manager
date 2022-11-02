import axios from "axios";
import _get from "lodash/get";

import config from "config/config";
import { showErrorNotification } from "./notification";

import { PRODUCTION } from "constants/common";

const GENERIC_ERROR = "Oops! Something went wrong";

/**
 * Generic error handler to handle error events.
 *
 * @param {object} event
 * @param {{title, message}} options
 * @param {Function} [onTrueNegative] if the error catch was a true negative.
 * @param {Function} [onFalseNegative] if the error catch was a false negative.
 */
export function handleError(event, options = {}, callbacks = {}) {
  const { onTrueNegative, onFalseNegative } = callbacks;
  if (axios.isCancel(event)) {
    if (onFalseNegative) {
      onFalseNegative(event);
    }

    return;
  }
  if (config.env !== PRODUCTION) {
    console.log(event);
  }

  let message = _get(event, "response.data.message", GENERIC_ERROR);

  const { title, message: errorMessage } = options;

  if (errorMessage) {
    message = errorMessage;
  }

  showErrorNotification(title || "Error", message);

  if (onTrueNegative) {
    onTrueNegative(event);
  }
}
