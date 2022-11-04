import { Row, Button, Form, Input, Select, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { ALLERGY_RISK_ENUM, REQUIRED } from "constants/common";

const AllergyForm = () => {
  return (
    <Form.List name="allergies">
      {(fields, { add, remove }, { errors }) => (
        <div
          className="allergy-form"
          style={{ border: fields.length > 0 ? "1px solid #e2e8f0" : 0 }}
        >
          {fields.map((field, index) => (
            <>
              <div className="form-label" style={{ marginBottom: 4 }}>
                {index === 0 ? "Allergies" : ""}
              </div>
              <Form.Item
                key={field.key}
                required={false}
                style={{ marginBottom: 0 }}
              >
                <Row>
                  <Form.Item
                    {...field}
                    name={[field.name, "allergy"]}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      { required: true, whitespace: true, message: REQUIRED },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      marginRight: 16,
                    }}
                  >
                    <Input.TextArea placeholder="Allergy" row={3} />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, "risk"]}
                    rules={[{ required: true, message: REQUIRED }]}
                  >
                    <Select
                      placeholder="Select risk level"
                      style={{ width: 150 }}
                    >
                      {ALLERGY_RISK_ENUM.map((risk) => (
                        <Select.Option key={risk} value={risk}>
                          {risk}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <MinusCircleOutlined
                    style={{
                      margin: "8px",
                      fontSize: 18,
                      color: "red",
                    }}
                    onClick={() => remove(field.name)}
                  />
                </Row>
              </Form.Item>
              <Divider style={{ margin: "8px 0" }} />
            </>
          ))}
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: "60%" }}
              icon={<PlusOutlined />}
            >
              Add Allergy
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </div>
      )}
    </Form.List>
  );
};

export default AllergyForm;
