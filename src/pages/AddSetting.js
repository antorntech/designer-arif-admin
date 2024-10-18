import React, { useState } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Form, Upload, Button, message, Row, Col, Image } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddSetting = () => {
  const navigate = useHistory();
  const [settingPhotoFileList, setSettingPhotoFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // Store preview URL
  const [uploading, setUploading] = useState(false);

  const handleUpload = (values) => {
    const formData = new FormData();

    settingPhotoFileList.forEach((file) => {
      formData.append("logoPic", file);
    });

    setUploading(true);

    fetch("https://api.designerarif.com/api/v1/settings/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setSettingPhotoFileList([]);
        setPreviewImage(null); // Reset preview image
        message.success("Logo Added Successfully.");
        navigate.push("/settings");
      })
      .catch(() => {
        message.error("Logo Add Failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const settingPhotoFileProps = {
    onRemove: (file) => {
      const newFileList = settingPhotoFileList.filter(
        (f) => f.uid !== file.uid
      );
      setSettingPhotoFileList(newFileList);
      setPreviewImage(null); // Clear preview when the file is removed
    },
    beforeUpload: (file) => {
      setSettingPhotoFileList([file]); // Limit to one file
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result); // Set preview image
      reader.readAsDataURL(file);
      return false; // Prevent default upload behavior
    },
    fileList: settingPhotoFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Add Logo
        </h1>
        <p>You can add logo from here.</p>
      </div>
      <Row justify="center" align="middle" style={{ minHeight: "70vh" }}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Form.Item
              name="logoPic"
              label="Upload Logo"
              rules={[
                { required: true, message: "Please upload a logo image" },
              ]}
            >
              <Upload {...settingPhotoFileProps} listType="picture">
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>

            {previewImage && (
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <Image
                  width={150}
                  src={previewImage}
                  alt="Preview"
                  style={{ marginBottom: 10 }}
                />
              </div>
            )}

            <Form.Item>
              <Button
                type="primary"
                className="primary-btn"
                htmlType="submit"
                loading={uploading}
                disabled={settingPhotoFileList.length === 0}
                block
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddSetting;
