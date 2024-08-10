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

const Slider = () => {
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getSlider = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:8000/api/v1/slider", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSlider(data); // Update slider state with fetched data
          setLoading(false); // Set loading state to false after data is fetched
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getSlider();
  }, []);

  // Delete hero content item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`http://localhost:8000/api/v1/slider/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Blog Deleted Successfully", {
          autoClose: 1000,
        });
        getSlider(); // Fetch updated list after successful deletion
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
            <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0px" }}>
              Slider
            </h1>
            <p>
              Slider are {slider.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            <Button type="primary" className="primary-btn">
              <Link to="/slider/add-slider">
                <PlusOutlined style={{ marginRight: "5px" }} />
                Add Slider
              </Link>
            </Button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : slider.length > 0 ? (
          //   <Table dataSource={slider} rowKey="_id">
          //     <Column
          //       title="Desktop Photo"
          //       dataIndex="desktopPhoto"
          //       key="desktopPhoto"
          //       render={(_, record) => (
          //         <img
          //           src={`http://localhost:8000${record.desktopPhoto}`}
          //           style={{ width: "150px", height: "150px" }}
          //         />
          //       )}
          //     />
          //     <Column
          //       title="Action"
          //       key="action"
          //       width="100px"
          //       render={(_, record) => (
          //         <Space size="middle">
          //           <Link to={`/slider/edit-slider/${record._id}`}>
          //             <Button type="primary">
          //               <EditOutlined />
          //             </Button>
          //           </Link>
          //           <Button type="danger" onClick={() => showConfirm(record._id)}>
          //             <DeleteOutlined />
          //           </Button>
          //         </Space>
          //       )}
          //     />
          //   </Table>
          <div>
            {slider.map((slider) => (
              <div>
                <div>
                  <img
                    src={`http://localhost:8000${slider.desktopPhoto}`}
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <div>
                  <Link to={`/slider/edit-slider/${slider._id}`}>
                    <Button type="primary">
                      <EditOutlined />
                    </Button>
                  </Link>
                  <Button type="danger" onClick={() => showConfirm(slider._id)}>
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Slider;
