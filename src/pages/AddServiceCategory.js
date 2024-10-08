import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, message, Row, Col, Select } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddServiceCategory = () => {
  const navigate = useHistory();
  const [link, setLink] = useState("");
  const [thumbnailFileList, setBannerFileList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [uploading, setUploading] = useState(false);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    thumbnailFileList.forEach((file) => {
      formData.append("thumbnail", file);
    });

    // Append other form data
    formData.append("title", values.title);
    formData.append("link", values.link);
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://api.designerarif.com/api/v1/servicecategory/add", {
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
        message.success("Service Added Successfully.");
        navigate.push("/service-category");
      })
      .catch(() => {
        message.error("Service Category Add Failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const thumbnailFileProps = {
    onRemove: (file) => {
      const index = thumbnailFileList.indexOf(file);
      const newFileList = thumbnailFileList.slice();
      newFileList.splice(index, 1);
      setBannerFileList(newFileList);
    },
    beforeUpload: (file) => {
      setBannerFileList([...thumbnailFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: thumbnailFileList,
  };

  const handleLinkChange = (value) => {
    setLink(value);
    console.log(value);
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Add Service Category
        </h1>
        <p>You can add service category from here.</p>
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
                      message: "Please enter service title",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="link"
                  label="Link"
                  placeholder="Enter link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter link",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select link"
                    options={[
                      {
                        label: "All Logo Design",
                        value: "all-logo-design",
                      },
                      {
                        label: "All Branding",
                        value: "all-branding",
                      },
                      {
                        label: "All Print Design",
                        value: "all-print-design",
                      },
                      {
                        label: "All Social Media",
                        value: "all-social-media",
                      },
                      {
                        label: "All Animation",
                        value: "all-animation",
                      },
                      {
                        label: "All 3d Modeling",
                        value: "all-3d-modeling",
                      },
                    ]}
                    onChange={handleLinkChange}
                  />
                </Form.Item>
                <Form.Item
                  name="thumbnail"
                  label="Upload Banner"
                  rules={[
                    {
                      required: true,
                      message: "Please enter thumbnail",
                    },
                  ]}
                >
                  <Upload {...thumbnailFileProps}>
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

export default AddServiceCategory;
