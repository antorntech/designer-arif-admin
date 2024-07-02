import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col, Upload } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const EditAbout = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm(); // Using Form Hooks
  const [aboutData, setAboutData] = useState({});
  const [bannerFileList, setBannerFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/about/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch About data");
        }
        return res.json();
      })
      .then((data) => {
        setAboutData(data);
        form.setFieldsValue(data); // Set form values after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching About data:", error);
        message.error("Failed to fetch About data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    bannerFileList.forEach((file) => {
      formData.append("banner", file);
    });

    // Append other form data
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    setUploading(true);

    // You can use any AJAX library you like
    fetch(`http://localhost:8000/api/v1/about/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update About data");
        }
        return res.json();
      })
      .then(() => {
        message.success("About data updated successfully.");
        navigate.push("/about");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update About data");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const bannerFileProps = {
    onRemove: (file) => {
      const index = bannerFileList.indexOf(file);
      const newFileList = bannerFileList.slice();
      newFileList.splice(index, 1);
      setBannerFileList(newFileList);
    },
    beforeUpload: (file) => {
      setBannerFileList([...bannerFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: bannerFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit About
        </h1>
        <p>You can edit about details from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            form={form}
            initialValues={aboutData}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item
                  name="title"
                  label="Title"
                  placeholder="Enter title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter hero content title",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter description",
                    },
                  ]}
                >
                  <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Name"
                  placeholder="Enter name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone"
                  placeholder="Enter phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter phone",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  placeholder="Enter address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter hero content address",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="banner"
                  label="Upload Banner"
                  rules={[
                    {
                      required: true,
                      message: "Please enter banner",
                    },
                  ]}
                >
                  <Upload {...bannerFileProps}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
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

export default EditAbout;
