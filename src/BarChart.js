import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import cryptoData from "./cryptoData";

const BarChartComponent = () => {
  return (
    <div className="mb-4">
      <h2>Bar Chart</h2>
      <BarChart width={600} height={300} data={cryptoData}>
        <XAxis dataKey="date" />
        <YAxis dataKey="price" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
