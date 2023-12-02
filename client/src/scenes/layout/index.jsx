import { useState } from "react";
import React from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import NavBar from "components/Navbar";
import SideBar from "components/Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <SideBar 
      isNonMobile = {isNonMobile}
      drawerWidth = "250px"
      isSidebarOpen = {isSidebarOpen}
      setIsSidebarOpen = {setIsSidebarOpen}
    />
    <Box>
      <NavBar />
      <Outlet />  //where dashboard will be located
    </Box>
  </Box>
};

export default Layout;