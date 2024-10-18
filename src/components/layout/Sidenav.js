import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/s.png";
import { useEffect, useState } from "react";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const [loading, setLoading] = useState(false);
  const [mainLogo, setMainLogo] = useState("");

  const getSettings = async () => {
    setLoading(true); // Set loading state to true
    const token = JSON.parse(localStorage.getItem("token")); // Get token from local storage
    try {
      const response = await fetch(
        "https://api.designerarif.com/api/v1/settings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Set token in Authorization header
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMainLogo(data[0]); // Update settings state with fetched data
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

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
      <div
        className="brand"
        style={{
          backgroundColor: color,
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <img
          src={
            mainLogo ? `https://api.designerarif.com${mainLogo.logoPic}` : logo
          }
          alt="logo"
          style={{
            height: "50px",
          }}
        />
      </div>
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
        <Menu.Item key="about">
          <NavLink to="/about">
            <span
              className="icon"
              style={{
                background: page === "about" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">About Details</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="slider">
          <NavLink to="/slider">
            <span
              className="icon"
              style={{
                background: page === "slider" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Slider</span>
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
        <Menu.Item key="service-category">
          <NavLink to="/service-category">
            <span
              className="icon"
              style={{
                background: page === "service-category" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Service Category</span>
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
            <span className="label">All Services</span>
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
        <Menu.Item key="skills">
          <NavLink to="/skills">
            <span
              className="icon"
              style={{
                background: page === "skills" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Skills</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="reviews">
          <NavLink to="/reviews">
            <span
              className="icon"
              style={{
                background: page === "reviews" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Reviews</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="blogs">
          <NavLink to="/blogs">
            <span
              className="icon"
              style={{
                background: page === "blogs" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Blogs</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="freeresource">
          <NavLink to="/freeresource">
            <span
              className="icon"
              style={{
                background: page === "freeresource" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Free Resource</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="settings">
          <NavLink to="/settings">
            <span
              className="icon"
              style={{
                background: page === "settings" ? color : "",
              }}
            >
              {sidenavIcon}
            </span>
            <span className="label">Settings</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
