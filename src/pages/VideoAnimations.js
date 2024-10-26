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

const VideoAnimations = () => {
  const [videoAnimations, setVideoAnimations] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getVideoAnimations = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("https://api.designerarif.com/api/v1/videoanimations", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setVideoAnimations(data); // Update videoAnimations state with fetched data
          setLoading(false); // Set loading state to false after data is fetched
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getVideoAnimations();
  }, []);

  // Delete hero content item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`https://api.designerarif.com/api/v1/videoanimations/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("VideoAnimation Deleted Successfully", {
          autoClose: 1000,
        });
        getVideoAnimations(); // Fetch updated list after successful deletion
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
            <h1>Video Animation</h1>
            <p>
              Video Animations are{" "}
              {videoAnimations.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            <Button type="primary" className="primary-btn">
              <Link to="/videoAnimations/add">
                <PlusOutlined style={{ marginRight: "5px" }} />
                Add VideoAnimation
              </Link>
            </Button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : videoAnimations.length > 0 ? (
          <Table
            dataSource={videoAnimations}
            rowKey="_id"
            scroll={{
              x: 1000,
            }}
          >
            <Column
              fixed="left"
              title="Banner"
              dataIndex="banner"
              key="banner"
              width="100px"
              render={(banner) => (
                <img
                  src={`https://api.designerarif.com${banner}`}
                  alt="banner"
                  style={{ width: "100px", height: "50px" }}
                />
              )}
            />
            <Column title="Video Url" dataIndex="videoUrl" key="videoUrl" />
            <Column
              title="Action"
              key="action"
              width="150px"
              render={(_, record) => (
                <Space size="middle">
                  <Link to={`/videoAnimations/edit/${record._id}`}>
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

export default VideoAnimations;
