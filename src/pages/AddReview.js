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

const AddReview = () => {
  const navigate = useHistory();

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
    formData.append("name", values.name);
    formData.append("designation", values.designation);
    formData.append("rating", values.rating);
    formData.append("review", values.review);
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://api.designerarif.com/api/v1/reviews/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        // Reset form
        setAvatarFileList([]);
        message.success("Review Added Successfully.");
        navigate.push("/reviews");
      })
      .catch(() => {
        message.error("Review Add Failed.");
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
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Add Review
        </h1>
        <p>You can add review from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form onFinish={handleUpload} layout="vertical">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  placeholder="Enter name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter client name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="designation"
                  label="Designation"
                  placeholder="Enter designation"
                  rules={[
                    {
                      required: true,
                      message: "Please enter client designation",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="rating"
                  label="Rating"
                  placeholder="Enter rating"
                  rules={[
                    {
                      required: true,
                      message: "Please enter client rating",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="review"
                  label="Review"
                  placeholder="Enter review"
                  rules={[
                    {
                      required: true,
                      message: "Please enter review",
                    },
                  ]}
                >
                  <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item
                  name="avatar"
                  label="Upload avatar"
                  rules={[
                    {
                      required: true,
                      message: "Please enter avatar",
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

export default AddReview;
