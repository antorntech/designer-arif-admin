import { Space, Table, Button, Modal, Form, Input } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeFilled,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/shared/loader/Loader";

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

const { confirm } = Modal;
const { Column, ColumnGroup } = Table;

const GlCodeList = () => {
  // make & model list get from here
  const [count, setCount] = useState(false);
  const [glCodes, setGlCodes] = useState([]);
  const newGlCodes = [];
  [...glCodes].reverse().map((glcode) => newGlCodes.push(glcode));
  const getUsers = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:8000/api/v1/glcode", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setGlCodes([...data].reverse());
          } else {
            // Perform some action or set a message indicating that there is no data to reverse
            console.log("No data found to reverse!");
          }
          setCount(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [count]);

  let lastKey = parseInt(glCodes[glCodes.length - 1]?.key) + 1;

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
        fetch(`http://localhost:8000/api/v1/glcode/deleteGLCode/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("Credits Deleted Successfully", {
              autoClose: 1000,
            });
            getUsers();
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log(values.file.file.name);
    let newValues = { ...values, key: lastKey ? lastKey : 1 };
    fetch("http://localhost:8000/api/v1/glcode", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newValues),
    })
      .then((res) => res.json())
      .then((json) => {
        toast.success("Successfully Product Create!", {
          autoClose: 1000,
        });
        console.log(json);
        getUsers();
        setOpen(false);
      });
  };

  // edit make & model
  const [isEditing, setIsEditing] = useState(false);
  const [editingGlCode, seteditingGlCode] = useState(null);

  const editMakeModal = (record) => {
    setIsEditing(true);
    seteditingGlCode({ ...record });
    console.log(record._id);
  };

  return (
    <>
      {glCodes && glCodes.length > 0 ? (
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
              <h1>GlCode Table</h1>
              <p>GlCode's are available.</p>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <Button
                  type="primary"
                  className="primary-btn"
                  // onClick={() => {
                  //   setOpen(true);
                  // }}
                >
                  <Link to="/add_glcode">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add GlCode
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "30px", overflowX: "auto" }}>
            <Table dataSource={newGlCodes}>
              <Column
                title="Account Id"
                dataIndex="accountId"
                key="accountId"
              />
              <Column
                title="Account Desc."
                dataIndex="accountDesc"
                key="accountDesc"
              />
              <Column
                title="Action"
                key="action"
                width="100px"
                render={(_, record) => (
                  <Space size="middle">
                    <Link to={`/edit_glcode/${record._id}`}>
                      <Button type="primary">
                        <EditOutlined />
                      </Button>
                    </Link>
                    <Link to={`/profile/${record._id}`}>
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "orange",
                          border: "1px solid orange",
                        }}
                      >
                        <EyeFilled />
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
              marginBottom: "30px",
            }}
          >
            <div>
              <h1>GlCode Table</h1>
              <p>GlCode's are available.</p>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <Button
                  type="primary"
                  className="primary-btn"
                  // onClick={() => {
                  //   setOpen(true);
                  // }}
                >
                  <Link to="/add_glcode">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add GlCode
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

export default GlCodeList;
