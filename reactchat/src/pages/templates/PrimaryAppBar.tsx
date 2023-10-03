import Box from "@mui/material/Box";
import {AppBar, Drawer, IconButton, Link, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from "react";
import ExploreCategories from "../../components/SecondaryDraw/ExploreCategories.tsx";
import AccountButton from "../../components/PrimaryAppBar/AccountButton.tsx";



// type Props = {
//     children: ReactNode;
// }
const PrimaryAppBar =()=>{
    const [sideMenu, setSideMenu] = useState(false)
    const toggleDraw = (openButton: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
        if (event.type ==="keydown" &&(
            (event as React.KeyboardEvent).key ==="Tab" ||
            (event as React.KeyboardEvent).key === "Shift"
        )) {
            return;
        }

        setSideMenu(openButton);

        };


    const list = () =>(
        <Box sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth:200}}
             role="presentaion"
             onClick={toggleDraw(true)}
             onKeyDown={toggleDraw(false)}>
            <ExploreCategories/>
        </Box>
    )

    const theme= useTheme();
    const isSmallScreen: boolean = useMediaQuery((theme.breakpoints.up("sm")))

    useEffect(() => {
        if (isSmallScreen && sideMenu){
        setSideMenu(false);
        }
    }, [isSmallScreen]);

    return (
        <AppBar sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
            backgroundColor: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`
        }}
        >
            <Toolbar variant="dense" sx={{
                height: theme.primaryAppBar.height,
                minHeight:  theme.primaryAppBar.height}}
            >
                <Box sx = {{ display: {xs:"block", sm:"none"}}}>
                    <IconButton
                        color='inherit'
                        aria-label="open drawer"
                        edge="start" sx ={{mr:2}}
                    onClick={toggleDraw(true)}>
                        <MenuIcon/>
                    </IconButton>
                </Box>
                <Drawer anchor="left" open={sideMenu} onClose={toggleDraw(false)}>
                    {list()}
                </Drawer>

                <Link href='/' underline='none' color='inherit'>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{display:{fontWeight: 700, letterSpacing:"-0.5px"}}}>
                        ID_Chat
                    </Typography>
                </Link>
                <Box sx={{flexGrow:1 }}>
                    <AccountButton/>
                </Box>
            </Toolbar>
        </AppBar>
    );

}

export default PrimaryAppBar