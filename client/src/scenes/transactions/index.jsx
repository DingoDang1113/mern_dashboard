import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import { useGetTransactionsQuery } from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';

const Transactions = () => {
    const theme = useTheme();

    //values to be sent to the backend 
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize ] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState({});
    




  return (
    <Box>
        <Header title="TRANSACTIONS" subtitle={"A list of Transactions"} />


    </Box>
  )
}

export default Transactions;