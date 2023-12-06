import React, { useState } from 'react'; 
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery, FormControl, InputLabel, MenuItem, Select, Menu} from "@mui/material";
import { useGetProductsQuery } from 'state/api';
import Header from "components/Header"; 

const Product = ({
    _id, 
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat

}) => {
    const theme = useTheme(); 
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            sx={{
                backgroundImage: "none", 
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem"
            }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14}} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>

                <Typography variant='h5' component="div">
                    {name}
                </Typography>

                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>

                <Rating value={rating} readOnly />

                <Typography variant='body2'>{description}</Typography>
            </CardContent>

            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More 
                </Button>
            </CardActions>

            <Collapse
              in={isExpanded}
              timeout="auto"
              unmountOnExit
              sx={{
                color: theme.palette.neutral[300]
              }}
            >
                <CardContent>
                    <Typography>id: {_id} </Typography>
                    <Typography>Supply Left: {supply} </Typography>
                    <Typography>Yearly Sales This Year: {stat[0].yearlySalesTotal} </Typography>
                    <Typography>Yearly Unit Solid This Year: {stat[0].yearlyTotalSoldUnits}</Typography>
                </CardContent>
            </Collapse>


        </Card>
    )
}

const Products = () => {
    const { data, isLoading } = useGetProductsQuery(); 
    const isNonMobile = useMediaQuery("(min-width: 1000px)");

    const [sortCriteria, setSortCriteria] = useState('rating'); 

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const sortData = (data, criteria) => {
        switch (criteria) {
            case 'alphabet': 
                return [...data].sort((a, b) => a.name.localeCompare(b.name)); 
            case 'rating': 
                return [...data].sort((a, b) => b.rating - a.rating);
            case 'price low': 
                return [...data].sort((a, b) => a.price - b.price);
            case 'price high': 
                return [...data].sort((a, b) => b.price - a.price);
            case 'yearlyUnitSold': 
                return [...data].sort((a, b) => b.stat[0].yearlyTotalSoldUnits - a.stat[0].yearlyTotalSoldUnits);
            default: 
                return data;
        }
    }


    const sortedData = data ? sortData(data, sortCriteria) : [];
    
    // console.log("data", data);

  return (
    <Box m="1.5rem 2.5rem" >
        <Box display={"flex"} justifyContent="space-between" alignItems="center" >

            <Header title="Products" subtitle="See your list of products"  />

            <FormControl variant='outlined' sx={{ m: 1, minWidth: 100}}>
                <InputLabel>Sort By</InputLabel>
                <Select
                value={sortCriteria}
                onChange={handleSortChange}
                label="Sort By"
                >
                    <MenuItem value="alphabet">Alphabet</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="price low">Price(low to high)</MenuItem>
                    <MenuItem value="price high">Price(high to low)</MenuItem>
                    <MenuItem value="yearlyUnitSold">Popularity</MenuItem>

                </Select>

            </FormControl>
        </Box>




        {sortedData.length > 0 ||  !isLoading ? (
            <Box 
                mt={"20px"} 
                display={"grid"} 
                gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
                justifyContent="space-between"
                rowGap="20px"
                columnGap="1.33%"
                sx={{
                    "& > div" : { gridColumn: isNonMobile ? undefined : "span 4"}
                }}
                >
                    {sortedData.map(
                      ({
                        _id, 
                        name,
                        description,
                        price,
                        rating,
                        category,
                        supply,
                        stat
                    }) => (
                        <Product 
                        key={_id}
                        _id ={_id}
                        name={name}
                        description = {description}
                        price = {price}
                        rating = {rating}
                        category = {category}
                        supply={supply}
                        stat={stat}
                        />
                    )

                    )}

                </Box>
        ) : (
            <>Loading...</>
        )}
    </Box>
  )
}

export default Products;