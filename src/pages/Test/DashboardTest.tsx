import LayoutBar from "../../components/Navigation/LayoutNavigation";
import React, { useCallback, useState, PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 600 },
];

const COLORS = ["#FFA523", "#00B4B0", "#9f49a3", "#00B4B0","#FF3169" ];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



export default function DashboardTest() {
  return (
    <LayoutBar opcionSeleccionada="dashboard">
      <div className="w-full h-full flex flex-col mt-[15px] gap-6">
        <div className="w-full h-full flex flex-row gap-32 justify-center">
          <div className="flex flex-col w-[min(675px,35%)] h-[300px]  shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] rounded-md">
            <div className="flex items-center justify-center w-full h-[40px] bg-azul rounded-t-md">
              <p className="text-white font-semibold text-2xl">Producto</p>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <PieChart width={250} height={250} className="flex items-center justify-center">
                <Pie
                  data={data}
                  cx={120}
                  cy={120}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={3}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className="flex flex-col w-[min(675px,35%)] h-[300px]  shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] rounded-md">
            <div className="flex items-center justify-center w-full h-[40px] bg-azul rounded-t-md">
              <p className="text-white font-semibold text-2xl">Incidencia</p>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <PieChart width={250} height={250} className="flex items-center justify-center">
                <Pie
                  data={data}
                  cx={120}
                  cy={120}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={3}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>

          </div>
        </div>
        
        <div className="w-full h-full flex flex-row gap-32 justify-center">
          <div className="flex flex-col w-[min(675px,35%)] h-[300px]  shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] rounded-md">
            <div className="flex items-center justify-center w-full h-[55px] lg:h-[35px] bg-azul rounded-t-md">
              <p className="text-white font-semibold text-xl">
                Analítica Producto
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[min(675px,35%)] h-[300px]  shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] rounded-md">
            <div className="flex items-center justify-center w-full h-[55px] lg:h-[35px] bg-azul rounded-t-md">
              <p className="text-white font-semibold text-xl">
                Analítica Incidencia
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutBar>
  );
}
