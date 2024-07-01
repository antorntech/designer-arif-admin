import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Upload,
  Button,
  message,
  Row,
  Col,
  InputNumber,
} from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddSkill = () => {
  const navigate = useHistory();

  const [skillPhotoFileList, setSkillPhotoFileList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [uploading, setUploading] = useState(false);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    skillPhotoFileList.forEach((file) => {
      formData.append("skillphoto", file);
    });

    // Append other form data
    formData.append("title", values.title);
    formData.append("percentance", values.percentance);
    setUploading(true);
    // You can use any AJAX library you like
    fetch("http://localhost:8000/api/v1/skills/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        // Reset form
        setSkillPhotoFileList([]);
        message.success("Skill Added Successfully.");
        navigate.push("/skills");
      })
      .catch(() => {
        message.error("Skill Add Failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const skillPhotoFileProps = {
    onRemove: (file) => {
      const index = skillPhotoFileList.indexOf(file);
      const newFileList = skillPhotoFileList.slice();
      newFileList.splice(index, 1);
      setSkillPhotoFileList(newFileList);
    },
    beforeUpload: (file) => {
      setSkillPhotoFileList([...skillPhotoFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: skillPhotoFileList,
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
                    message: "Please enter service title",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="percentance"
                label="Percentance"
                placeholder="Enter percentance"
                rules={[
                  {
                    required: true,
                    message: "Please enter skill percentance",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
                />
              </Form.Item>
              <Form.Item
                name="skillphoto"
                label="Upload Skill Photo"
                rules={[
                  {
                    required: true,
                    message: "Please enter skill photo",
                  },
                ]}
              >
                <Upload {...skillPhotoFileProps}>
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

export default AddSkill;
