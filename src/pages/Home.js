import { Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";
function Home() {
  const [headMenus, setHeadMenus] = useState([]);
  const { Title } = Typography;

  const token = JSON.parse(localStorage.getItem("token"));

  // Get all users
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

  const count = [
    {
      today: "Total Head Menu",
      title: `${headMenus && headMenus.length > 0 ? headMenus.length : 0}`,
      icon: <i class="fa-brands fa-elementor icon"></i>,
      bnb: "bnb2",
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
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>{c.title}</Title>
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

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
