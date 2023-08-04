import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import fetchCryptoData from "./fetchCryptoData"; 

const LineChartComponent = ({data}) => {
  const [showPercentageChange, setShowPercentageChange] = useState(false);

  const toggleData = () => {
    setShowPercentageChange(!showPercentageChange);
  };

  const dataToShow = showPercentageChange
    ? data.map((dataPoint) => ({
        ...dataPoint,
        price: ((dataPoint.price - data[0].price) / data[0].price) * 100,
      }))
    : data;

  return (
    <div className="mb-4">
      <h2>Line Chart</h2>
      <button onClick={toggleData}>
        {showPercentageChange ? "Show Actual Price" : "Show Percentage Change"}
      </button>
      <LineChart width={600} height={300} data={dataToShow}>
        <XAxis dataKey="date" />
        <YAxis dataKey={showPercentageChange ? "price" : "price"} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
