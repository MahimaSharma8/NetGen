import React, { useEffect, useState } from "react";
import UtilizationPie from "../components/UtilizationPie";
import EnergySavedBar from "../components/EnergySavedBar";
import PacketLossLine from "../components/PacketLossLine";

const Dashboard = () => {
  const [energy, setEnergy] = useState([]);
  const [loss, setLoss] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:8000/dashboard/energy-saved")
      .then((res) => res.json())
      .then((data) => setEnergy(data));

    fetch("http://localhost:8000/dashboard/loss")
      .then((res) => res.json())
      .then((data) => setLoss(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-950 min-h-screen">

      <UtilizationPie />

      <EnergySavedBar data={energy} />
      <PacketLossLine data={loss} />
    </div>
  );
};

export default Dashboard;