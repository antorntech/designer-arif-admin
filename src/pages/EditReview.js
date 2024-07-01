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

export const EditReview = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [reviewData, setReviewData] = useState({});
  const [avatarFileList, setAvatarFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/reviews/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Review data");
        }
        return res.json();
      })
      .then((data) => {
        setReviewData(data);
        form.setFieldsValue(data);
      })
      .catch((error) => {
        console.error("Error fetching Review data:", error);
        message.error("Failed to fetch Review data");
      });
  }, [id, form]);

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
    fetch(`http://localhost:8000/api/v1/reviews/update/${id}`, {
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
        message.success("Review data updated successfully.");
        navigate.push("/reviews");
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to update service data.");
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
      return false;
    },
    fileList: avatarFileList,
  };

  return (
    <Row gutter={[24, 0]}>
      <Col xs={24} md={12} lg={12}>
        <Form
          onFinish={handleUpload}
          layout="vertical"
          form={form}
          initialValues={reviewData}
        >
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
                  style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
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
  );
};
