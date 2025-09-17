import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "./LoadingSpinner";

const EnergySavedBar = ({ data }) => {
  if (!data || data.length === 0) return <LoadingSpinner />;

  return (
    <div className="bg-[#0a1a2f] text-white p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Energy Saved per Tower</h2>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.slice(0, 10)}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
            <XAxis dataKey="cell_id" stroke="#a3bffa" />
            <YAxis stroke="#a3bffa" />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                backgroundColor: "#0f2747",
                border: "1px solid #1e3a5f",
              }}
              labelStyle={{ color: "#93c5fd" }}
            />
            <Bar
              dataKey="energy_saved"
              fill="#1d4ed8" // navy blue bars
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnergySavedBar;