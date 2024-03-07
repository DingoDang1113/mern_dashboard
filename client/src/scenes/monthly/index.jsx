import React, { useMemo } from 'react';
import Header from 'components/Header';
import { Box } from '@mui/material';
import { useGetSalesQuery } from 'state/api';
import { useTheme } from '@emotion/react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

const Monthly = () => {
    const { data } = useGetSalesQuery ();
    // console.log(data)
    const theme = useTheme();

    const formattedData = useMemo(() => {
        if (!data) return [];
    
        const { monthlyData } = data;
    
        const chartData = Object.values(monthlyData).map(({ month, totalSales, totalUnits }) => ({
            month,
            totalSales,
            totalUnits,
        }));

        return chartData;
    }, [data]);

 


  return (
    <Box m="1.5rem 2.5rem">
        <Header title={"MONTHLY SALES"} subtitle={"Chart of monthly sales"} />
        <Box height="75vh" style={{ width: '100%' }}>
        {data ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            >
              <XAxis dataKey="month" />
              {/* Primary Y-axis for Total Sales */}
              <YAxis yAxisId="0" orientation="left" stroke={theme.palette.primary[100]} label={{value: "Total Sales", angle: -90, position: 'insideLeft'}}/>
              {/* Secondary Y-axis for Total Units */}
              <YAxis yAxisId="1" orientation="right" stroke={theme.palette.secondary[300]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke={theme.palette.primary[100]}
                name="Total Sales"
                yAxisId="0"
                dot={false}

              />
              <Line
                type="monotone"
                dataKey="totalUnits"
                stroke={theme.palette.secondary[300]}
                name="Total Units"
                yAxisId={"1"}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <>Loading...</>
        )}
      </Box>

    </Box>
  )
}

export default Monthly;