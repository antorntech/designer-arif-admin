import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col, InputNumber } from "antd";
import { useHistory, useParams } from "react-router-dom";

const EditTaskList = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm(); // Using Form Hooks
  const [taskListData, setTaskListData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/tasklist/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Task List data");
        }
        return res.json();
      })
      .then((data) => {
        setTaskListData(data);
        form.setFieldsValue(data); // Set form values after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching Task List data:", error);
        message.error("Failed to fetch Task List data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const data = {
      ...taskListData,
      ...values,
    };

    fetch(`http://localhost:8000/api/v1/tasklist/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update Task List data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Task List data updated successfully.");
        navigate.push("/head-menu");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update Task List data");
      });
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Task List
        </h1>
        <p>You can edit task list from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            form={form}
            onFinish={handleUpload}
            layout="vertical"
            initialValues={taskListData}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12} lg={12}>
                <Form.Item
                  name="label"
                  label="Label"
                  placeholder="Enter head label"
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
    </>
  );
};

export default EditTaskList;
