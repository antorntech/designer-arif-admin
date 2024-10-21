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

const HeroContent = () => {
  const [heroContent, setHeroContent] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getHeroContent = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("https://api.designerarif.com/api/v1/herocontent", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setHeroContent(data); // Update heroContent state with fetched data
          setLoading(false); // Set loading state to false after data is fetched
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getHeroContent();
  }, []);

  // Delete hero content item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`https://api.designerarif.com/api/v1/herocontent/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Hero Content Deleted Successfully", {
          autoClose: 1000,
        });
        getHeroContent(); // Fetch updated list after successful deletion
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
            <h1>Hero Content</h1>
            <p>
              Hero contents are{" "}
              {heroContent.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            {heroContent.length > 0 ? (
              <Button type="primary" disabled>
                <Link to="/add-hero-content">
                  <PlusOutlined style={{ marginRight: "5px" }} />
                  Add Hero Content
                </Link>
              </Button>
            ) : (
              <Button type="primary" className="primary-btn">
                <Link to="/add-hero-content">
                  <PlusOutlined style={{ marginRight: "5px" }} />
                  Add Hero Content
                </Link>
              </Button>
            )}
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : heroContent.length > 0 ? (
          <Table dataSource={heroContent} rowKey="_id">
            <Column
              title="Banner"
              dataIndex="banner"
              key="banner"
              width="200px"
              render={(banner) => (
                <img
                  src={`https://api.designerarif.com${banner}`}
                  style={{ width: "250px", height: "150px" }}
                />
              )}
            />
            <Column title="Title" dataIndex="title" key="title" />
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
                  <Link to={`/edit-hero-content/${record._id}`}>
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

export default HeroContent;
