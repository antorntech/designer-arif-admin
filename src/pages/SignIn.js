import React, { useEffect, useState } from "react";
import logo from "../assets/images/s.png";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
  message,
} from "antd";
import { toast } from "react-toastify";
const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [mainLogo, setMainLogo] = useState("");

  const getSettings = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token")); // Get token from local storage
    try {
      const response = await fetch(
        "https://api.designerarif.com/api/v1/settings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Set token in Authorization header
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMainLogo(data[0]); // Update settings state with fetched data
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const onFinish = (values) => {
    if (values) {
      fetch("https://api.designerarif.com/api/v1/admin/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          if (data.message === "Login successful") {
            toast.success("🎉 Wow Login Success!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              localStorage.setItem("token", JSON.stringify(data.token));
              window.location.href = "/";
            }, 1200);
          } else {
            toast.error("🚨 Admin Not Found!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1200);
          }
        });
      // localStorage.setItem('user', JSON.stringify(values));
    } else {
      message.error("Please fill all fields");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout
        className="layout-gradient"
        style={{ minHeight: "100vh", position: "relative" }}
      >
        <Content className="signin">
          <Row gutter={[24, 0]}>
            <Col
              className="signin-container"
              style={{
                top: "50%",
                left: "50%",
                width: "100%",
                padding: "20px 40px",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 8, offset: 0 }}
              md={{ span: 24 }}
            >
              <div style={{ textAlign: "center", margin: "10px 0" }}>
                <img
                  src={
                    mainLogo
                      ? `https://api.designerarif.com${mainLogo.logoPic}`
                      : logo
                  }
                  alt="logo"
                  width="200px"
                />
              </div>
              <Title
                className="font-regular text-muted text-center mb-4"
                level={5}
                style={{ color: "#000" }}
              >
                Enter your email and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "100%",
                      backgroundColor: "#0bb0ba",
                      border: "1px solid #0bb0ba",
                    }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default SignIn;
