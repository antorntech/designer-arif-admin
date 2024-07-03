import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col, InputNumber } from "antd";
import { useHistory, useParams } from "react-router-dom";

const EditExperience = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm(); // Using Form Hooks
  const [experienceData, setExperienceData] = useState({});

  useEffect(() => {
    fetch(`https://api.designerarif.com/api/v1/experience/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Experience data");
        }
        return res.json();
      })
      .then((data) => {
        setExperienceData(data);
        form.setFieldsValue(data); // Set form values after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching Experience data:", error);
        message.error("Failed to fetch Experience data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const data = {
      ...experienceData,
      ...values,
    };

    fetch(`https://api.designerarif.com/api/v1/experience/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update Experience data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Experience data updated successfully.");
        navigate.push("/qualification");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update Experience data");
      });
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Experience
        </h1>
        <p>You can edit experience from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            form={form}
            onFinish={handleUpload}
            layout="vertical"
            initialValues={experienceData}
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

export default EditExperience;
