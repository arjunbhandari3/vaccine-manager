import { notification } from "antd";
import {
  showSuccessNotification,
  showErrorNotification,
} from "utils/notification";

describe("notification", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("showSuccessNotification", () => {
    it("should show a success notification with the correct title and message", () => {
      const title = "Success Title";
      const message = "Success Message";
      const spy = jest.spyOn(notification, "success");

      showSuccessNotification(title, message);

      expect(spy).toHaveBeenCalledWith({
        message: title,
        description: message,
      });

      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe("showErrorNotification", () => {
    it("should show an error notification with the correct title and message", () => {
      const title = "Error Title";
      const message = "Error Message";
      const spy = jest.spyOn(notification, "error");

      showErrorNotification(title, message);

      expect(spy).toHaveBeenCalledWith({
        message: title,
        description: message,
      });

      spy.mockReset();
      spy.mockRestore();
    });
  });
});
