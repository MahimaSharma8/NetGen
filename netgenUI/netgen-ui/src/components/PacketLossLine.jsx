import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid,Label,Tooltip } from "recharts";
import LoadingSpinner from "./LoadingSpinner";

const PacketLossLine = ({ data }) => {
  if (!data || data.length === 0) return <LoadingSpinner />;

  const normalizedData = data.slice(0, 15).map((d) => ({
    ...d,
    packet_loss: Number(Number(d.packet_loss).toFixed(2)) || 0,
  }));

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg col-span-2">
      <h2 className="text-xl font-bold mb-4">Packet Loss</h2>
      <LineChart width={800} height={300} data={normalizedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="cell_id" stroke="#ccc">
          <Label value="Cell ID" offset={-5} position="insideBottom" fill="#ccc" />
        </XAxis>

        <YAxis stroke="#ccc" domain={[0, "dataMax + 5"]}>
          <Label value="Packet Loss (%)" angle={-90} position="insideLeft" fill="#ccc" />
        </YAxis>
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "#fff" }}
          labelStyle={{ color: "#9ca3af" }}
          formatter={(value) => [`${value}%`, "Packet Loss"]}
        />
        <Line type="monotone" dataKey="packet_loss" stroke="#2B3CA2" strokeWidth={2} dot />
      </LineChart>
    </div>
  );
};

export default PacketLossLine;