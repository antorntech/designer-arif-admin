import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, message, Row, Col, Select } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";

const AddService = () => {
  const navigate = useHistory();
  const date = moment().format("ll");
  const [category, setCategory] = useState("");
  const [serviceCategory, setServiceCategory] = useState([]);
  const [thumbnailFileList, setThumbnailFileList] = useState([]);
  const [mainPhotoFileList, setMainPhotoFileList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`https://api.designerarif.com/api/v1/servicecategory`, {
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
        setServiceCategory(data);
      })
      .catch((error) => {
        console.error("Error fetching Service data:", error);
        message.error("Failed to fetch Service data");
      });
  }, []);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    thumbnailFileList.forEach((file) => {
      formData.append("thumbnail", file);
    });

    // Append user photo file to formData
    mainPhotoFileList.forEach((file) => {
      formData.append("mainPhoto", file);
    });

    // Append other form data
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", date);
    formData.append("category", category);
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://api.designerarif.com/api/v1/services/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        // Reset form
        setThumbnailFileList([]);
        message.success("Service Added Successfully.");
        navigate.push("/services");
      })
      .catch(() => {
        message.error("Service Add Failed.");
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
      return false; // Prevent default upload behavior
    },
    fileList: thumbnailFileList,
  };

  const mainPhotoFileProps = {
    onRemove: (file) => {
      const index = mainPhotoFileList.indexOf(file);
      const newFileList = mainPhotoFileList.slice();
      newFileList.splice(index, 1);
      setMainPhotoFileList(newFileList);
    },
    beforeUpload: (file) => {
      setMainPhotoFileList([...mainPhotoFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: mainPhotoFileList,
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    console.log(value);
  };

  const serviceOptions = serviceCategory.map((category) => ({
    label: category.title,
    value: category.title,
  }));

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Add Service
        </h1>
        <p>You can add service from here.</p>
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
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                >
                  <TextArea rows={6} />
                </Form.Item>
                <Form.Item
                  name="category"
                  label="Category"
                  placeholder="Enter category"
                  rules={[
                    {
                      required: true,
                      message: "Please enter category",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    style={{
                      width: "100%",
                      height: "40px",
                      lineHeight: "40px",
                    }}
                    placeholder="Please select category"
                    options={serviceOptions}
                    onChange={handleCategoryChange}
                  />
                </Form.Item>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "30px" }}
                >
                  <Form.Item
                    name="thumbnail"
                    label="Upload Thumbnail (W-350px) (H-380px)"
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
                  <Form.Item
                    name="mainPhoto"
                    label="Upload Main Photo"
                    rules={[
                      {
                        required: true,
                        message: "Please enter main photo",
                      },
                    ]}
                  >
                    <Upload {...mainPhotoFileProps}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  </Form.Item>
                </div>
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

export default AddService;
