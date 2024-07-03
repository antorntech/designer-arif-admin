import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const EditServiceCategory = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [link, setLink] = useState("");
  const [serviceCategoryData, setServiceCategoryData] = useState({});
  const [thumbnailFileList, setThumbnailFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`https://api.designerarif.com/api/v1/servicecategory/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Services data");
        }
        return res.json();
      })
      .then((data) => {
        setServiceCategoryData(data);
        form.setFieldsValue(data);
      })
      .catch((error) => {
        console.error("Error fetching Service Category data:", error);
        message.error("Failed to fetch Service Category data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    thumbnailFileList.forEach((file) => {
      formData.append("thumbnail", file);
    });

    formData.append("title", values.title);
    setUploading(true);
    // You can use any AJAX library you like
    fetch(`https://api.designerarif.com/api/v1/servicecategory/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update service category data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Service Category data updated successfully.");
        navigate.push("/service-category");
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to update service category data.");
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
      setThumbnailFileList(newFileList);
    },
    beforeUpload: (file) => {
      setThumbnailFileList([...thumbnailFileList, file]);
      return false;
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
          Edit Service
        </h1>
        <p>You can edit service from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            form={form}
            initialValues={serviceCategoryData}
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
                      message: "Please enter service category title",
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
                  label="Upload Thumbnail"
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
              <Button type="primary" htmlType="submit" className="primary-btn">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
