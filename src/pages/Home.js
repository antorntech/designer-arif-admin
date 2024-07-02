import { Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
function Home() {
  const [headMenus, setHeadMenus] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [freeResource, setFreeResource] = useState([]);
  const { Title } = Typography;

  const token = JSON.parse(localStorage.getItem("token"));

  // Get all head menus
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/headmenu", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setHeadMenus(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  // Get all task list
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/tasklist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setTaskList(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  // Get all services
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/services", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setServices(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  // Get all skills
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/skills", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setSkills(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  // Get all reviews
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/reviews", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setReviews(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  // Get all blogs
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/blogs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  // Get all blogs
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/freeresource", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setFreeResource(data);
        } else {
          // Perform some action or set a message indicating that there is no data to reverse
          console.log("No data found to reverse!");
        }
      });
  }, [token]);

  const count = [
    {
      title: "Total Header Menu",
      count: `${headMenus && headMenus.length > 0 ? headMenus.length : 0}`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb2",
    },

    {
      title: "Total Task List",
      count: `${taskList && taskList.length > 0 ? taskList.length : 0}`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb",
    },

    {
      title: "Total Services",
      count: `${services && services.length > 0 ? services.length : 0}`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb",
    },

    {
      title: "Total Skills",
      count: `${skills && skills.length > 0 ? skills.length : 0}`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb",
    },

    {
      title: "Total Reviews",
      count: `${reviews && reviews.length > 0 ? reviews.length : 0}`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb",
    },

    {
      title: "Total Blogs",
      count: `${blogs && blogs.length > 0 ? blogs.length : 0}`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb",
    },

    {
      title: "Total Free Resource",
      count: `${
        freeResource && freeResource.length > 0 ? freeResource.length : 0
      }`,
      icon: <i class="fa-solid fa-list-check icon"></i>,
      bnb: "bnb",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span style={{ fontSize: "22px" }}>{c.title}</span>
                      <Title
                        style={{
                          fontWeight: "bold",
                          fontSize: "55px",
                          margin: "0",
                        }}
                      >
                        {c.count}
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Home;
