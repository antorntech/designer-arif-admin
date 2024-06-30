import React, { useState } from "react";
import signatureBg from "../../assets/images/signature.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./style.css";
import convertToText from "../hooks/convertToText";

const PaymentAdviceDetail = ({ data }) => {
  const [loader, setLoader] = useState(false);

  //   const capture = document.querySelector(".payment-wrapper");
  //   setLoader(true);

  //   // Set DPI (dots per inch) for higher resolution
  //   const dpi = 300; // You can adjust this value as needed

  //   html2canvas(capture, { scale: dpi / 96 }).then((canvas) => {
  //     // Scale canvas to match desired DPI
  //     const imgData = canvas.toDataURL("image/png");
  //     const doc = new jsPDF({
  //       orientation: "p",
  //       unit: "mm",
  //       format: "a4",
  //       compress: true, // Enable compression to reduce PDF file size
  //     });

  //     // Calculate component dimensions based on DPI
  //     const componentWidth = (canvas.width * 18.5) / dpi; // Convert pixels to millimeters
  //     const componentHeight = (canvas.height * 20) / dpi; // Convert pixels to millimeters

  //     doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
  //     setLoader(false);
  //     doc.save("receipt.pdf");
  //   });
  // };
  const downloadPDF = () => {
    const capture = document.querySelector(".payment-wrapper");
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
      const componentWidth = (canvas.width * 18.5) / dpi; // Convert pixels to millimeters
      const componentHeight = (canvas.height * 20) / dpi; // Convert pixels to millimeters

      // Calculate horizontal position to center content on the page
      const centerX = (doc.internal.pageSize.getWidth() - componentWidth) / 2;

      doc.addImage(
        imgData,
        "PNG",
        centerX,
        10,
        componentWidth,
        componentHeight
      );
      setLoader(false);
      doc.save(`Payment Advice-${data.GLCode}.pdf`);
    });
  };

  return (
    <div style={{ color: "#000" }}>
      <div className="payment-wrapper">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "10px",
          }}
        >
          <h2 style={{ fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>NRECA International</span>{" "}
            <br />{" "}
            <span style={{ fontSize: "12px" }}>
              Apt. B4, House CEN D-3 , Road 95, Gulshan 2, Dhaka-1212
            </span>
          </h2>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Payment Advice
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "self-start",
            color: "#000",
          }}
        >
          <div>
            <p>Check No.:</p>
            <p>Payment for the following:</p>
          </div>
          <div>
            <p>
              <strong>Date:</strong> {data.date}
            </p>
          </div>
        </div>
        <div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                {Object.keys(data)
                  .filter(
                    (key) =>
                      ![
                        "__v",
                        "_id",
                        "date",
                        "prepByName",
                        "recomByName",
                        "prepByDesig",
                        "recomByDesig",
                        "prepSignature",
                        "recomSignature",
                      ].includes(key)
                  )
                  .map((key) => (
                    <th
                      key={key} // Add a unique key for each element in the map function
                      style={{
                        color: "#000",
                        textTransform: "capitalize",
                        border: "2px solid black",
                        padding: "22px",
                        textAlign: "center",
                      }}
                    >
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.keys(data)
                  .filter(
                    (key) =>
                      ![
                        "__v",
                        "_id",
                        "date",
                        "prepByName",
                        "recomByName",
                        "prepByDesig",
                        "recomByDesig",
                        "prepSignature",
                        "recomSignature",
                      ].includes(key)
                  )
                  .map((key) => (
                    <td
                      key={key} // Add a unique key for each element in the map function
                      style={{
                        border: "2px solid black",
                        padding: "22px",
                        textAlign: "center",
                      }}
                    >
                      {data[key]}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p
            style={{
              marginTop: "20px",
              textTransform: "capitalize",
              color: "#000",
            }}
          >
            <strong>Amount in words:</strong> BDT{" "}
            {convertToText(data.netPayable)} only
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "50px",
          }}
        >
          <div style={{ color: "#000" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
              Prepared by:
            </h2>
            <img src={signatureBg} alt="" />
            <p style={{ margin: "0px" }}>{data.prepByName}</p>
            <p style={{ margin: "0px" }}>{data.prepByDesig}</p>
            <p style={{ margin: "0px" }}>Date: {data.date}</p>
          </div>
          <div style={{ color: "#000" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
              Recommended by:
            </h2>
            <img src={signatureBg} alt="" />
            <p style={{ margin: "0px" }}>{data.recomByName}</p>
            <p style={{ margin: "0px" }}>{data.recomByDesig}</p>
            <p style={{ margin: "0px" }}>Date: {data.date}</p>
          </div>
        </div>
      </div>
      <div style={{ margin: "30px 0" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
          className="receipt-modal-download-button"
          onClick={downloadPDF}
          disabled={!(loader === false)}
        >
          {loader ? <span>Downloading...</span> : <span>Download</span>}
        </button>
      </div>
    </div>
  );
};

export default PaymentAdviceDetail;
