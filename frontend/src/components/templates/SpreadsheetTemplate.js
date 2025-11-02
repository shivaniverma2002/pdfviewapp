import React from "react";

const SpreadsheetTemplate = ({ data }) => {
  const safeNumber = (num) =>
    typeof num === "number" && !isNaN(num) ? num.toFixed(2) : "0.00";

  return (
    <div
      className="bg-white text-gray-800 mx-auto"
      style={{
        width: "190mm",
        minHeight: "297mm",
        padding: "15mm 18mm",
        border: "1px solid #d1d5db",
        fontSize: "11px",
        lineHeight: "1.4",
      }}
    >
      {/* ===== HEADER ===== */}
      <div className="border border-gray-400 p-3 mb-4">
        <div className="flex justify-between">
          {/* Company Info */}
          <div>
            <img src="/logo.png" alt="Company Logo" className="h-20 mb-2" />
            <h1 className="font-bold text-base mb-1">{data.companyInfo?.name}</h1>
            <p>{data.companyInfo?.address}</p>
            <p>{data.companyInfo?.country}</p>
            <p>VAT: {data.companyInfo?.vat}</p>
            <p>{data.companyInfo?.phone}</p>
            <p>{data.companyInfo?.email}</p>
            <p>{data.companyInfo?.website}</p>
          </div>

          {/* Quote label */}
          <div className="text-right">
            <h2 className="text-2xl font-bold tracking-wide">QUOTE</h2>
          </div>
        </div>

        {/* Quote Details */}
        <div className="grid grid-cols-3 border-t border-gray-400 mt-3 pt-2 text-sm">
          <div>
            <p>
              <span className="font-semibold">Quote#:</span> {data.quoteNumber}
            </p>
            <p>
              <span className="font-semibold">Quote Date:</span> {data.quoteDate}
            </p>
            <p>
              <span className="font-semibold">Expiry Date:</span> {data.expiryDate}
            </p>
            <p>
              <span className="font-semibold">Reference#:</span> {data.reference}
            </p>
          </div>
          <div></div>
          <div className="text-right">
            <p>
              <span className="font-semibold">Sales Person:</span>{" "}
              {data.salesPerson}
            </p>
          </div>
        </div>
      </div>

      {/* ===== BILL TO ===== */}
      <div className="mb-4 border-b border-gray-400 pb-2">
        <h3 className="font-semibold mb-1">Bill To</h3>
        <p>{data.billTo?.companyName}</p>
        <p>{data.billTo?.address}</p>
        <p>{data.billTo?.city}</p>
        <p>{data.billTo?.country}</p>
      </div>

      {/* ===== ITEMS TABLE ===== */}
      <table className="w-full border border-gray-400 border-collapse mb-4 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-400 px-2 py-1 w-[4%] text-center">#</th>
            <th className="border border-gray-400 px-2 py-1 text-left w-[35%]">
              Item & Description
            </th>
            <th className="border border-gray-400 px-2 py-1 text-center">Qty</th>
            <th className="border border-gray-400 px-2 py-1 text-center">Rate</th>
            <th className="border border-gray-400 px-2 py-1 text-center">Taxable Amount</th>
            <th className="border border-gray-400 px-2 py-1 text-center">VAT %</th>
            <th className="border border-gray-400 px-2 py-1 text-center">VAT</th>
            <th className="border border-gray-400 px-2 py-1 text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          {data.items?.map((item, i) => (
            <tr key={i}>
              <td className="border px-2 py-1 text-center">{i + 1}</td>
              <td className="border px-2 py-1">
                <div className="font-semibold">{item.description}</div>
                <div className="text-xs text-gray-500">{item.details}</div>
              </td>
              <td className="border px-2 py-1 text-center">{item.quantity}</td>
              <td className="border px-2 py-1 text-right">£{safeNumber(item.rate)}</td>
              <td className="border px-2 py-1 text-right">
                £{safeNumber(item.taxableAmount)}
              </td>
              <td className="border px-2 py-1 text-center">
                {item.vatPercent}%
              </td>
              <td className="border px-2 py-1 text-right">
                £{safeNumber(item.vatAmount)}
              </td>
              <td className="border px-2 py-1 text-right font-semibold">
                £{safeNumber(item.total)}
              </td>
            </tr>
          ))}

          {/* Subtotal Row */}
          <tr>
            <td colSpan="7" className="text-right font-semibold px-2 py-1 border">
              Sub Total
            </td>
            <td className="border px-2 py-1 text-right font-semibold">
              £{safeNumber(data.subtotal)}
            </td>
          </tr>
          <tr>
            <td colSpan="7" className="text-right px-2 py-1 border">
              VAT
            </td>
            <td className="border px-2 py-1 text-right">£{safeNumber(data.vatTotal)}</td>
          </tr>
          <tr className="bg-gray-100 font-bold">
            <td colSpan="7" className="text-right px-2 py-1 border">
              Total
            </td>
            <td className="border px-2 py-1 text-right">£{safeNumber(data.grandTotal)}</td>
          </tr>
        </tbody>
      </table>

      {/* ===== NOTES ===== */}
      <div className="mb-3">
        <h3 className="font-semibold mb-1">Notes</h3>
        <p>
          {data.notes ||
            "Thanks in advance for your business. Valid for 30 days from the date of the quote unless otherwise stated."}
        </p>
      </div>

      {/* ===== TERMS ===== */}
      <div>
        <h3 className="font-semibold mb-1">Terms & Conditions</h3>
        <p className="text-justify">
          {data.terms ||
            "The buyer is responsible for taxes, freight, and customs duties when applicable. All deliveries are based on standard ground shipments. Rush delivery may be available upon request. Errors and omissions excluded."}
        </p>
        <p className="mt-1 text-sm">
          Ralakde Ltd’s terms and conditions apply. Visit{" "}
          <a
            href="https://findcontrols.com/pages/terms-conditions"
            className="text-blue-600 underline"
          >
            https://findcontrols.com/pages/terms-conditions
          </a>
        </p>
      </div>
    </div>
  );
};

export default SpreadsheetTemplate;
