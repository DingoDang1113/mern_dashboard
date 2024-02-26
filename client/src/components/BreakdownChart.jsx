import React from 'react'
import { Box,  Typography, useTheme} from "@mui/material";
import { useGetSalesQuery } from 'state/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";


const BreakdownChart = ({ isDashboard = false }) => {
    const {data, isLoading } = useGetSalesQuery();
    const theme = useTheme(); 
    if (!data || isLoading) return "Loading...";

    const COLORS = [
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[300],
        theme.palette.secondary[500],
    ];

    const formattedData = Object.entries(data.salesByCategory).map(
        ([category,sales], i) => ({
            name: category,
            value: sales,
        })
    );


  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={ isDashboard ? "325px" : undefined}
      position={"relative"}
    >
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={isDashboard ? "60%" : "80%"}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard ? "translate(-50%, -50%)" : "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6">Total: ${data.yearlySalesTotal}</Typography>
      </Box>




    </Box>
  )
}

export default BreakdownChart;