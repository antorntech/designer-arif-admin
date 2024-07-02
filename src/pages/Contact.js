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

const Contact = () => {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getContact = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:8000/api/v1/contact", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setContact(data); // Update contact state with fetched data
          setLoading(false); // Set loading state to false after data is fetched
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  // Delete contact item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`http://localhost:8000/api/v1/contact/delete/${id}`, {
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
        getContact(); // Fetch updated list after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
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
            marginBottom: "30px",
          }}
        >
          <div>
            <h1>Contact Details</h1>
            <p>
              Contact details are{" "}
              {contact.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            {contact.length > 0 ? (
              <Button type="primary" disabled>
                <Link to="/contact/add-contact">
                  <PlusOutlined style={{ marginRight: "5px" }} />
                  Add Contact Details
                </Link>
              </Button>
            ) : (
              <Button type="primary" className="primary-btn">
                <Link to="/contact/add-contact">
                  <PlusOutlined style={{ marginRight: "5px" }} />
                  Add Contact Details
                </Link>
              </Button>
            )}
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : contact.length > 0 ? (
          <Table
            dataSource={contact}
            rowKey="_id"
            scroll={{
              x: 1000,
            }}
          >
            <Column
              title="Banner"
              dataIndex="banner"
              key="banner"
              width="200px"
              render={(banner) => (
                <img
                  src={`http://localhost:8000${banner}`}
                  style={{ width: "120px", height: "50px" }}
                />
              )}
            />
            <Column title="Title" dataIndex="title" key="title" />
            <Column title="Name" key="name" dataIndex="name" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Phone" dataIndex="phone" key="phone" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column
              title="Description"
              key="description"
              render={(_, record) => (
                <Space>
                  <p style={{ color: "#000" }}>
                    {record.description.slice(0, 40)}...
                  </p>
                </Space>
              )}
            />
            <Column
              title="Action"
              key="action"
              width="100px"
              render={(_, record) => (
                <Space size="middle">
                  <Link to={`/contact/edit-contact/${record._id}`}>
                    <Button type="primary">
                      <EditOutlined />
                    </Button>
                  </Link>
                  <Button type="danger" onClick={() => showConfirm(record._id)}>
                    <DeleteOutlined />
                  </Button>
                </Space>
              )}
            />
          </Table>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Contact;
