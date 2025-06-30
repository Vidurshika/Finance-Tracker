import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from './CustomTooltip';
import Custom_Legend from './Custom_Legend';

const CustomerPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  const [showLabels, setShowLabels] = useState(true);

  // show labels only if screen is wider than 480px
  useEffect(() => {
    const checkScreenSize = () => {
      setShowLabels(window.innerWidth > 480); 
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie          // payload array for Rechart is built using below details automatically
            data={data} //name,amount array passed from Home
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            label={showLabels ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` : false}
            labelLine={false}
            cornerRadius={10}
          >
            {data.map((entry, index) => (
              <Cell //Each Cell represents a slice.
                key={`cell-${index}`} //a unique key, like cell-0, cell-1
                fill={colors[index % colors.length]} //index % colors.length ensures that if you have more slices than colors, it loops through the color array.
                style={{ filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.15))" }}
              />
              /*  loops through each item in the data array.
                  For each entry, it returns a <Cell /> element.creating one <Cell /> per data item */
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} /> {/* Shows details on hover */}
          <Legend content={<Custom_Legend />} /> {/* Describes color/slice mapping */}

          {showTextAnchor && ( //Places two lines of text in the middle of the chart
            <>
              <text x="50%" y="50%" dy={-25} textAnchor="middle" fill="#666" fontSize="14px">
                {label}
              </text>
              <text x="50%" y="50%" dy={8} textAnchor="middle" fill="#333" fontSize="24px" fontWeight="600">
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerPieChart;
