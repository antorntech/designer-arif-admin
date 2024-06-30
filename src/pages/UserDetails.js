import {
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
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

const UserDetails = () => {
  // make & model list get from here
  const [count, setCount] = useState(false);
  const [users, setUsers] = useState([]);
  const newUsers = [];
  [...users].reverse().map((user) => newUsers.push(user));
  const getUsers = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      fetch("http://localhost:8000/api/v1/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setUsers([...data].reverse());
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

  let lastKey = parseInt(users[users.length - 1]?.key) + 1;

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
        fetch(`http://localhost:8000/api/v1/user/${id}`, {
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
    fetch("http://localhost:8000/api/v1/employee", {
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
  const [editingUsers, setEditingUsers] = useState(null);

  const editMakeModal = (record) => {
    setIsEditing(true);
    setEditingUsers({ ...record });
    console.log(record._id);
  };

  // upload file
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      {users && users.length > 0 ? (
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
              <h1>Employee Table</h1>
              <p>Employees are available.</p>
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
                  <Link to="/add_employee">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Employee
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "30px", overflowX: "auto" }}>
            <Table dataSource={newUsers}>
              <Column
                title="Image"
                dataIndex="image"
                key="image"
                render={(_, record) => (
                  <img
                    src={`http://localhost:8000${record.userPhoto}`}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              />
              <Column title="Office ID" dataIndex="officeId" key="officeId" />
              <Column
                title="First Name"
                dataIndex="firstName"
                key="firstName"
              />
              <Column title="Last Name" dataIndex="lastName" key="lastName" />
              <Column
                title="Designation"
                dataIndex="designation"
                key="designation"
              />
              <Column
                title="Office Email"
                dataIndex="officeEmail"
                key="officeEmail"
              />
              <Column
                title="Action"
                key="action"
                width="100px"
                render={(_, record) => (
                  <Space size="middle">
                    <Link to={`/edit_employee/${record._id}`}>
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
            <Modal
              title="Edit Price List"
              okText="Save"
              visible={isEditing}
              onCancel={() => {
                setIsEditing(false);
              }}
              onOk={() => {
                const formData = new FormData();

                fileList.forEach((file) => {
                  formData.append("userImg", file);
                });

                formData.append("name", editingUsers.name);

                fetch(`http://localhost:8000/api/v1/user/${editingUsers._id}`, {
                  method: "PUT",
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((json) => {
                    toast.success("Credits Update Successfully", {
                      autoClose: 1000,
                    });
                    setIsEditing(false);
                    getUsers();
                  });
              }}
            >
              <Form
                layout="vertical"
                initialValues={{
                  modifier: "public",
                }}
              >
                <Form.Item label="Name">
                  <Input
                    value={editingUsers?.name}
                    onChange={(e) => {
                      setEditingUsers((pre) => {
                        return { ...pre, name: e.target.value };
                      });
                    }}
                  />
                </Form.Item>
              </Form>
            </Modal>
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
              <h1>Employee Table</h1>
              <p>Employee not available.</p>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <Button type="primary" className="primary-btn">
                  <Link to="/add_employee">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    Add Employee
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

export default UserDetails;
