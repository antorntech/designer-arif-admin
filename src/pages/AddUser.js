import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  message,
  Row,
  Col,
} from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddUser = () => {
  const navigate = useHistory();

  const [officeApvFileList, setOfficeApvFileList] = useState([]);
  const [avatarFileList, setAvatarFileList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [uploading, setUploading] = useState(false);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    avatarFileList.forEach((file) => {
      formData.append("avatar", file);
    });

    // Append other form data
    formData.append("officeId", values.officeId);
    formData.append("firstName", values.firstName);
    formData.append("officeEmail", values.officeEmail);
    formData.append("lastName", values.lastName);
    formData.append("designation", values.designation);
    formData.append("primaryMobNumber", values.primaryMobNumber);
    formData.append("secondaryMobNumber", values.secondaryMobNumber);
    setUploading(true);
    // You can use any AJAX library you like
    fetch("http://localhost:8000/api/v1/user/addEmployee", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        // Reset form
        setOfficeApvFileList([]);
        setAvatarFileList([]);
        message.success("upload successfully.");
        navigate.push("/users");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const avatarFileProps = {
    onRemove: (file) => {
      const index = avatarFileList.indexOf(file);
      const newFileList = avatarFileList.slice();
      newFileList.splice(index, 1);
      setAvatarFileList(newFileList);
    },
    beforeUpload: (file) => {
      setAvatarFileList([...avatarFileList, file]);
      return false; // Prevent default upload behavior
    },
    fileList: avatarFileList,
  };

  return (
    <Row gutter={[24, 0]}>
      <Col xs={24} md={12} lg={12}>
        <Form onFinish={handleUpload} layout="vertical">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="officeId"
                label="OfficeId"
                placeholder="Enter officeId"
                rules={[
                  {
                    required: true,
                    message: "Please enter product officeId",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="firstName"
                label="First Name"
                placeholder="Enter firstName"
                rules={[
                  {
                    required: true,
                    message: "Please enter user firstName",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="officeEmail"
                label="Office Email"
                placeholder="Enter officeEmail"
                rules={[
                  {
                    required: true,
                    message: "Please enter user officeEmail",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                placeholder="Enter lastName"
                rules={[
                  {
                    required: true,
                    message: "Please enter user lastName",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="designation"
            label="Designation"
            placeholder="Enter designation"
            rules={[
              {
                required: true,
                message: "Please enter user designation",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="primaryMobNumber"
                label="Primary Mobile Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter Primary Mobile Number",
                  },
                ]}
              >
                <InputNumber
                  prefix="+88"
                  type="number"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Form.Item
                name="secondaryMobNumber"
                label="Secondary Mobile Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter Secondary Mobile Number",
                  },
                ]}
              >
                <InputNumber
                  prefix="+88"
                  type="number"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="avatar"
                label="Upload User Photo"
                rules={[
                  {
                    required: true,
                    message: "Please enter user photo",
                  },
                ]}
              >
                <Upload {...avatarFileProps}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AddUser;
