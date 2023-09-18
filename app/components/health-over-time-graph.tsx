import React from "react";
import { greenHexCode, projectStatusOverTime, redHexCode, yellowHexCode } from "../constants";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";

export const HealthOverTimeGraph = () => {
  const healthOverTime = projectStatusOverTime;
    console.debug(healthOverTime, 'hotz')
  return (
    <>
      <h1>Project Health Over Time</h1>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={healthOverTime}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Green" stroke={greenHexCode} />
          <Line type="monotone" dataKey="Yellow" stroke={yellowHexCode} />
          <Line type="monotone" dataKey="Red" stroke={redHexCode} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
