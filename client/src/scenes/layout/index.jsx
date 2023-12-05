import { useState } from "react";
import React from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import NavBar from "components/Navbar";
import SideBar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  // console.log('id', userId);
  // console.log('data', data);


  return <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <SideBar 
      user= {data || {} }
      isNonMobile = {isNonMobile}
      drawerWidth = "250px"
      isSidebarOpen = {isSidebarOpen}
      setIsSidebarOpen = {setIsSidebarOpen}
    />
    <Box>
      <NavBar 
      user= {data || {} }
      isSidebarOpen = {isSidebarOpen}
      setIsSidebarOpen = {setIsSidebarOpen} 
    />
      <Outlet />  //where dashboard will be located
    </Box>
  </Box>
};

export default Layout;