import { useState } from "react";
import React from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import NavBar from "components/Navbar";
import SideBar from "components/Sidebar";

const Layout = () => {
  return <Box width="100%" height="100%">
    <Box>
      <NavBar />
      <Outlet />  //where dashboard will be located
    </Box>
  </Box>
};

export default Layout;