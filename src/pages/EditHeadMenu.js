import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useHistory, useParams } from "react-router-dom";

const EditHeadMenu = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm(); // Using Form Hooks
  const [headMenuData, setHeadMenuData] = useState({});

  useEffect(() => {
    fetch(`https://api.designerarif.com/api/v1/headmenu/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Head Menu data");
        }
        return res.json();
      })
      .then((data) => {
        setHeadMenuData(data);
        form.setFieldsValue(data); // Set form values after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching Head Menu data:", error);
        message.error("Failed to fetch Head Menu data");
      });
  }, [id, form]);

  const [autoPath, setAutoPath] = useState("");

  const handleLabelChange = (e) => {
    const labelValue = e.target.value;
    // Assuming a simple conversion for path, you may modify this logic as needed
    const pathValue = labelValue.toLowerCase().replace(/\s+/g, "-"); // Example: converts "My Label" to "my-label"
    setAutoPath(pathValue);
    form.setFieldsValue({ path: pathValue }); // Update path field in the form
  };

  const handleUpload = (values) => {
    const data = {
      ...headMenuData,
      ...values,
    };

    fetch(`https://api.designerarif.com/api/v1/headmenu/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update Head Menu data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Head Menu data updated successfully.");
        navigate.push("/head-menu");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update Head Menu data");
      });
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Header Menu
        </h1>
        <p>You can edit header menu from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            form={form}
            onFinish={handleUpload}
            layout="vertical"
            initialValues={headMenuData}
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
                      message: "Please enter head menu label",
                    },
                  ]}
                >
                  <Input onChange={handleLabelChange} />
                </Form.Item>
                <Form.Item
                  name="path"
                  label="Path"
                  placeholder="Enter path"
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

export default EditHeadMenu;
