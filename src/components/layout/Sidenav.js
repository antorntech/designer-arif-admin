import { Button, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo-black.png";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const sidenavIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={1} // Ensure a unique key for React rendering
    >
      <path
        d="M4.5 10L8 13.5L15.5 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <div className="brand">
        <img
          src={logo}
          alt="logo"
          style={{
            height: "40px",
            margin: "25px 0",
          }}
        />
      </div>
      <hr
        style={{
          margin: "2px 0 18px 0",
          backgroundColor: "#d9d9d9",
        }}
      />
      <Menu theme="light" mode="inline">
        <Menu.Item key="dashboard">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="header">
          <NavLink to="/head-menu">
            <span
              className="icon"
              style={{
                background: page === "header" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">All Head Menu</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="hero">
          <NavLink to="/hero-content">
            <span
              className="icon"
              style={{
                background: page === "hero" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Hero Content</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="tasklist">
          <NavLink to="/task-list">
            <span
              className="icon"
              style={{
                background: page === "tasklist" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Task List</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="services">
          <NavLink to="/services">
            <span
              className="icon"
              style={{
                background: page === "services" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Services</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="qualification">
          <NavLink to="/qualification">
            <span
              className="icon"
              style={{
                background: page === "qualification" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Qualification</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div>
    </>
  );
}

export default Sidenav;
