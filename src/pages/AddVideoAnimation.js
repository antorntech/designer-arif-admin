import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, message, Row, Col } from "antd";
import { useHistory } from "react-router-dom";

const AddVideoAnimation = () => {
  const navigate = useHistory();

  const [bannerFileList, setBannerFileList] = useState([]);

  const handleUpload = (values) => {
    const formData = new FormData();

    bannerFileList.forEach((file) => {
      formData.append("banner", file);
    });

    formData.append("videoUrl", values.videoUrl);
    fetch("https://api.designerarif.com/api/v1/videoanimations/add", {
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
        message.success("VideoAnimation Added Successfully.");
        navigate.push("/videoanimations");
      })
      .catch((error) => {
        console.error("VideoAnimation Add Failed:", error);
        message.error("VideoAnimation Add Failed.");
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

  const handleSubmit = (values) => {
    handleUpload(values);
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Add Video Animation
        </h1>
        <p>You can add video animation details from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form onFinish={handleSubmit} layout="vertical">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item
                  name="videoUrl"
                  label="Video Url"
                  placeholder="Enter video url"
                  rules={[
                    {
                      required: true,
                      message: "Please enter video url",
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

export default AddVideoAnimation;
