import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const EditServices = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [servicesData, setServicesData] = useState({});
  const [thumbnailFileList, setThumbnailFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/services/${id}`, {
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

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    thumbnailFileList.forEach((file) => {
      formData.append("thumbnail", file);
    });

    formData.append("title", values.title);
    setUploading(true);
    // You can use any AJAX library you like
    fetch(`http://localhost:8000/api/v1/services/update/${id}`, {
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

  return (
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
  );
};