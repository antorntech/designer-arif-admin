import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col, InputNumber } from "antd";
import { useHistory, useParams } from "react-router-dom";

const EditCertification = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm(); // Using Form Hooks
  const [certificationData, setCertificationData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/certification/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Certification data");
        }
        return res.json();
      })
      .then((data) => {
        setCertificationData(data);
        form.setFieldsValue(data); // Set form values after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching Certification data:", error);
        message.error("Failed to fetch Certification data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const data = {
      ...certificationData,
      ...values,
    };

    fetch(`http://localhost:8000/api/v1/certification/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update Certification data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Certification data updated successfully.");
        navigate.push("/qualification");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update Certification data");
      });
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Certification
        </h1>
        <p>You can edit certification from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            form={form}
            onFinish={handleUpload}
            layout="vertical"
            initialValues={certificationData}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12} lg={12}>
                <Form.Item
                  name="starttime"
                  label="Start Time"
                  placeholder="Enter experience start time"
                  rules={[
                    {
                      required: true,
                      message: "Please enter experience start time",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="endtime"
                  label="End Time"
                  placeholder="Enter endtime"
                  rules={[
                    {
                      required: true,
                      message: "Please enter experience endtime",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="title"
                  label="Title"
                  placeholder="Enter title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter experience title",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="location"
                  label="Location"
                  placeholder="Enter location"
                  rules={[
                    {
                      required: true,
                      message: "Please enter experience location",
                    },
                  ]}
                >
                  <Input />
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

export default EditCertification;
