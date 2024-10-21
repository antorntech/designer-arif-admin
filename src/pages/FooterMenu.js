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

const FooterMenu = () => {
  const [footerMenus, setFooterMenus] = useState([]);
  const getFooterMenus = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("https://api.designerarif.com/api/v1/footermenu", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setFooterMenus(data);
          } else {
            // Perform some action or set a message indicating that there is no data to reverse
            console.log("No data found to reverse!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFooterMenus();
  }, []);

  // delete model is open
  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content:
        "After click on delete then your item will be delete permanently.",
      okText: "Delete",
      okType: "danger",

      onOk() {
        fetch(`https://api.designerarif.com/api/v1/footermenu/delete/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("Footer Menu Deleted Successfully", {
              autoClose: 1000,
            });
            getFooterMenus();
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      {footerMenus && footerMenus.length > 0 ? (
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
              <h1>Footer Menu Table</h1>
              <p>Footer Menu's are available.</p>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <Button type="primary" className="primary-btn">
                  <Link to="/footer-menu/add-footer-menu">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Footer Menu
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "30px", overflowX: "auto" }}>
            <Table dataSource={footerMenus}>
              <Column title="Label" dataIndex="label" key="label" />
              <Column title="Path" dataIndex="path" key="path" />
              <Column
                title="Action"
                key="action"
                width="100px"
                render={(_, record) => (
                  <Space size="middle">
                    <Link to={`/footer-menu/edit-footer-menu/${record._id}`}>
                      <Button type="primary">
                        <EditOutlined />
                      </Button>
                    </Link>
                    <Button
                      type="danger"
                      onClick={() => showConfirm(record._id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </div>
        </div>
      ) : (
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
              <h1>Footer Menu Table</h1>
              <p>Footer Menu's are available.</p>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <Button type="primary" className="primary-btn">
                  <Link to="/footer-menu/add-footer-menu">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Menu
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default FooterMenu;
