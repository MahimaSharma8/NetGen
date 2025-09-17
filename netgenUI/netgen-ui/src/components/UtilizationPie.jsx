import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#1E9AE1", "#2B3CA2", "#020574"];

export default function UtilizationPie() {
  const [lowThreshold, setLowThreshold] = useState(30);
  const [highThreshold, setHighThreshold] = useState(75);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/dashboard/utilization?low_threshold=${lowThreshold}&high_threshold=${highThreshold}`
      );
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lowThreshold, highThreshold]);

  const chartData = data
    ? [
      { name: "Low", value: data.low_utilization },
      { name: "Medium", value: data.medium_utilization },
      { name: "High", value: data.high_utilization },
    ]
    : [];

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Utilization Stats</h2>

      <div className="flex gap-4 mb-4">
        <label>
          Low threshold:
          <input
            type="number"
            value={lowThreshold}
            onChange={(e) => setLowThreshold(Number(e.target.value))}
            className="ml-2 p-1 w-20 text-white rounded-md hover:bg-blue-950 text-center"
          />
        </label>

        <label>
          High threshold:
          <input
            type="number"
            value={highThreshold}
            onChange={(e) => setHighThreshold(Number(e.target.value))}
            className="ml-2 p-1 w-20 text-white rounded-md hover:bg-blue-950 text-center"
          />
        </label>
      </div>
      <div
        style={{
          width: "100%",
          height: 300,
          backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
    `,
          backgroundSize: "20px 20px",
        }}
      >
        {data ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                labelLine
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>Loading utilization data...</p>
        )}
      </div>

    </div >
  );
}