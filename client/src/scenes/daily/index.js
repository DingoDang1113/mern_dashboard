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
    
        const combinedData = Object.values(dailyData).reduce((acc, { date, totalSales, totalUnits }) => {
            const dateFormatted = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const formattedDate = `${dateFormatted.getMonth() + 1}/${dateFormatted.getDate()}/${dateFormatted.getFullYear()}`;
                // Check if the date already exists in the accumulator
                const existingEntry = acc.find(entry => entry.date === formattedDate);
                if (existingEntry) {
                    // If the date already exists, update the existing entry
                    existingEntry.totalSales += totalSales;
                    existingEntry.totalUnits += totalUnits;
                } else {
                    // If the date doesn't exist, add a new entry
                    acc.push({ date: formattedDate, totalSales, totalUnits });
                }
            }
            return acc;
        }, []);
    
        return combinedData;
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
                    <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" />
                        {/* Primary Y-axis for Total Sales */}
                        <YAxis yAxisId="0" orientation="left" stroke={theme.palette.primary[100]} />
                        {/* Secondary Y-axis for Total Units */}
                        <YAxis yAxisId="1" orientation="right" stroke={theme.palette.secondary[300]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                            type="monotone" 
                            dataKey="totalSales" 
                            stroke={theme.palette.primary[200]} 
                            name="Total Sales"
                            yAxisId="0" // Links this line to the primary Y-axis
                            dot={false}
                        />
                        <Line 
                            type="natural" 
                            dataKey="totalUnits" 
                            stroke={theme.palette.secondary[500]} 
                            name="Total Units"
                            yAxisId="1" // Links this line to the secondary Y-axis
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
                

                )}
            </Box>
        </Box>
    );
}

export default Daily;
