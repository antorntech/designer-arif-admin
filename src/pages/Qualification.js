import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/shared/loader/Loader";

const { confirm } = Modal;
const { Column } = Table;
const apiUrl = "https://api.designerarif.com/api/v1"; // Base API URL

const Qualification = () => {
  const [experiences, setExperiences] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch Experiences and Certifications
  const fetchData = async (endpoint, setter) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await fetch(`${apiUrl}/${endpoint}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setter(data.length > 0 ? data : []); // Update state or set empty array
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchData("experience", setExperiences),
      fetchData("certification", setCertifications),
    ]).finally(() => setLoading(false)); // Ensure loading stops
  }, []);

  // Delete Function with State Update
  const deleteData = async (id, endpoint, setter, data) => {
    confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: "This action is irreversible.",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        try {
          const res = await fetch(`${apiUrl}/${endpoint}/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });

          if (res.ok) {
            toast.success("Item deleted successfully", { autoClose: 1000 });

            // Update state by filtering out the deleted item
            setter(data.filter((item) => item._id !== id));
          } else {
            toast.error("Failed to delete item.");
          }
        } catch (error) {
          console.error(`Error deleting ${endpoint}:`, error);
        }
      },
      onCancel() {
        console.log("Delete operation cancelled.");
      },
    });
  };

  // Render Action Buttons for Table Rows
  const renderActions = (record, endpoint, data, setter) => (
    <Space size="middle">
      <Link to={`/qualification/edit-${endpoint}/${record._id}`}>
        <Button type="primary">
          <EditOutlined style={{ color: "#fff", fontSize: "16px" }} />
        </Button>
      </Link>
      <Button
        type="danger"
        onClick={() => deleteData(record._id, endpoint, setter, data)}
      >
        <DeleteOutlined style={{ color: "#fff", fontSize: "16px" }} />
      </Button>
    </Space>
  );

  // Render Tables
  const renderTable = (data, endpoint, title, setter) => (
    <div style={{ marginBottom: "5px" }}>
      <div className="table-header" style={styles.header}>
        <h1>{title} Table</h1>
        <p>
          {data.length > 0
            ? `${title}s are available.`
            : `No ${title}s available.`}
        </p>
        <Button type="primary" className="primary-btn">
          <Link to={`/qualification/add-${endpoint}`}>
            <PlusOutlined /> Add {title}
          </Link>
        </Button>
      </div>
      <Table dataSource={data} rowKey="_id">
        <Column title="Start Time" dataIndex="starttime" key="starttime" />
        <Column title="End Time" dataIndex="endtime" key="endtime" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Location" dataIndex="location" key="location" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => renderActions(record, endpoint, data, setter)}
        />
      </Table>
    </div>
  );

  if (loading) return <Loader />; // Show loader while data is loading

  return (
    <div style={{ marginTop: "30px", overflowX: "auto" }}>
      {experiences.length > 0 || certifications.length > 0 ? (
        <>
          {renderTable(experiences, "experience", "Experience", setExperiences)}
          {renderTable(
            certifications,
            "certification",
            "Certification",
            setCertifications
          )}
        </>
      ) : (
        <div style={styles.emptyState}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
            Experience & Certification Table
          </h1>
          <p style={{ fontSize: "16px", margin: "0" }}>
            No experiences or certifications are available.
          </p>
          <div style={styles.buttonGroup}>
            <Button type="primary" className="primary-btn">
              <Link to="/qualification/add-experience">
                <PlusOutlined /> Add Experience
              </Link>
            </Button>
            <Button type="primary" className="primary-btn">
              <Link to="/qualification/add-certification">
                <PlusOutlined /> Add Certification
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
};

export default Qualification;
