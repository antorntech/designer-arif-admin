import React, { useState } from "react";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, message, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";

const AddBlog = () => {
  const navigate = useHistory();
  const date = moment().format("ll");

  const [bannerFileList, setBannerFileList] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleUpload = (values) => {
    const formData = new FormData();

    bannerFileList.forEach((file) => {
      formData.append("banner", file);
    });

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", date);
    formData.append("tags", tags); // Convert tags array to comma-separated string
    console.log(values);
    fetch("http://localhost:8000/api/v1/blogs/add", {
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
        setTags([]);
        message.success("Blog Added Successfully.");
        navigate.push("/blogs");
      })
      .catch((error) => {
        console.error("Blog Add Failed:", error);
        message.error("Blog Add Failed.");
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

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const handleSubmit = (values) => {
    handleUpload(values);
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
          Add Blog
        </h1>
        <p>You can add blog from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form onFinish={handleSubmit} layout="vertical">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item
                  name="title"
                  label="Title"
                  placeholder="Enter title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter blog title",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter blog description",
                    },
                  ]}
                >
                  <TextArea rows={6} />
                </Form.Item>
                <Form.Item label="Tags">
                  <Input
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onPressEnter={handleAddTag}
                    placeholder="Enter tags and press Enter"
                  />
                  <div style={{ marginTop: "15px", position: "relative" }}>
                    {tags.map((tag, index) => (
                      <Button
                        key={index}
                        style={{
                          marginRight: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <span>{tag}</span>{" "}
                        <CloseCircleOutlined
                          style={{
                            color: "gray",
                            marginLeft: "5px",
                            position: "absolute",
                            top: "10%",
                            fontSize: "18px",
                            transform: "translateY(-50%)",
                          }}
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Button>
                    ))}
                  </div>
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

export default AddBlog;
