import Box from "@mui/material/Box";
import {IconButton} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import React from "react";


type Props ={
    open:boolean;
    handleDrawOpen: () => void;
    handleDrawClose: () => void;
}

const DrawerToggle: React.FC<Props> =({open,
                                      handleDrawClose,
                                      handleDrawOpen})=>{
    return (<Box sx={{
        height: "50px",
        display: "flex",
        alignItem: "center",
        justifyContent: "end"
    }}>
        <IconButton onClick={open ? handleDrawClose : handleDrawOpen}>
            {open ? <ChevronRight/> : <ChevronLeft/>}
        </IconButton>
    </Box>)
}

export default DrawerToggle