import {Server} from "../../@types/server";
import {AppBar, Avatar, Drawer, IconButton, ListItemAvatar, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import { MEDIA_URL } from "../../config";
import MoreVertIcon from '@mui/icons-material/MoreVert';
//import ExploreCategories from "../SecondaryDraw/ExploreCategories.tsx";
import React, {useEffect, useState} from "react";
import ServerChannels from "../SecondaryDraw/ServerChannels.tsx";
interface ServerChannelProps {
    data: Server[];
}
const MessageInterfaceChannels = (props: ServerChannelProps) => {
    const theme = useTheme();
    const {data} = props;
    const {serverId, channelId} = useParams()
    const channelName = data
        ?.find((server)=> server.id==Number(serverId))
        ?.channel_server?.find((channel)=>channel.id === Number(channelId))
        ?.name || "home"
    const isSmallScreen: boolean = useMediaQuery((theme.breakpoints.up("sm")))
    useEffect(() => {
        if (isSmallScreen && sideMenu){
        setSideMenu(false);
        }
    }, [isSmallScreen]);
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
             onClick={toggleDraw(false)}
             onKeyDown={toggleDraw(false)}>
            <ServerChannels data={data}/>
        </Box>
    )

    return (<>
    <AppBar sx={{
        backgroundColor:theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`
        }}
        color="default"
        position="sticky"
        elevation={0}
    >
        <Toolbar variant="dense"
                 sx={{minHeight: theme.primaryAppBar.height,
                    height:theme.primaryAppBar.height,
                    display:"flex",
                    alignItems:"center",
                }}
        >

            <Box sx={{display:{xs:"block", sm:"none"}}}>
                <ListItemAvatar sx={{minWidth:"40px"}}>
                    <Avatar alt="Server Icon"
                            src={`${MEDIA_URL}${data?.[0]?.icon}`}
                            sx={{width:30, height:30}}
                    />
                </ListItemAvatar>
            </Box>
            <Typography noWrap component="div">
                {channelName}
            </Typography>
           <Box >   {/*sx={{flexgrow:1}}*/}

            </Box>
            <Box sx={{display:{ xs:'block', sm:"none"},marginLeft: 'auto'}}>
                <IconButton color="inherit" onClick={toggleDraw(true)} edge="end">
                    <MoreVertIcon/>
                </IconButton>
            </Box>
            <Drawer anchor="left" open={sideMenu} onClose={toggleDraw(false)}>
                {list()}
            </Drawer>
        </Toolbar>
    </AppBar>
    </>)
}


export default MessageInterfaceChannels