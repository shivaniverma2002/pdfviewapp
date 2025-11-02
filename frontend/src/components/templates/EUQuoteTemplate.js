import React from "react";

const EUQuoteTemplate = ({ data }) => {
  if (!data) return null;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "#fff",
        color: "#000",
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        padding: "20mm 20mm",
        lineHeight: "1.4",
      }}
    >
      {/* ===== Header ===== */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Left Company Info */}
        <div style={{ width: "60%" }}>
          {data.companyInfo?.logo && (
            <img
              src={data.companyInfo.logo}
              alt="logo"
              style={{ width: "150px", marginBottom: "10px" }}
            />
          )}
          <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "2px" }}>
            {data.companyInfo?.name}
          </div>
          <div>{data.companyInfo?.address}</div>
          <div>{data.companyInfo?.email}</div>
          <div>{data.companyInfo?.website}</div>
        </div>

        {/* Right Quote Info */}
        <div style={{ textAlign: "right", width: "40%" }}>
          <div
            style={{
              fontSize: "26px",
              color: "#003366",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            Quote
          </div>
          <div style={{ fontWeight: "bold", marginBottom: "15px" }}>
            Quote# {data.quoteNumber}
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "2px 5px" }}>Quote Date :</td>
                <td style={{ textAlign: "right" }}>{data.quoteDate}</td>
              </tr>
              <tr>
                <td style={{ padding: "2px 5px" }}>Expiry Date :</td>
                <td style={{ textAlign: "right" }}>{data.expiryDate}</td>
              </tr>
              <tr>
                <td style={{ padding: "2px 5px" }}>Reference# :</td>
                <td style={{ textAlign: "right" }}>{data.reference}</td>
              </tr>
              <tr>
                <td style={{ padding: "2px 5px" }}>Sales person :</td>
                <td style={{ textAlign: "right" }}>{data.salesPerson}</td>
              </tr>
              <tr>
                <td style={{ padding: "2px 5px" }}>VAT No. :</td>
                <td style={{ textAlign: "right" }}>{data.vatNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Bill To ===== */}
      <div style={{ marginTop: "25px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "55%" }}>
          <div style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "3px" }}>
            Bill To
          </div>
          <div style={{ fontWeight: "bold" }}>{data.billTo?.companyName}</div>
          <div>{data.billTo?.address}</div>
          <div>{data.billTo?.country}</div>

          <div style={{ marginTop: "10px" }}>
            <div>Subject : {data.subject}</div>
            <div>Description</div>
          </div>
        </div>
      </div>

      {/* ===== Items Table ===== */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          fontSize: "12px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#003366", color: "#fff" }}>
            <th style={{ padding: "6px", textAlign: "left", width: "5%" }}>#</th>
            <th style={{ padding: "6px", textAlign: "left", width: "50%" }}>
              Item & Description
            </th>
            <th style={{ padding: "6px", textAlign: "right", width: "10%" }}>Qty</th>
            <th style={{ padding: "6px", textAlign: "right", width: "15%" }}>Rate</th>
            <th style={{ padding: "6px", textAlign: "right", width: "20%" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items && data.items.length > 0 ? (
            data.items.map((item, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", verticalAlign: "top" }}>
                <td style={{ padding: "6px", textAlign: "center" }}>{i + 1}</td>
                <td style={{ padding: "6px" }}>
                  <div style={{ fontWeight: "bold" }}>{item.description}</div>
                  {item.details && (
                    <div style={{ fontSize: "11px", color: "#555" }}>{item.details}</div>
                  )}
                </td>
                <td style={{ padding: "6px", textAlign: "right" }}>{item.quantity}</td>
                <td style={{ padding: "6px", textAlign: "right" }}>{item.rate}</td>
                <td style={{ padding: "6px", textAlign: "right" }}>{item.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "10px", color: "#888" }}>
                No items available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ===== Totals ===== */}
      <div style={{ width: "35%", marginLeft: "auto", marginTop: "15px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "5px" }}>Sub Total</td>
              <td style={{ padding: "5px", textAlign: "right" }}>{data.total - data.discount}</td>
            </tr>
            <tr>
              <td style={{ padding: "5px" }}>Discount</td>
              <td style={{ padding: "5px", textAlign: "right" }}>{data.discount}</td>
            </tr>
            <tr
              style={{
                fontWeight: "bold",
                backgroundColor: "#f0f0f0",
                fontSize: "14px",
              }}
            >
              <td style={{ padding: "6px" }}>Total</td>
              <td style={{ padding: "6px", textAlign: "right" }}>£{data.total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== Notes & Terms ===== */}
      <div style={{ marginTop: "40px", pageBreakBefore: "always" }}>
        {data.notes && (
          <>
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Notes</div>
            <div style={{ whiteSpace: "pre-line", marginBottom: "20px" }}>{data.notes}</div>
          </>
        )}
        {data.terms && (
          <>
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Terms & Conditions</div>
            <div style={{ whiteSpace: "pre-line" }}>{data.terms}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default EUQuoteTemplate;
