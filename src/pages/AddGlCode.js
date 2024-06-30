import React from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddGlCode = () => {
  const navigate = useHistory();

  const handleUpload = (values) => {
    // Extract values from the form
    const { accountId, accountDesc } = values;

    // Prepare the data to be sent
    const data = {
      accountId,
      accountDesc,
    };

    // Send a POST request with JSON data
    fetch("http://localhost:8000/api/v1/glcode/addGLCode", {
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
            // Handle the case where LTD already exists
            const errorMessage = await res.text();
            throw new Error(errorMessage);
          } else {
            // Handle other errors
            throw new Error("Failed to upload data");
          }
        }
        return res.json();
      })
      .then(() => {
        message.success("Upload successful.");
        navigate.push("/glcode");
      })
      .catch((error) => {
        console.error(error);
        message.error(`${error}`);
      });
  };

  return (
    <Row gutter={[24, 0]}>
      <Col xs={24} md={12} lg={12}>
        <Form onFinish={handleUpload} layout="vertical">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="accountId"
                label="Account Id"
                placeholder="Enter accountId"
                rules={[
                  {
                    required: true,
                    message: "Please enter glcode accountId",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="accountDesc"
                label="Account Description"
                placeholder="Enter accountDesc"
                rules={[
                  {
                    required: true,
                    message: "Please enter glcode accountDescription",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AddGlCode;
