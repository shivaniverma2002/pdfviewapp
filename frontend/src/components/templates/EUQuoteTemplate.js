import React from "react";

const EUQuoteTemplate = ({ data }) => (
  <div
    className=" text-[13px] text-gray-800 leading-snug  rounded-md"
    style={{
      width: "180mm",
      minHeight: "260mm",
      padding: "15mm 20mm",
      backgroundColor: "white",
      margin: "auto",
      fontFamily: "'Arial', sans-serif",
    }}
  >
    {/* ===== Header Section ===== */}
    <div className="flex justify-between border-b pb-3 mb-4">
      {/* Left side - Company Info with Logo */}
      <div className="flex flex-col">
        <img
          src={data.companyInfo?.logo || "/logo.png"}
          alt="Company Logo"
          style={{ width: "130px", marginBottom: "10px" }}
        />
        <h1 className="text-lg font-bold">{data.companyInfo?.name || "Ralakde Ltd"}</h1>
        <p>{data.companyInfo?.address || "Company Address"}</p>
        <p>VAT: {data.companyInfo?.vat || "N/A"}</p>
        <p>{data.companyInfo?.phone || "+44 123 456 789"}</p>
        <p>{data.companyInfo?.email || "info@ralakde.com"}</p>
        <p>{data.companyInfo?.website || "www.ralakde.com"}</p>
      </div>

      {/* Right side - Quote Info */}
      <div className="text-right">
        <h2 className="text-2xl font-bold text-green-700 border-b-2 border-green-600 pb-1 mb-1 inline-block">
          QUOTE
        </h2>
        <p>Quote#: {data.quoteNumber || "N/A"}</p>
        <p>Quote Date: {data.quoteDate || "N/A"}</p>
        <p>Expiry Date: {data.expiryDate || "N/A"}</p>
        <p>Reference#: {data.reference || "N/A"}</p>
        <p>Sales Person: {data.salesPerson || "N/A"}</p>
      </div>
    </div>

    {/* ===== Bill To Section ===== */}
    <div className="mb-4">
      <h3 className="font-semibold underline mb-1">Bill To</h3>
      <p className="font-medium">{data.billTo?.companyName || "Client Company"}</p>
      <p>{data.billTo?.address || "Client Address"}</p>
    </div>

    {/* ===== Items Table ===== */}
    <table
      className="w-full border border-collapse text-sm mb-6"
      style={{ borderColor: "#d1d5db" }}
    >
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="border px-3 py-1">#</th>
          <th className="border px-3 py-1 w-[35%]">Item & Description</th>
          <th className="border px-3 py-1 text-right">Qty</th>
          <th className="border px-3 py-1 text-right">Rate (£)</th>
          <th className="border px-3 py-1 text-right">Amount (£)</th>
        </tr>
      </thead>
      <tbody>
        {data.items?.length > 0 ? (
          data.items.map((item, i) => (
            <tr key={i} className="even:bg-gray-50">
              <td className="border px-3 py-1 text-center">{i + 1}</td>
              <td className="border px-3 py-1">
                <div className="font-semibold">{item.description || "Item"}</div>
                <div className="text-gray-500 text-xs">{item.details || ""}</div>
              </td>
              <td className="border px-3 py-1 text-right">{item.quantity || 0}</td>
              <td className="border px-3 py-1 text-right">
                £{item?.rate ? item.rate.toFixed(2) : "0.00"}
              </td>
              <td className="border px-3 py-1 text-right">
                £{item?.amount ? item.amount.toFixed(2) : "0.00"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center text-gray-400 py-4">
              No items available
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {/* ===== Totals Section ===== */}
    <div className="flex justify-end text-sm mt-3">
      <div className="text-right w-1/3">
        <p>Subtotal: £{data?.subtotal ? data.subtotal.toFixed(2) : "0.00"}</p>
        <p>Discount: £{data?.discount ? data.discount.toFixed(2) : "0.00"}</p>
        <p className="font-bold text-lg text-green-700 border-t pt-1">
          Total: £{data?.total ? data.total.toFixed(2) : "0.00"}
        </p>
      </div>
    </div>

    {/* ===== Notes & Terms ===== */}
    <div className="mt-6 text-sm leading-relaxed">
      <h3 className="font-semibold mb-1 text-gray-700">Notes</h3>
      <p className="border border-gray-300 rounded p-2 bg-gray-50">
        {data.notes || "Thank you for your business!"}
      </p>

      <h3 className="font-semibold mt-4 mb-1 text-gray-700">Terms & Conditions</h3>
      <p className="border border-gray-300 rounded p-2 bg-gray-50">
        {data.terms ||
          "Payment is due within 30 days of the invoice date. Late payments may incur fees."}
      </p>
    </div>

    {/* ===== Footer Branding ===== */}
    <div className="text-center text-xs text-gray-500 mt-8 border-t pt-2">
      <p>Generated via Ralakde Ltd — EU Quote Template</p>
    </div>
  </div>
);

export default EUQuoteTemplate;
