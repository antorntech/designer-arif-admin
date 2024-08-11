import React, { useState } from "react";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Upload,
  Button,
  message,
  Row,
  Col,
  DatePicker,
} from "antd";
import { useHistory } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

const AddSlider = () => {
  const navigate = useHistory();

  const [uploading, setUploading] = useState(false);
  const [mobilePhotoFileList, setMobilePhotoFileList] = useState([]);
  const [desktopPhotoFileList, setDesktopPhotoFileList] = useState([]);

  const handleUpload = (values) => {
    const formData = new FormData();

    mobilePhotoFileList.forEach((file) => {
      formData.append("mobilePhoto", file);
    });

    desktopPhotoFileList.forEach((file) => {
      formData.append("desktopPhoto", file);
    });

    setUploading(true);

    // You can use any AJAX library you like
    fetch("http://localhost:8000/api/v1/slider/addSlider", {
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
        setMobilePhotoFileList([]);
        setDesktopPhotoFileList([]);
        message.success("Slider Added Successfully.");
        navigate.push("/slider");
      })
      .catch((error) => {
        console.error("Slider Add Failed:", error);
        message.error("Slider Add Failed.");
      })
      .finally(() => setUploading(false));
  };

  const mobilePhotoFileProps = {
    onRemove: (file) => {
      const index = mobilePhotoFileList.indexOf(file);
      const newFileList = mobilePhotoFileList.slice();
      newFileList.splice(index, 1);
      setMobilePhotoFileList(newFileList);
    },
    beforeUpload: (file) => {
      setMobilePhotoFileList([...mobilePhotoFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: mobilePhotoFileList,
  };

  const desktopPhotoFileProps = {
    onRemove: (file) => {
      const index = desktopPhotoFileList.indexOf(file);
      const newFileList = desktopPhotoFileList.slice();
      newFileList.splice(index, 1);
      setDesktopPhotoFileList(newFileList);
    },
    beforeUpload: (file) => {
      setDesktopPhotoFileList([...desktopPhotoFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: desktopPhotoFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Add Slider
        </h1>
        <p>You can add blog from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form onFinish={handleUpload} layout="vertical">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item
                  name="mobilePhoto"
                  label="Upload Mobile Photo (W-330px) (H-600px)"
                >
                  <Upload {...mobilePhotoFileProps}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  name="desktopPhoto"
                  label="Upload Desktop Photo (W-1450px) (H-650px)"
                  rules={[
                    {
                      required: true,
                      message: "Upload Desktop Photo",
                    },
                  ]}
                >
                  <Upload {...desktopPhotoFileProps}>
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

export default AddSlider;
