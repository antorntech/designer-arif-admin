import { Space, Table, Button, Modal, Row, Col, Card } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/shared/loader/Loader";

const { confirm } = Modal;
const { Column } = Table;

const About = () => {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getAbout = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("https://api.designerarif.com/api/v1/about", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAbout(data); // Update about state with fetched data
          setLoading(false); // Set loading state to false after data is fetched
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  // Delete about item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`https://api.designerarif.com/api/v1/about/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("About Deleted Successfully", {
          autoClose: 1000,
        });
        getAbout(); // Fetch updated list after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting about:", error);
        setLoading(false); // Set loading state to false if there's an error
      });
  };

  // Confirm delete modal
  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content:
        "After click on delete then your item will be delete permanently.",
      okText: "Delete",
      okType: "danger",
      onOk() {
        handleDelete(id); // Call handleDelete function on OK
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1>About Details</h1>
            <p>
              About details are{" "}
              {about.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            {about.length > 0 ? (
              <Button type="primary" disabled>
                <Link to="/about/add-about">
                  <PlusOutlined style={{ marginRight: "5px" }} />
                  Add About Details
                </Link>
              </Button>
            ) : (
              <Button type="primary" className="primary-btn">
                <Link to="/about/add-about">
                  <PlusOutlined style={{ marginRight: "5px" }} />
                  Add About Details
                </Link>
              </Button>
            )}
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : about.length > 0 ? (
          <div>
            <Row gutter={[16, 16]}>
              {about.map((item) => (
                <Col xs={24} sm={24} md={24} lg={12} key={item._id}>
                  <Card className="profile-card">
                    <Row gutter={16}>
                      {/* Left Section - Image */}
                      <Col xs={24} md={12}>
                        <div className="image-container">
                          <img
                            alt="Banner"
                            src={`https://api.designerarif.com${item.banner}`}
                          />
                        </div>
                      </Col>

                      {/* Right Section - Details */}
                      <Col xs={24} md={12}>
                        <div className="profile-details">
                          <h3 style={{ fontSize: "22px", color: "#fff" }}>
                            {item.title}
                          </h3>
                          <p>
                            <strong>Name:</strong> {item.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {item.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {item.phone}
                          </p>
                          <p>
                            <strong>Address:</strong> {item.address}
                          </p>
                          <p>
                            <strong>Description:</strong>{" "}
                            {item.description.slice(0, 40)}...
                          </p>
                          <Space size="middle" style={{ marginTop: "10px" }}>
                            <Link to={`/about/edit-about/${item._id}`}>
                              <Button type="primary">
                                <EditOutlined style={{ fontSize: "16px" }} />
                              </Button>
                            </Link>
                            <Button
                              type="danger"
                              onClick={() => showConfirm(item._id)}
                            >
                              <DeleteOutlined style={{ fontSize: "16px" }} />
                            </Button>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default About;
