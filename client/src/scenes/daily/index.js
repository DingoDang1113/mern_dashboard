import React, { useMemo, useState } from 'react';
import { Box, useTheme } from "@mui/material";
import Header from 'components/Header';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetSalesQuery } from 'state/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker

const Daily = () => {
    const [startDate, setStartDate] = useState(new Date("2021-02-01"));
    const [endDate, setEndDate] = useState(new Date("2021-03-01"));
    const { data, isLoading, error } = useGetSalesQuery(); // Assuming useGetSalesQuery returns { data, isLoading, error }
    const theme = useTheme();

    const formattedData = useMemo(() => {
        if (!data) return [];

        const { dailyData } = data;

        const salesData = [];
        const unitsData = [];

        Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
            const dateFormatted = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const formattedDate = `${dateFormatted.getMonth() + 1}/${dateFormatted.getDate()}`;
                salesData.push({ date: formattedDate, totalSales });
                unitsData.push({ date: formattedDate, totalUnits });
            }
        });

        return [
            { name: 'Total Sales', data: salesData, dataKey: 'totalSales' },
            { name: 'Total Units', data: unitsData, dataKey: 'totalUnits' }
        ];
    }, [data, startDate, endDate]);

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="DAILY SALES" subtitle="Chart of daily sales" />
            <Box height="75vh">
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MM/dd/yyyy"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="MM/dd/yyyy"
                    />
                </Box>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error fetching data</div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {formattedData.map((line, index) => (
                                <Line 
                                    key={index} 
                                    type="monotone" 
                                    dataKey={line.dataKey} 
                                    data={line.data} 
                                    name={line.name} 
                                    stroke={theme.palette.secondary.main} 
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </Box>
        </Box>
    );
}

export default Daily;
