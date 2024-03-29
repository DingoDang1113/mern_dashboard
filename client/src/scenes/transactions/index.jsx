import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import { useGetTransactionsQuery } from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import  DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = ({ isDashboard }) => {
    const theme = useTheme();

    //values to be sent to the backend 
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize ] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState(""); // temp state of search

    const {data, isLoading } = useGetTransactionsQuery({
        page, 
        pageSize,
        sort: JSON.stringify(sort),
        search,
    }) // params send to the back

    // console.log(data);

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
    <Box m={ isDashboard ? "" : '1.5rem 2.5rem'}>
        { isDashboard ? "" : <Header title="TRANSACTIONS" subtitle={"A list of Transactions"} />}
        <Box height={"80vh"}
          sx={{
            "& .MuiDataGrid-root": {
                border: "none"
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none"
            }, 
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none"
            }, 
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: isDashboard ? theme.palette.background.alt : theme.palette.primary.light,
            }, 
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none"
            }, 
            "& .MuiDataGrid-toolbarContainer .MuiButton-text" : {
                color: `${theme.palette.secondary[200]} !important`
            }
          }}
        >
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={(data && data.transactions) || []}
              columns={columns}
             
              rowCount={(data && data.total) || 0}
              rowsPerPageOption={[20, 50, 100]} 
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode='server'
              sortingMode='server'
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}

              components={ isDashboard ? "" : { Toolbar: DataGridCustomToolbar}}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch}
              }}


            
            />

        </Box>


    </Box>
  )
}

export default Transactions;