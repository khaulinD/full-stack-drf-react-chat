import Box from '@mui/material/Box';
import {CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import Main from "./templates/Main.tsx";
import MessageInterface from "../components/Main/MessageInterface.tsx";
import ServerChannels from "../components/SecondaryDraw/ServerChannels.tsx";
import UserServers from '../components/PrimaryDraw/UserServers.tsx';
import {useNavigate, useParams} from "react-router-dom";
import useCrud from "../hooks/useCrud.ts";
import {Server} from "../@types/server.d";
import {useEffect} from "react";


const Server = () =>{

    const navigate = useNavigate();
    const {serverId, channelId} = useParams();

    const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
        [],
        `/server/?by_serverid=${serverId}`
    );
    if (error !== null && error.message ==="400"){
        navigate('/');
        return null;
    }



    useEffect(() => {
        fetchData();
    }, []);

    const isChannel = ():Boolean =>{
        if(!channelId){
            return true;
        }
        return dataCRUD.some((server) =>{
            server.channel_server.some(
                (channel) => channel.id === parseInt(channelId)
            )
        })
    }

    //     useEffect(() => {
    //     if (!isChannel()) {
    //         console.log("Gsdf")
    //         navigate(`/server/${serverId}`)
    //     }
    // }, [isChannel, channelId]);


    return (

           <Box sx={{display: "flex"}}>
               <CssBaseline/>
                <PrimaryAppBar/>
                <PrimaryDraw>
                   <UserServers open={false}/>  {/*data={dataCRUD}*/}
                </PrimaryDraw>
                 <SecondaryDraw>
                     <ServerChannels  data={dataCRUD}/>
                 </SecondaryDraw>
                <Main>
                    <MessageInterface data={dataCRUD}/>
                </Main>
           </Box>
    )

};


export default Server;

