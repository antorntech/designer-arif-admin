import { Space, Table, Button, Modal } from "antd";
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

const Qualification = () => {
  const [experiences, setExperience] = useState([]);
  const [certification, setCertification] = useState([]);
  console.log(experiences);
  const getExperience = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("https://api.designerarif.com/api/v1/experience", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data && data.length > 0) {
            setExperience(data);
          } else {
            // Perform some action or set a message indicating that there is no data to reverse
            console.log("No data found to reverse!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getCertification = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("https://api.designerarif.com/api/v1/certification", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data && data.length > 0) {
            setCertification(data);
          } else {
            // Perform some action or set a message indicating that there is no data to reverse
            console.log("No data found to reverse!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExperience();
    getCertification();
  }, []);

  // delete model is open
  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content:
        "After click on delete then your item will be delete permanently.",
      okText: "Delete",
      okType: "danger",

      onOk() {
        fetch(`https://api.designerarif.com/api/v1/experience/delete/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("Header Menu Deleted Successfully", {
              autoClose: 1000,
            });
            getExperience();
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      {experiences && experiences.length > 0 ? (
        <div>
          <div style={{ marginTop: "30px", overflowX: "auto" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                <div>
                  <h1>Experience Table</h1>
                  <p>
                    Experience's {experiences.length > 0 ? "are" : "not"}{" "}
                    available.
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Button type="primary" className="primary-btn">
                      <Link to="/qualification/add-experience">
                        <PlusOutlined style={{ marginRight: "5px" }} />
                        Add Experience
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <Table dataSource={experiences}>
                <Column
                  title="Start Time"
                  dataIndex="starttime"
                  key="starttime"
                />
                <Column title="End Time" dataIndex="endtime" key="endtime" />
                <Column title="Title" dataIndex="title" key="title" />
                <Column title="Location" dataIndex="location" key="location" />
                <Column
                  title="Action"
                  key="action"
                  width="100px"
                  render={(_, record) => (
                    <Space size="middle">
                      <Link to={`/qualification/edit-experience/${record._id}`}>
                        <Button type="primary">
                          <EditOutlined />
                        </Button>
                      </Link>
                      <Button
                        type="danger"
                        onClick={() => showConfirm(record._id)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Space>
                  )}
                />
              </Table>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                <div>
                  <h1>Certification Table</h1>
                  <p>
                    Certification's {certification.length > 0 ? "are" : "not"}{" "}
                    available.
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Button type="primary" className="primary-btn">
                      <Link to="/qualification/add-certification">
                        <PlusOutlined style={{ marginRight: "5px" }} />
                        Add Certification
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <Table dataSource={certification}>
                <Column
                  title="Start Time"
                  dataIndex="starttime"
                  key="starttime"
                />
                <Column title="End Time" dataIndex="endtime" key="endtime" />
                <Column title="Title" dataIndex="title" key="title" />
                <Column title="Location" dataIndex="location" key="location" />
                <Column
                  title="Action"
                  key="action"
                  width="100px"
                  render={(_, record) => (
                    <Space size="middle">
                      <Link
                        to={`/qualification/edit-certification/${record._id}`}
                      >
                        <Button type="primary">
                          <EditOutlined />
                        </Button>
                      </Link>
                      <Button
                        type="danger"
                        onClick={() => showConfirm(record._id)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Space>
                  )}
                />
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <div>
              <h1>Experience & Certification Table</h1>
              <p>Experience & Certification's are not available.</p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Button type="primary" className="primary-btn">
                  <Link to="/qualification/add-experience">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Experience
                  </Link>
                </Button>
                <Button type="primary" className="primary-btn">
                  <Link to="/qualification/add-certification">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Certification
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default Qualification;
