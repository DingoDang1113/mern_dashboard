import React from 'react'
import { Box,  Typography, useTheme} from "@mui/material";
import { useGetSalesQuery } from 'state/api';


const BreakdownChart = ({ isDashboard = false }) => {
    const {data, isLoading } = useGetSalesQuery();
    const theme = useTheme(); 
    if (!data || isLoading) return "Loading...";

    const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[300],
        theme.palette.secondary[500],
    ];

    const formattedDta = Object.entries(data.salesByCategory).map(
        ([category,sales], i) => ({
            id: category,
            label: category,
            value: sales,
            color: colors[i],
        })
    );


  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={ isDashboard ? "325px" : undefined}
      
    >


    </Box>
  )
}

export default BreakdownChart;