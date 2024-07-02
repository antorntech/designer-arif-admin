import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, message, Row, Col } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddHeroContent = () => {
  const navigate = useHistory();

  const [bannerFileList, setBannerFileList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [uploading, setUploading] = useState(false);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    bannerFileList.forEach((file) => {
      formData.append("banner", file);
    });

    // Append other form data
    formData.append("title", values.title);
    formData.append("description", values.description);
    setUploading(true);
    // You can use any AJAX library you like
    fetch("http://localhost:8000/api/v1/herocontent/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        // Reset form
        setBannerFileList([]);
        message.success("Hero Content Added Successfully.");
        navigate.push("/hero-content");
      })
      .catch(() => {
        message.error("Hero Content Add Failed.");
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
          Add Hero Content
        </h1>
        <p>You can add hero content from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form onFinish={handleUpload} layout="vertical">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item
                  name="title"
                  label="Title"
                  placeholder="Enter title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter product title",
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

export default AddHeroContent;
