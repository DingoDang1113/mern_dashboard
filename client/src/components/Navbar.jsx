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
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';

const Navbar = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    
    return (
        <AppBar sx={{
            position: "static",
            background: "none",
            boxShadow: "none",
        }} >
        
        <Toolbar sx={{justifyContent: "space-between"}}>
            {/* Left Side */}
            <FlexBetween>
                <IconButton onClick={() => console.log('open/close sidebar')}>
                    <MenuIcon />
                </IconButton>
                <FlexBetween
                    backgroundColor={theme.palette.background.alt}
                    boarderRadius="9px"
                    gap="3rem"
                    p="0.1rem 1.5rem" /* padding, 0.1 top/bottom, 1.5 left/right */
                >
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search />
                    </IconButton>

                </FlexBetween>


            </FlexBetween>
            
        </Toolbar>

        </AppBar>
    )
}

export default Navbar