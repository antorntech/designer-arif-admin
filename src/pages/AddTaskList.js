import React from "react";
import { Form, Input, Button, message, Row, Col, InputNumber } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddTaskList = () => {
  const navigate = useHistory();
  const [form] = Form.useForm();

  const handleUpload = (values) => {
    // Extract values from the form
    const { label, value } = values;

    // Prepare the data to be sent
    const data = {
      label,
      value,
    };

    // Send a POST request with JSON data
    fetch("http://localhost:8000/api/v1/tasklist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 400) {
            // Handle the case where label already exists
            const errorMessage = await res.text();
            throw new Error(errorMessage);
          } else {
            // Handle other errors
            throw new Error("Failed to added head menu. Please try again.");
          }
        }
        return res.json();
      })
      .then(() => {
        message.success("Head Menu Added Successful.");
        navigate.push("/task-list");
      })
      .catch((error) => {
        console.error(error);
        message.error(`${error}`);
      });
  };

  return (
    <Row gutter={[24, 0]}>
      <Col xs={24} md={12} lg={12}>
        <Form form={form} onFinish={handleUpload} layout="vertical">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="label"
                label="Label"
                placeholder="Enter task list label"
                rules={[
                  {
                    required: true,
                    message: "Please enter task list label",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="value"
                label="Value"
                placeholder="Enter value"
                rules={[
                  {
                    required: true,
                    message: "Please enter task list value",
                  },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" className="primary-btn" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AddTaskList;
