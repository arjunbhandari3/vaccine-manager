import { Row, Button, Form, Input, Select, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { ALLERGY_RISK_ENUM, REQUIRED } from "constants/common";

const AllergyForm = (props) => {
  const { isLastAllergyEmpty } = props;

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
              <Row style={{ alignItems: "flex-start" }}>
                <Form.Item
                  key="allergy"
                  name={[field.name, "allergy"]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginRight: 16,
                  }}
                  rules={[{ required: true, message: REQUIRED }]}
                >
                  <Input.TextArea
                    placeholder="Allergy"
                    row={3}
                    showCount={true}
                    maxLength={100}
                  />
                </Form.Item>

                <Form.Item
                  key="risk"
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
                  className="delete-button"
                  style={{ margin: "8px", fontSize: 18 }}
                  onClick={() => remove(field.name)}
                />
              </Row>
              <Divider style={{ margin: "8px 0" }} />
            </>
          ))}
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button
              type="dashed"
              onClick={() => !isLastAllergyEmpty && add()}
              style={{ width: "60%" }}
              icon={<PlusOutlined />}
              disabled={isLastAllergyEmpty}
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
