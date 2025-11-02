// src/components/shared/TotalsTable.js
import React from "react";

const TotalsTable = ({ totals }) => {
  if (!totals) return null;

  return (
    <table className="w-full text-sm border-t mt-4">
      <tbody>
        <tr>
          <td className="text-right pr-4">Subtotal:</td>
          <td className="text-right font-medium">£{totals.subtotal?.toFixed(2) || "0.00"}</td>
        </tr>
        {totals.tax !== undefined && (
          <tr>
            <td className="text-right pr-4">Tax:</td>
            <td className="text-right font-medium">£{totals.tax?.toFixed(2) || "0.00"}</td>
          </tr>
        )}
        <tr className="border-t font-bold">
          <td className="text-right pr-4">Total:</td>
          <td className="text-right">£{totals.total?.toFixed(2) || "0.00"}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TotalsTable;
