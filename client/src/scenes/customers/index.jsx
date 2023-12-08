import React from 'react';
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';


const Customers = () => {
    const theme = useTheme(); 
    const { data, isLoading} = useGetCustomersQuery();
    // console.log("customers", data)

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.8, 
        }, 
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        }, 
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        }, 
        {
            field: "phoneNumber",
            headerName: "Phone",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
            }
        }, 
        {
            field: "country",
            headerName: "Country",
            flex: 0.4,
        }, 
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1,
        }, 
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        }, 
 
    ];

  return <Box m="1.5rem 2.rem">
    <Header title="CUSTOMERS" subtitle="A list of Customers" />
    <Box mt="40px" height="75vh"
    
    
    >
        <DataGrid
            loading = {isLoading || !data}
            getRowId={(row) => row._id}
            rows={data || []}
            columns = {columns}
            
        />
    </Box>


  </Box>
}

export default Customers;