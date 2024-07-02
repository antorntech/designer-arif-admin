import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddHeadMenu = () => {
  const navigate = useHistory();
  const [form] = Form.useForm();
  const [autoPath, setAutoPath] = useState("");

  const handleLabelChange = (e) => {
    const labelValue = e.target.value;
    // Assuming a simple conversion for path, you may modify this logic as needed
    const pathValue = labelValue.toLowerCase().replace(/\s+/g, "-"); // Example: converts "My Label" to "my-label"
    setAutoPath(pathValue);
    form.setFieldsValue({ path: pathValue }); // Update path field in the form
  };

  const handleUpload = (values) => {
    // Extract values from the form
    const { label, path } = values;

    // Prepare the data to be sent
    const data = {
      label,
      path,
    };

    // Send a POST request with JSON data
    fetch("http://localhost:8000/api/v1/headmenu/add", {
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
        navigate.push("/head-menu");
      })
      .catch((error) => {
        console.error(error);
        message.error(`${error}`);
      });
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Add Header Menu
        </h1>
        <p>You can add header menu from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form form={form} onFinish={handleUpload} layout="vertical">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12} lg={12}>
                <Form.Item
                  name="label"
                  label="Label"
                  placeholder="Enter head label"
                  rules={[
                    {
                      required: true,
                      message: "Please enter head menu label",
                    },
                  ]}
                >
                  <Input onChange={handleLabelChange} />
                </Form.Item>
                <Form.Item
                  name="path"
                  label="Path"
                  placeholder="Header menu path"
                  initialValue={autoPath} // Set initial value for path
                >
                  <Input disabled />
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
    </>
  );
};

export default AddHeadMenu;
