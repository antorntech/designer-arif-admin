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

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const getNotifications = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("https://api.designerarif.com/api/v1/contact", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setNotifications(data);
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
    getNotifications();
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
        fetch(`https://api.designerarif.com/api/v1/contact/delete/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("Notification Deleted Successfully", {
              autoClose: 1000,
            });
            getNotifications();
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      {notifications && notifications.length > 0 ? (
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
              <h1>Notification Table</h1>
              <p>Notification's are available.</p>
            </div>
            {/* <div>
              <div style={{ marginRight: "10px" }}>
                <Button type="primary" className="primary-btn">
                  <Link to="/add-head-menu">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Menu
                  </Link>
                </Button>
              </div>
            </div> */}
          </div>
          <div style={{ marginTop: "30px", overflowX: "auto" }}>
            <Table dataSource={notifications}>
              <Column
                title="First Name"
                dataIndex="firstname"
                key="firstname"
              />
              <Column title="Last Name" dataIndex="lastname" key="lastname" />
              <Column title="Email" dataIndex="email" key="email" />
              <Column title="Phone" dataIndex="phone" key="phone" />
              <Column title="Subject" dataIndex="subject" key="subject" />
              <Column title="Message" dataIndex="message" key="message" />
              <Column
                title="Action"
                key="action"
                width="100px"
                render={(_, record) => (
                  <Space size="middle">
                    {/* <Link to={`/edit-head-menu/${record._id}`}>
                      <Button type="primary">
                        <EditOutlined />
                      </Button>
                    </Link> */}
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
              <h1>Notification Table</h1>
              <p>Notification's are available.</p>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <Button type="primary" className="primary-btn">
                  <Link to="/add-head-menu">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Menu
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

export default Notification;
