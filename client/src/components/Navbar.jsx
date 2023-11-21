import React from 'react';
import { 
    LightModeOutlined,
    DarkModeOutlined, 
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from '@mui/icons-material';
import FlexBetween from "./FlexBetween";
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import picsImage from "assets/pics.jpg";
import { AppBar, useTheme } from '@mui/material';

const Navbar = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    
    return (
        <AppBar sx={{
            position: "static",
            background: "none",
            boxShadow: "none",
        }} >
            
        </AppBar>
    )
}

export default Navbar