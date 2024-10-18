import React, { useEffect, useState } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Upload, Image, message } from "antd";
import { useHistory, useParams } from "react-router-dom";

export const EditSetting = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [settingData, setSettingData] = useState({});
  const [settingPhotoFileList, setSettingPhotoFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // Store preview URL
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/settings/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch setting data");
        return res.json();
      })
      .then((data) => {
        setSettingData(data);
        form.setFieldsValue(data);
        if (data.logoPic) {
          setPreviewImage(data.logoPic); // Set preview image if available
        }
      })
      .catch((error) => {
        console.error("Error fetching setting data:", error);
        message.error("Failed to fetch setting data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const formData = new FormData();

    settingPhotoFileList.forEach((file) => {
      formData.append("logoPic", file);
    });

    setUploading(true);

    fetch(`http://localhost:8000/api/v1/settings/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update setting data");
        return res.json();
      })
      .then(() => {
        message.success("Setting updated successfully.");
        navigate.push("/settings");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update setting data.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const settingPhotoFileProps = {
    onRemove: () => {
      setSettingPhotoFileList([]);
      setPreviewImage(null); // Clear preview when file is removed
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
          Edit Logo
        </h1>
        <p>You can edit the logo from here.</p>
      </div>

      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            form={form}
            initialValues={settingData}
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
                  src={`http://localhost:8000${previewImage}`}
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
                disabled={settingPhotoFileList.length === 0 && !previewImage}
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
