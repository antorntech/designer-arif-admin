import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Upload, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const EditFreeResource = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [freeResourceData, setFreeResourceData] = useState({});
  const [bannerFileList, setBannerFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`https://api.designerarif.com/api/v1/freeresource/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Blog data");
        }
        return res.json();
      })
      .then((data) => {
        setFreeResourceData(data);
        form.setFieldsValue(data);
      })
      .catch((error) => {
        console.error("Error fetching Blog data:", error);
        message.error("Failed to fetch Blog data");
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
    formData.append("link", values.link);
    setUploading(true);
    // You can use any AJAX library you like
    fetch(`https://api.designerarif.com/api/v1/freeresource/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update review data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Blog data updated successfully.");
        navigate.push("/freeresource");
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to update service data.");
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
      return false;
    },
    fileList: bannerFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Free Resource
        </h1>
        <p>You can edit free resource from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            form={form}
            initialValues={freeResourceData}
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
                      message: "Please enter blog title",
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
                      message: "Please enter blog description",
                    },
                  ]}
                >
                  <TextArea rows={6} />
                </Form.Item>
                <Form.Item
                  name="link"
                  label="Link"
                  placeholder="Enter link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter free resource link",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="banner"
                  label="Upload banner"
                  rules={[
                    {
                      required: true,
                      message: "",
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
