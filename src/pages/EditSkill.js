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

export const EditSkill = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [skillData, setSkillData] = useState({});
  const [skillPhotoFileList, setSkillPhotoFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`https://api.designerarif.com/api/v1/skills/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Skill data");
        }
        return res.json();
      })
      .then((data) => {
        setSkillData(data);
        form.setFieldsValue(data);
      })
      .catch((error) => {
        console.error("Error fetching Skill data:", error);
        message.error("Failed to fetch Skill data");
      });
  }, [id, form]);

  const handleUpload = (values) => {
    const formData = new FormData();

    // Append user photo file to formData
    skillPhotoFileList.forEach((file) => {
      formData.append("skillphoto", file);
    });

    formData.append("title", values.title);
    formData.append("percentance", values.percentance);
    setUploading(true);
    // You can use any AJAX library you like
    fetch(`https://api.designerarif.com/api/v1/skills/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update skill data");
        }
        return res.json();
      })
      .then(() => {
        message.success("Skill data updated successfully.");
        navigate.push("/skills");
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to update service data.");
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
      return false;
    },
    fileList: skillPhotoFileList,
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Edit Skill
        </h1>
        <p>You can edit skill from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            form={form}
            initialValues={skillData}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item
                  name="title"
                  label="Title"
                  placeholder="Enter title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter skill title",
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
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
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
    </>
  );
};
