import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import fetchCryptoData from "./fetchCryptoData";

const BarChartComponent = ({data}) => {
  return (
    <div className="mb-4">
      <h2>Bar Chart</h2>
      <BarChart width={600} height={300} data={data}>
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
