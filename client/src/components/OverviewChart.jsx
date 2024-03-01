import React, { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTheme } from '@mui/material';
import { useGetSalesQuery } from 'state/api';

const OverviewChart = ({ view, isDashboard }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  // useMemo to calculate running total chart data
  const chartData = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    let runningTotalSales = 0;
    let runningTotalUnits = 0;
    let monthAbb = "";
    
    return Object.values(monthlyData).map(({ month, totalSales, totalUnits }) => {
      runningTotalSales += totalSales;
      runningTotalUnits += totalUnits;
      monthAbb = month.slice(0,3);

      return {
        monthAbb,
        runningTotalSales,
        runningTotalUnits,
      };
    });
  }, [data]);

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveContainer width="100%" height={ isDashboard ? "100%" : 400}>
      <LineChart
        data={chartData}
        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="monthAbb" />
        <YAxis tickFormatter={(value) => `${(value  / 1000).toFixed(1)}K`} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={view === 'sales' ? 'runningTotalSales' : 'runningTotalUnits'}
          stroke={view === 'sales' ? theme.palette.secondary[700] : theme.palette.secondary[600]}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OverviewChart;
