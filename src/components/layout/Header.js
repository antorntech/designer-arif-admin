import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Drawer, Typography, Form } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const logsetting = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
      fill="#0bb0ba"
    ></path>
  </svg>
);

const toggler = (
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>
);

function Header({ placement, onPress }) {
  const { Title, Text } = Typography;
  const navigate = useHistory();
  const [visible, setVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // Initialize notification count state
  const [notifications, setNotifications] = useState([]); // State to store notifications

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("https://api.designerarif.com/api/v1/contact", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setNotificationCount(data.length); // Set initial notification count
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("https://api.designerarif.com/api/v1/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data.admins._id);
        console.log(data.admins._id);
      });
  }, []);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    fetch(`https://api.designerarif.com/api/v1/admin/${admin}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        toast.success("🎉 Admin Updated successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setVisible(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error updating admin", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showNotification = () => {
    // Navigate to notification page
    navigate.push("/notification");

    // Stop blinking animation and set notification count to 0
    setNotificationCount(0);
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="header-control">
          <Button
            onClick={handleLogout}
            type="primary"
            style={{ background: "#0bb0ba", border: "none", color: "white" }}
          >
            Logout
          </Button>
          <Button type="link" onClick={showDrawer}>
            {logsetting}
          </Button>
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button>

          <Drawer
            className="settings-drawer"
            mask={true}
            width={360}
            onClose={hideDrawer}
            placement={placement}
            visible={visible}
          >
            <div layout="vertical">
              <div className="header-top">
                <Title level={4}>
                  Profile Settings
                  <Text className="subtitle">
                    You can change your email and password
                  </Text>
                </Title>
              </div>

              <div className="sidebar-color">
                <Form
                  form={form}
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="Email"
                    placeholder="Enter your new email (optional)"
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    placeholder="Enter your new password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Drawer>

          <Button type="link" onClick={showNotification}>
            <div className="notification">
              <BellOutlined />
              {notificationCount > 0 && (
                <div className="notification-count">{notificationCount}</div>
              )}
            </div>
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Header;
