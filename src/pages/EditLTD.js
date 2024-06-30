import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditLTD = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm(); // Using Form Hooks
  const [ltdData, setLtdData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/ltd/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch LTD data");
        }
        return res.json();
      })
      .then((data) => {
        setLtdData(data);
        form.setFieldsValue(data); // Set form values after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching LTD data:", error);
        message.error("Failed to fetch LTD data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const data = {
      ...ltdData,
      ...values,
    };

    fetch(`http://localhost:8000/api/v1/ltd/updateLTD/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update LTD data");
        }
        return res.json();
      })
      .then(() => {
        message.success("LTD data updated successfully.");
        navigate.push("/ltd");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update LTD data");
      });
  };

  return (
    <Row gutter={[24, 0]}>
      <Col xs={24} md={12} lg={12}>
        <Form
          form={form}
          onFinish={handleUpload}
          layout="vertical"
          initialValues={ltdData} // Pre-fill the form with existing LTD data
        >
          <h1>Edit LTD</h1>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="ltd"
                label="LTD"
                placeholder="Enter LTD"
                rules={[
                  {
                    required: true,
                    message: "Please enter product LTD",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="taskNo"
                label="Task No"
                placeholder="Enter Task No"
                rules={[
                  {
                    required: true,
                    message: "Please enter task number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default EditLTD;
