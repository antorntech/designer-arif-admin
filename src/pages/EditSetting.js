import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const EditSetting = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [settingData, setSettingData] = useState({});
  const [settingPhotoFileList, setSettingPhotoFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/settings/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Setting data");
        }
        return res.json();
      })
      .then((data) => {
        setSettingData(data);
        form.setFieldsValue(data);
      })
      .catch((error) => {
        console.error("Error fetching Setting data:", error);
        message.error("Failed to fetch Setting data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    settingPhotoFileList.forEach((file) => {
      formData.append("logoPic", file);
    });

    setUploading(true);
    // You can use any AJAX library you like
    fetch(`http://localhost:8000/api/v1/settings/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update setting data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Setting data updated successfully.");
        navigate.push("/settings");
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to update service data.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const settingPhotoFileProps = {
    onRemove: (file) => {
      const index = settingPhotoFileList.indexOf(file);
      const newFileList = settingPhotoFileList.slice();
      newFileList.splice(index, 1);
      setSettingPhotoFileList(newFileList);
    },
    beforeUpload: (file) => {
      setSettingPhotoFileList([...settingPhotoFileList, file]);
      return false;
    },
    fileList: settingPhotoFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Logo
        </h1>
        <p>You can edit logo from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            form={form}
            initialValues={settingData}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item
                  name="logoPic"
                  label="Upload Logo"
                  rules={[
                    {
                      required: true,
                      message: "Please enter logo image",
                    },
                  ]}
                >
                  <Upload {...settingPhotoFileProps}>
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
