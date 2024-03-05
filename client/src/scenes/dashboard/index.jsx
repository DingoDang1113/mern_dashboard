import React from 'react';
import { useGetDashboardQuery } from 'state/api';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic, Landscape } from '@mui/icons-material';
import { Box, Button, Typography, useTheme, useMediaQuery  } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import BreakdownChart from 'components/BreakdownChart';
import OverviewChart from 'components/OverviewChart';
import StatBox from 'components/StatBox';
import Transactions from 'scenes/transactions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const{ data, isLoading } = useGetDashboardQuery();

  const downloadPDF = () => {
    const input = document.getElementById("pdf");
    html2canvas(input, { scale: 2} )
       .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: "portait",
          unit: 'px',
          format: [canvas.width, canvas.height]
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("dashboard.pdf");
       })
       .catch((err) => {
        console.error("Error generating PDF", err);
       });
  };



  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box id="pdf">
          <Button
            onClick={downloadPDF}
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
        <StatBox
          title="Total Customers"
          value={new Intl.NumberFormat('en-US').format(data?.totalCustomers ?? 0)}
          increase="+14%"
          description="Since last month"
          icon = {
            <Email sx={{ color: theme.palette.secondary[300], fontSize: "20px" }} />
          }
        />

        <StatBox
          title="Sales Today"
          value={new Intl.NumberFormat('en-US').format(data?.todayStats.totalSales ?? 0)}
          increase="+21%"
          description="Since yesterday"
          icon = {
            <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "20px" }} />
          }
        />
        <Box
          gridColumn = "span 8"
          gridRow  = "span 2"
          backgroundColor = {theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          display="flex"
          style={{ width: "100%", height: "100%" }}
          // overflow="hidden"
        >
          <OverviewChart view="sales" isDashboard={true} style={{ width: "100%", height: "100%" }} />

        </Box>

        <StatBox
          title="Monthly Sales"
          value={new Intl.NumberFormat('en-US').format(data?.thisMonthStats.totalSales ?? 0)}
          increase="+5%"
          description="Since last month"
          icon = {
            <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "20px" }} />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={new Intl.NumberFormat('en-US').format(data?.yearlySalesTotal ?? 0)}
          increase="+43%"
          description="Since last year"
          icon = {
            <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "20px" }} />
          }
        />


      {/* Row 2 */}

      <Box
       gridColumn="span 7"
       gridRow = "span 3"
       overflow="hidden"
      >
        <Transactions isDashboard={true} />

      </Box>

      <Box
        gridColumn="span 5"
        gridRow="span 3"
        backgroundColor= {theme.palette.background.alt}
        p="1.5rem"
        borderRadius="0.55rem"
      >
        <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
          Sales By Category
        </Typography>

        <BreakdownChart isDashboard={true} />
        <Typography 
          p="0, 0.6rem"
          fontSize="0.8rem"
          sx = {{ color: theme.palette.secondary[200]}}
         >
          Breakdown of real states and information via category for revenue made for this year and total sales.


        </Typography>


      </Box>





      </Box>





    </Box>
  )
}

export default Dashboard;