import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useHistory, useParams } from "react-router-dom";

const EditFooterMenu = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm(); // Using Form Hooks
  const [footerMenuData, setFooterMenuData] = useState({});

  useEffect(() => {
    fetch(`https://api.designerarif.com/api/v1/footermenu/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Footer Menu data");
        }
        return res.json();
      })
      .then((data) => {
        setFooterMenuData(data);
        form.setFieldsValue(data); // Set form values after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching Footer Menu data:", error);
        message.error("Failed to fetch Footer Menu data");
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
      ...footerMenuData,
      ...values,
    };

    fetch(`https://api.designerarif.com/api/v1/footermenu/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update Footer Menu data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Footer Menu data updated successfully.");
        navigate.push("/footer-menu");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update Footer Menu data");
      });
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Footer Menu
        </h1>
        <p>You can edit footer menu from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            form={form}
            onFinish={handleUpload}
            layout="vertical"
            initialValues={footerMenuData}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12} lg={12}>
                <Form.Item
                  name="label"
                  label="Label"
                  placeholder="Enter footer menu label"
                  rules={[
                    {
                      required: true,
                      message: "Please enter footer menu label",
                    },
                  ]}
                >
                  <Input onChange={handleLabelChange} />
                </Form.Item>
                <Form.Item
                  name="path"
                  label="Path"
                  placeholder="Footer menu path"
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

export default EditFooterMenu;
