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

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getServices = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("https://api.designerarif.com/api/v1/services", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setServices(data); // Update services state with fetched data
          setLoading(false); // Set loading state to false after data is fetched
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  // Delete hero content item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`https://api.designerarif.com/api/v1/services/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Service Deleted Successfully", {
          autoClose: 1000,
        });
        getServices(); // Fetch updated list after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting hero content:", error);
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
            marginBottom: "5px",
          }}
        >
          <div>
            <h1>Services Table</h1>
            <p>
              Services are{" "}
              {services.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            <Button type="primary" className="primary-btn">
              <Link to="/add-service">
                <PlusOutlined style={{ marginRight: "5px" }} />
                Add Service
              </Link>
            </Button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : services.length > 0 ? (
          <Table dataSource={services} rowKey="_id">
            <Column
              title="Thumbnail"
              dataIndex="thumbnail"
              key="thumbnail"
              width="200px"
              render={(thumbnail) => (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`https://api.designerarif.com${thumbnail}`}
                    alt="Banner"
                  />
                </div>
              )}
            />
            <Column
              title="Main Photo"
              dataIndex="mainPhoto"
              key="mainPhoto"
              width="200px"
              render={(mainPhoto) => (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`https://api.designerarif.com${mainPhoto}`}
                    alt="Banner"
                  />
                </div>
              )}
            />
            <Column title="Title" dataIndex="title" key="title" />
            <Column title="Category" dataIndex="category" key="category" />
            <Column
              title="Action"
              key="action"
              width="100px"
              render={(_, record) => (
                <Space size="middle">
                  <Link to={`/edit-service/${record._id}`}>
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

export default Services;
