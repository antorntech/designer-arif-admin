import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Upload, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const EditServices = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [servicesData, setServicesData] = useState({});
  const [category, setCategory] = useState("");
  const [serviceCategory, setServiceCategory] = useState([]);
  const [thumbnailFileList, setThumbnailFileList] = useState([]);
  const [mainPhotoFileList, setMainPhotoFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const newCategory = category ? category : servicesData.category;

  useEffect(() => {
    fetch(`https://api.designerarif.com/api/v1/services/${id}`, {
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
        setServicesData(data);
        form.setFieldsValue(data);
      })
      .catch((error) => {
        console.error("Error fetching Service data:", error);
        message.error("Failed to fetch Service data");
      });
  }, [id, form]);

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

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", newCategory);
    setUploading(true);
    // You can use any AJAX library you like
    fetch(`https://api.designerarif.com/api/v1/services/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update service data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Service data updated successfully.");
        navigate.push("/services");
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to update service data.");
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
            initialValues={servicesData}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item name="title" label="Title" placeholder="Enter title">
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
                  >
                    <Upload {...thumbnailFileProps}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item name="mainPhoto" label="Upload Main Photo">
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
