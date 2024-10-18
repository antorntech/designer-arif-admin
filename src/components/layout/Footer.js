import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;
  const date = new Date().getFullYear();
  return (
    <AntFooter>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © {date}, made with
            {<HeartFilled />} by
            <a
              href="https://antors.netlify.app"
              className="font-weight-bold"
              target="_blank"
            >
              AM ANTOR
            </a>
            for a better web and all rights reserved by Designer Arif Hossain
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
