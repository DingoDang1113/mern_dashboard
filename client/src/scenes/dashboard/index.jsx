import React from 'react';
import { useGetDashboardQuery } from 'state/api';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from '@mui/icons-material';
import { Box, Button, Typography, useTheme, useMediaQuery  } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import BreakdownChart from 'components/BreakdownChart';
import OverviewChart from 'components/OverviewChart';



const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const{ data, isLoading } = useGetDashboardQuery();

  // console.log(data)

  const columns = [
      {
          field: "_id", 
          headerName: "ID",
          flex: 1,
      },
      {
          field: "userId", 
          headerName: "User ID",
          flex: 1,
      },       
      {
          field: "createdAt", 
          headerName: "CreatedAt",
          flex: 1,
      },
      {
          field: "products",
          headerName: "# of Products",
          flex: 0.5,
          sortable: false,
          renderCell: (params) => params.value.length
      }, 
      {
          field: "cost",
          headerName: "Cost",
          flex: 1,
          renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      }
  ];


  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx = {{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14PX",
              fontWeight: "bold",
              padding: "10px 20px"
            }}
          >
            <DownloadOutlined  sx={ {mr: "10px" }}/>
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" }
        }}
      >
        {/* Row 1 */}




      </Box>



    </Box>
  )
}

export default Dashboard;