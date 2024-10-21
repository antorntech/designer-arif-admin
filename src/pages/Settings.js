import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Card, Row, Col } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import Loader from "../components/shared/loader/Loader";

const { confirm } = Modal;

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading

  const getSettings = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "https://api.designerarif.com/api/v1/settings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await fetch(`https://api.designerarif.com/api/v1/settings/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Setting Deleted Successfully", { autoClose: 1000 });
      getSettings(); // Refresh settings list
    } catch (error) {
      console.error("Error deleting setting:", error);
    } finally {
      setLoading(false);
    }
  };

  const showConfirm = (id) => {
    confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: "Once deleted, this item cannot be restored.",
      okText: "Delete",
      okType: "danger",
      onOk() {
        handleDelete(id);
      },
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <div>
          <h1>Settings</h1>
          <p>
            Settings are {settings.length > 0 ? "available." : "not available."}
          </p>
        </div>
        {settings.length > 0 ? null : (
          <Button type="primary" className="primary-btn">
            <Link to="/settings/add-setting">
              <PlusOutlined style={{ marginRight: 5 }} /> Add Setting
            </Link>
          </Button>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {settings.length > 0 ? (
            settings.map((setting) => (
              <Col xs={24} sm={12} md={8} lg={6} key={setting._id}>
                <Card
                  style={{ padding: 20 }}
                  cover={
                    <img
                      src={`https://api.designerarif.com${setting.logoPic}`}
                      alt="Setting Logo"
                      style={{ height: 150, objectFit: "cover", padding: 10 }}
                    />
                  }
                  actions={[
                    <Link to={`/settings/edit-setting/${setting._id}`}>
                      <Button type="primary" icon={<EditOutlined />} block>
                        Edit
                      </Button>
                    </Link>,
                    <Button
                      type="danger"
                      icon={<DeleteOutlined />}
                      onClick={() => showConfirm(setting._id)}
                      block
                    >
                      Delete
                    </Button>,
                  ]}
                ></Card>
              </Col>
            ))
          ) : (
            <p>No settings available.</p>
          )}
        </Row>
      )}
    </div>
  );
};

export default Settings;
