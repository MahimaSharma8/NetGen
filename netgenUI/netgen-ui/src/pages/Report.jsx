import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Report = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:8000/dashboard/records")
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error("Failed to fetch records:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Network Records</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-xl overflow-hidden shadow-lg">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-800 text-left">
              {records.length > 0 &&
                Object.keys(records[0]).map((key) => (
                  <th key={key} className="px-6 py-3 text-sm font-semibold">
                    {key.replace("_", " ").toUpperCase()}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {records.map((row, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                } hover:bg-gray-600 transition-colors`}
              >
                {Object.values(row).map((val, i) => (
                  <td key={i} className="px-6 py-3">
                    {Array.isArray(val)
                      ? val.join(", ")
                      : typeof val === "number"
                      ? val.toFixed(2)
                      : val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;