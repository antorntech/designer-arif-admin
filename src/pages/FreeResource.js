import { Space, Table, Button, Modal, Tag } from "antd";
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

const FreeResource = () => {
  const [freeresource, setFreeResource] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getFreeResource = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:8000/api/v1/freeresource", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFreeResource(data); // Update freeresource state with fetched data
          setLoading(false); // Set loading state to false after data is fetched
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getFreeResource();
  }, []);

  // Delete hero content item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`http://localhost:8000/api/v1/freeresource/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Free Resource Deleted Successfully", {
          autoClose: 1000,
        });
        getFreeResource(); // Fetch updated list after successful deletion
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
            marginBottom: "30px",
          }}
        >
          <div>
            <h1>Free Resource</h1>
            <p>
              FreeResource are{" "}
              {freeresource.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            <Button type="primary" className="primary-btn">
              <Link to="/freeresource/add-freeresource">
                <PlusOutlined style={{ marginRight: "5px" }} />
                Add Free Resource
              </Link>
            </Button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : freeresource.length > 0 ? (
          <Table
            dataSource={freeresource}
            rowKey="_id"
            scroll={{
              x: 1000,
            }}
          >
            <Column
              title="Banner"
              dataIndex="banner"
              key="banner"
              width="100px"
              render={(banner) => (
                <img
                  src={`http://localhost:8000${banner}`}
                  alt="banner"
                  style={{ width: "100px", height: "50px" }}
                />
              )}
            />
            <Column
              title="Title"
              key="title"
              render={(_, record) => (
                <Space>
                  <p style={{ color: "#000" }}>
                    {record?.title?.slice(0, 30)}...
                  </p>
                </Space>
              )}
            />
            <Column
              title="Description"
              key="description"
              render={(_, record) => (
                <Space>
                  <p style={{ color: "#000" }}>
                    {record?.description?.slice(0, 30)}...
                  </p>
                </Space>
              )}
            />
            <Column title="Date" dataIndex="date" key="date" width="150px" />
            <Column
              title="Link"
              key="link"
              render={(_, record) => (
                <Space>
                  {record?.link ? (
                    <a
                      href={record?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {record?.link?.slice(0, 20)}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </Space>
              )}
            />
            <Column
              title="Action"
              key="action"
              width="150px"
              render={(_, record) => (
                <Space size="middle">
                  <Link to={`/freeresource/edit-freeresource/${record._id}`}>
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

export default FreeResource;
