"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export function Chart({ data }: ChartProps) {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="var(--foreground)"
            strokeWidth={2}
            dot={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {payload[0].payload.name}
                        </span>
                        <span className="font-bold text-muted-foreground">${payload[0].value}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
