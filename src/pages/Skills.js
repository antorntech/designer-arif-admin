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

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getSkills = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:8000/api/v1/skills", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSkills(data); // Update skills state with fetched data
          setLoading(false); // Set loading state to false after data is fetched
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  // Delete hero content item
  const handleDelete = (id) => {
    setLoading(true); // Set loading state to true
    fetch(`http://localhost:8000/api/v1/skills/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Skill Deleted Successfully", {
          autoClose: 1000,
        });
        getSkills(); // Fetch updated list after successful deletion
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
            <h1>Skill</h1>
            <p>
              Skills are {skills.length > 0 ? "available." : "not available."}
            </p>
          </div>
          <div>
            <Button type="primary" className="primary-btn">
              <Link to="/skills/add-skill">
                <PlusOutlined style={{ marginRight: "5px" }} />
                Add Skill
              </Link>
            </Button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : skills.length > 0 ? (
          <Table dataSource={skills} rowKey="_id">
            <Column
              title="Photo"
              dataIndex="skillphoto"
              key="skillphoto"
              width="100px"
              render={(skillphoto) => (
                <img
                  src={`http://localhost:8000${skillphoto}`}
                  style={{ width: "100px", height: "50px" }}
                />
              )}
            />
            <Column title="Title" dataIndex="title" key="title" />
            <Column
              title="Percentance"
              dataIndex="percentance"
              key="percentance"
            />
            <Column
              title="Action"
              key="action"
              width="100px"
              render={(_, record) => (
                <Space size="middle">
                  <Link to={`/skills/edit-skill/${record._id}`}>
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

export default Skills;
