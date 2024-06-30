import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleProfile.css";
import Loader from "../shared/loader/Loader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CloudDownloadOutlined } from "@ant-design/icons";

const SingleProfile = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [singleUser, setSingleUser] = useState({});
  console.log(singleUser);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleUser(data.data);
      });
  }, [id]);

  const downloadPDF = () => {
    const capture = document.querySelector(".profile_wraper");
    setLoader(true);

    // Set DPI (dots per inch) for higher resolution
    const dpi = 300; // You can adjust this value as needed

    html2canvas(capture, { scale: dpi / 96 }).then((canvas) => {
      // Scale canvas to match desired DPI
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        compress: true, // Enable compression to reduce PDF file size
      });

      // Calculate component dimensions based on DPI
      const componentWidth = (canvas.width * 20) / dpi; // Convert pixels to millimeters
      const componentHeight = (canvas.height * 20) / dpi; // Convert pixels to millimeters

      // Calculate position to center content on the page
      const centerX = (doc.internal.pageSize.getWidth() - componentWidth) / 8;
      const centerY = (doc.internal.pageSize.getHeight() - componentHeight) / 8;

      // Add image to PDF at calculated position
      doc.addImage(
        imgData,
        "PNG",
        centerX,
        centerY,
        componentWidth,
        componentHeight
      );
      setLoader(false);
      doc.save("receipt.pdf");
    });
  };

  return (
    <>
      {singleUser && singleUser !== null ? (
        <div className="profile_main">
          <div className="profile_wraper">
            <div>
              <img
                className="avatar"
                src={`http://localhost:8000/${singleUser.userPhoto}`}
                alt="avatar.jpg"
              />
            </div>
            <div className="profile_content">
              <h2>
                <span className="status_title">Name:</span>{" "}
                {singleUser.firstName} {singleUser.lastName}
              </h2>
              <h2>
                <span className="status_title">Email:</span>{" "}
                {singleUser.officeEmail}
              </h2>
              <h2>
                <span className="status_title">Account Type:</span>{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {singleUser.designation}
                </span>
              </h2>
            </div>
          </div>
          <button
            className="receipt-modal-download-button"
            onClick={downloadPDF}
            disabled={!(loader === false)}
          >
            {loader ? (
              <span>Downloading</span>
            ) : (
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                PDF <CloudDownloadOutlined />
              </span>
            )}
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SingleProfile;
