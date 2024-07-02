import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, message, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";

const AddFreeResource = () => {
  const navigate = useHistory();
  const date = moment().format("ll");

  const [bannerFileList, setBannerFileList] = useState([]);

  const handleUpload = (values) => {
    const formData = new FormData();

    bannerFileList.forEach((file) => {
      formData.append("banner", file);
    });

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", date);
    formData.append("link", values.link);
    fetch("http://localhost:8000/api/v1/freeresource/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        setBannerFileList([]);
        message.success("FreeResource Added Successfully.");
        navigate.push("/freeresource");
      })
      .catch((error) => {
        console.error("FreeResource Add Failed:", error);
        message.error("FreeResource Add Failed.");
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
                    message: "Please enter free resource title",
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
                    message: "Please enter free resource description",
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
  );
};

export default AddFreeResource;
