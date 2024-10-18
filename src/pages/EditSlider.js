import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Upload, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const EditSlider = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [sliderData, setSliderData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [mobilePhotoFileList, setMobilePhotoFileList] = useState([]);
  const [desktopPhotoFileList, setDesktopPhotoFileList] = useState([]);

  useEffect(() => {
    fetch(`https://api.designerarif.com/api/v1/slider/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Slider data");
        }
        return res.json();
      })
      .then((data) => {
        setSliderData(data);
        form.setFieldsValue(data);
      })
      .catch((error) => {
        console.error("Error fetching Slider data:", error);
        message.error("Failed to fetch Slider data");
      });
  }, [id, form]);

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
    fetch(`https://api.designerarif.com/api/v1/slider/update/${id}`, {
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
        message.success("Slider data updated successfully.");
        navigate.push("/slider");
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to update slider data.");
      })
      .finally(() => {
        setUploading(false);
      });
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
          Edit Slider
        </h1>
        <p>You can edit slider from here.</p>
      </div>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} lg={12}>
          <Form
            onFinish={handleUpload}
            layout="vertical"
            form={form}
            initialValues={sliderData}
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={24} lg={24}>
                <Form.Item name="mobilePhoto" label="Upload Mobile Photo">
                  <Upload {...mobilePhotoFileProps}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  name="desktopPhoto"
                  label="Upload Desktop Photo"
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
