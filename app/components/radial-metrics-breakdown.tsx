"use client";
import {
  Cell,
  Label,
  LabelList,
  Legend,
  Pie,
  PieChart,
  Tooltip,
} from "recharts";
import {
  IProjectStatusUpdate,
  ISubMetricsLiteral,
} from "../interfaces/project-status-update.interface";
import {
  colorToHexCodeMap,
  grayTextHexCode,
  greenHexCode,
  metricKeyToDisplayNameMap,
  redHexCode,
  testProjectUpdatesArray,
  yellowHexCode,
  yellowHexCodeText,
} from "../constants";
import { useReducer } from "react";
import { IMetricStatusLiteral } from "../interfaces/metric-status.interface";
import { Box } from "@mantine/core";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: any) => {
  const {
    cx,
    cy,
    width,
    height,
    name,
    value,
    innerRadius,
    outerRadius,
    midAngle,
  } = props;
  // const radius = 10;
  if (props.payload?.value === 0) {
    return "";
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};

export default function RadialMetricsTable() {
  const projectStatuses: IProjectStatusUpdate[] = testProjectUpdatesArray;

  // const displayData: any[] = []
  const initialData: { [key in IMetricStatusLiteral]: number } = {
    Green: 0,
    Yellow: 0,
    Red: 0,
  };
  const initialSubMetricsData: {
    [key in ISubMetricsLiteral]: { [key in IMetricStatusLiteral]: number };
  } = {
    escalationMetricStatus: { ...initialData },
    modernizationMetricStatus: { ...initialData },
    staffingMetricStatus: { ...initialData },
    agileMetricStatus: { ...initialData },
  };

  const statusBreakdown = projectStatuses.reduce((prev, current) => {
    prev[current.overallStatus]++;
    return prev;
  }, initialData);

  const displayData = Object.entries(statusBreakdown).map((entry) => {
    return {
      name: entry[0],
      value: entry[1],
    };
  });

  const subMetricsstatusBreakdown = projectStatuses.reduce((prev, current) => {
    prev["agileMetricStatus"][current.agileMetricStatus]++;
    prev["escalationMetricStatus"][current.agileMetricStatus]++;
    prev["modernizationMetricStatus"][current.agileMetricStatus]++;
    prev["staffingMetricStatus"][current.staffingMetricStatus]++;
    return prev;
  }, initialSubMetricsData);

  const subMetricsstatusBreakdownDisplayData: {
    [key in keyof typeof initialSubMetricsData]: typeof displayData;
  } = {
    escalationMetricStatus: Object.entries(
      subMetricsstatusBreakdown.escalationMetricStatus
    ).map((entry) => {
      return {
        name: entry[0],
        value: entry[1],
      };
    }),
    modernizationMetricStatus: Object.entries(
      subMetricsstatusBreakdown.escalationMetricStatus
    ).map((entry) => {
      return {
        name: entry[0],
        value: entry[1],
      };
    }),

    staffingMetricStatus: Object.entries(
      subMetricsstatusBreakdown.staffingMetricStatus
    ).map((entry) => {
      return {
        name: entry[0],
        value: entry[1],
      };
    }),
    agileMetricStatus: Object.entries(
      subMetricsstatusBreakdown.agileMetricStatus
    ).map((entry) => {
      return {
        name: entry[0],
        value: entry[1],
      };
    }),
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ fontSize: "3rem" }}>
        <div>
          <span style={{ color: greenHexCode }}>{initialData.Green}</span>{" "}
          <span style={{ color: greenHexCode, fontSize: "1.8rem" }}>Green</span>
        </div>
        {initialData.Yellow > 0 && (
          <div>
            <span style={{ color: yellowHexCodeText }}>
              {initialData.Yellow}
            </span>{" "}
            <span style={{ color: yellowHexCodeText, fontSize: "1.8rem" }}>
              Yellow
            </span>
          </div>
        )}
        {initialData.Red > 0 && (
          <div>
            <span style={{ color: redHexCode }}>{initialData.Red}</span>{" "}
            <span style={{ color: redHexCode, fontSize: "1.8rem" }}>
              Off track
            </span>
          </div>
        )}
      </Box>
      <PieChart style={{ marginInline: "20px" }} width={350} height={350}>
        <Tooltip />
        <Pie
          data={displayData}
          dataKey="value"
          cx="125"
          cy="125"
          innerRadius={70}
          outerRadius={110}
          startAngle={45}
          endAngle={405}
          legendType="circle"
        >
          <LabelList content={renderCustomizedLabel} position={"outside"} />
          {displayData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                colorToHexCodeMap[(entry.name as IMetricStatusLiteral) ?? "Yellow"]
              }
            />
          ))}
        </Pie>
        <text
          x={125}
          y={125}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={36}
          fill={grayTextHexCode}
        >
          {projectStatuses.length} Total
        </text>
        {Object.keys(subMetricsstatusBreakdown).map((key, i) => {
          // Calculate angle for this index
          const angle = (i / 4) * 145 * (Math.PI / 180); // Radians

          // Get x & y for this angle
          const x = 125 + Math.cos(angle) * 175;
          const y = 125 + Math.sin(angle) * 175;

          return (
            <>
              <Pie
                cx={x}
                cy={y}
                data={
                  subMetricsstatusBreakdownDisplayData[
                    key as keyof typeof subMetricsstatusBreakdown
                  ]
                }
                dataKey="value"
                innerRadius={30}
                outerRadius={45}
              >
                {subMetricsstatusBreakdownDisplayData[
                  key as keyof typeof subMetricsstatusBreakdown
                ].map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      colorToHexCodeMap[
                        (entry.name as IMetricStatusLiteral) ?? "Yellow"
                      ]
                    }
                  />
                ))}
              </Pie>
              <text
                x={x + 4}
                y={y + 4}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={16}
                fill={grayTextHexCode}
              >
                {
                  metricKeyToDisplayNameMap[
                    key as keyof typeof subMetricsstatusBreakdown
                  ]
                }
              </text>
            </>
          );
        })}
      </PieChart>
    </Box>
  );
}
