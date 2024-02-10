import React, {useMemo} from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { useGetSalesQuery } from 'state/api';


const OverviewChart = ({isDashboard = false, view}) => {
  const theme = useTheme();
  const {data, isLoading} = useGetSalesQuery();

  //recalculate the totals when data change useMemo 
  
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return []; 

    const { montlyData } = data;

    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

  }, [data])

  return (
    <div></div>
  )
}

export default OverviewChart