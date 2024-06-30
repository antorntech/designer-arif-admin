import { Space, Table, Button, Modal } from "antd";
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

const LTDList = () => {
  // make & model list get from here
  const [count, setCount] = useState(false);
  const [ltds, setLTDs] = useState([]);
  const newUsers = [];
  [...ltds].reverse().map((ltd) => newUsers.push(ltd));
  const getUsers = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:8000/api/v1/ltd", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setLTDs([...data].reverse());
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

  let lastKey = parseInt(ltds[ltds.length - 1]?.key) + 1;

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
        fetch(`http://localhost:8000/api/v1/ltd/deleteLTD/${id}`, {
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
    fetch("http://localhost:8000/api/v1/ltd", {
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
  const [editingLTDs, seteditingLTDs] = useState(null);

  const editMakeModal = (record) => {
    setIsEditing(true);
    seteditingLTDs({ ...record });
    console.log(record._id);
  };

  return (
    <>
      {ltds && ltds.length > 0 ? (
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
              <h1>LTD Table</h1>
              <p>LTD's are available.</p>
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
                  <Link to="/add_ltd">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add LTD
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "30px", overflowX: "auto" }}>
            <Table dataSource={newUsers}>
              <Column title="LTD" dataIndex="ltd" key="ltd" />
              <Column title="Task No" dataIndex="taskNo" key="taskNo" />
              <Column
                title="Action"
                key="action"
                width="100px"
                render={(_, record) => (
                  <Space size="middle">
                    <Link to={`/edit_ltd/${record._id}`}>
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
              <h1>LTD Table</h1>
              <p>LTD's are available.</p>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <Button
                  type="primary"
                  // onClick={() => {
                  //   setOpen(true);
                  // }}
                >
                  <Link to="/add_ltd">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add LTD
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

export default LTDList;
