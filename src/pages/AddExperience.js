import React from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddExperience = () => {
  const navigate = useHistory();
  const [form] = Form.useForm();

  const handleUpload = (values) => {
    // Extract values from the form
    const { starttime, endtime, title, location } = values;

    // Prepare the data to be sent
    const data = {
      starttime,
      endtime,
      title,
      location,
    };

    // Send a POST request with JSON data
    fetch("http://localhost:8000/api/v1/experience/add", {
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
            throw new Error("Failed to added experience. Please try again.");
          }
        }
        return res.json();
      })
      .then(() => {
        message.success("Experience Added Successful.");
        navigate.push("/qualification");
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
          Add Experience
        </h1>
        <p>You can add experience from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form form={form} onFinish={handleUpload} layout="vertical">
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

export default AddExperience;
