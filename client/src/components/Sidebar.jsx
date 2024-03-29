import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PointofSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    PublicOutlined
} from "@mui/icons-material";

import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate} from "react-router-dom";
import FlexBetween from './FlexBetween';
import pics from "assets/pics.jpg";

const navItems = [
    {
        text: "Dashboard", 
        icon: <HomeOutlined />    
    }, 
    {
        text: "Client Facing", 
        icon: null    
    }, 
    {
        text: "Products", 
        icon: <ShoppingCartOutlined />    
    }, 
    {
        text: "Customers", 
        icon: <Groups2Outlined />    
    },
    {
        text: "Transactions", 
        icon: <ReceiptLongOutlined />    
    },  
    {
        text: "Geography", 
        icon: <PublicOutlined />    
    },  
    {
        text: "Sales", 
        icon: null   
    },      
    {
        text: "Overview", 
        icon: <PointOfSaleOutlinedIcon />    
    },  
    {
        text: "Daily", 
        icon: <TodayOutlined />    
    },  
    {
        text: "Monthly", 
        icon: <CalendarMonthOutlined />    
    },  
    {
        text: "Breakdown", 
        icon: <PieChartOutlined />    
    },  
    {
        text: "Management", 
        icon: null  
    },  
    {
        text: "Admin", 
        icon: <AdminPanelSettingsOutlined />    
    },  
    {
        text: "Performance", 
        icon: <TrendingUpOutlined />    
    },  
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme(); 

  useEffect(() => {
    setActive(pathname.substring(1));
    }, [pathname])


  return <Box component= "nav" >
    {isSidebarOpen && (
        <Drawer 
            open = {isSidebarOpen}
            onClose = {() => setIsSidebarOpen(false)}
            variant='persistent'
            anchor='left'
            sx={{
                width: drawerWidth,
                height: "100vh",
                "& .MuiDrawer-paper" : {
                    color: theme.palette.secondary[200],
                    backgroundColor: theme.palette.background.alt,
                    boxSizing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth,
                    height: "100vh",
                    overflowY: "auto"
                }, 
                
            }}
        >
            <Box width="100%" display="flex" flexDirection="column" sx={{ postion: "relative"}}>
                <Box m= "1.5rem 2rem 0.5rem 3rem">
                    <FlexBetween color={theme.palette.secondary.main}>
                        <Box display="flex" alignItems="center" gap="0.5rem" >
                            <Typography variant='h4' fontWeight="bold" >
                                PORTAL
                            </Typography>
                        </Box>
                        {/* If on mobile screen, a button to close side bar */}
                        {!isNonMobile && (
                            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <ChevronLeft />
                            </IconButton>
                        )}
                    </FlexBetween>
                </Box>
                {/* List of NavItems */}
                <List sx={{ flex: 1, overflowY: "auto" }}>
                    {navItems.map(({text, icon}) => {
                        if (!icon) {
                            return (
                                <Typography key={text} sx={{m: "2.25rem 0 0.5rem 3rem"}}>
                                    {text}
                                </Typography>
                            )
                        }
                        const lcText = text.toLowerCase();

                        return (
                            <ListItem key={text} disablePadding >
                                <ListItemButton
                                    onClick={() => {
                                        navigate(`/${lcText}`);
                                        setActive(lcText);
                                    }} 
                                    sx = {{
                                        backgroundColor: 
                                            active === lcText 
                                              ? theme.palette.secondary[300]
                                              : "transparent",
                                        color: 
                                          active === lcText 
                                             ? theme.palette.primary[600]
                                             : theme.palette.secondary[100],
                                    }}
                                    >
                                    <ListItemIcon
                                        sx={{
                                            ml: "2rem",
                                            color: 
                                                active === lcText
                                                 ? theme.palette.primary[600]
                                                 : theme.palette.secondary[200],

                                        }}
                                    >
                                    {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                    {active === lcText && (
                                        <ChevronRightOutlined sx={{ ml: "auto"}} />
                                    )}


                                </ListItemButton>
                            </ListItem>
                        )
                    })}

                </List>

            </Box>
            <Box className="profileImage" sx={{ 
                position:"sticky", 
                bottom: 0,
                zIndex: 1,
                backgroundColor: theme.palette.alt,
                mt: "auto",
                py: "1rem",
                borderTop: `1px solid ${theme.palette.secondary[200]}`,
                }}>

                <Divider />
                <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                    <Box 
                     component='img'
                     alt='profile'
                     src={pics}
                     height='40px'
                     width='40px'
                     borderRadius="50%"
                     sx={{ objectFit: "cover"}} 
                    />
                        <Box textAlign="left">
                            <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100]}}
                            >
                                {user.name}
                            </Typography>
                            <Typography  fontSize="0.8rem" sx={{ color: theme.palette.secondary[200]}}
                            >
                                {user.occupation}
                            </Typography>
                        </Box>
                        <SettingsOutlined 
                          sx= {{ color: theme.palette.secondary[300], fontSize: "25px"}}
                        />
                </FlexBetween>

            </Box>
        </Drawer>
    )}


  </Box>
  
}

export default Sidebar;