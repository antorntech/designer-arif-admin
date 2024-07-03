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

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getReviews = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("https://api.designerarif.com/api/v1/reviews", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setReviews(data); // Update reviews state with fetched data
          setLoading(false); // Set loading state to false after data is fetched
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  // Delete hero content item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`https://api.designerarif.com/api/v1/reviews/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Review Deleted Successfully", {
          autoClose: 1000,
        });
        getReviews(); // Fetch updated list after successful deletion
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
            <h1>Review</h1>
            <p>
              Reviews are {reviews.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            <Button type="primary" className="primary-btn">
              <Link to="/reviews/add-review">
                <PlusOutlined style={{ marginRight: "5px" }} />
                Add Review
              </Link>
            </Button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : reviews.length > 0 ? (
          <Table dataSource={reviews} rowKey="_id">
            <Column
              title="Avatar"
              dataIndex="avatar"
              key="avatar"
              width="100px"
              render={(avatar) => (
                <img
                  src={`https://api.designerarif.com${avatar}`}
                  alt="avatar"
                  style={{ width: "100px", height: "50px" }}
                />
              )}
            />
            <Column title="Name" dataIndex="name" key="name" />
            <Column
              title="Designation"
              dataIndex="designation"
              key="designation"
            />
            <Column title="Rating" dataIndex="rating" key="rating" />
            <Column
              title="Review"
              key="review"
              render={(_, record) => (
                <Space>
                  <p style={{ color: "#000" }}>
                    {record?.review?.slice(0, 40)}...
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
                  <Link to={`/reviews/edit-review/${record._id}`}>
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

export default Reviews;
