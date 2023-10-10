import useWebSocket from "react-use-websocket";
import {useState} from "react";
import {useParams} from "react-router-dom";
import useCrud from "../../hooks/useCrud.ts";
import {Server} from "../../@types/server";
import Box from "@mui/material/Box";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, TextField} from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfaceChannels.tsx";
import React from "react";
import {useTheme} from "@mui/material/styles";
import Scroll from "./Scroll.tsx";

interface SendMessageData {
    type: string;
    message:string;
    [key:string]: any;
}

interface ServerChannelProps{
    data: Server[];

}

interface Message {
    sender: string;
    content: string;
    id: string;
    timestamp:string;
}

const MessageInterface = (props: ServerChannelProps) =>{
    const [newMessage, setNewMessage] = useState<Message[]>([])
    const theme = useTheme();
    const [message, setMessage] = useState("")
    const {serverId, channelId} = useParams();
    const {data} = props;
    const socketURL = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}`: null;
    const server_name = data?.[0]?.name ?? "Server";
    const {fetchData} = useCrud<Server>([], `/messages/?channel_id=${channelId}`)


    // useEffect(() => {
    //     fetchData();
    // }, []);

    //const [inputValue, setInputValue] = useState('')
    const {sendJsonMessage} = useWebSocket(socketURL, {
    onOpen: async () => {
        try{
            const data = await fetchData();
            setNewMessage([])
            setNewMessage(Array.isArray(data) ? data : [])
            console.log("Connected")
        } catch (error){
            console.log(error)
        }
    },
    onClose: () => {
        console.log("Closed")
    },
    onError: () => {
        console.log("Error")
    },
    onMessage: (msg) =>{
        const data = JSON.parse(msg.data);
        console.log(data)
        setNewMessage((prev_msg) =>[...prev_msg, data.new_message])
        setMessage("")
    },

});
    const handleKeyDown= (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if (e.key ==="Enter"){

            e.preventDefault();
            sendJsonMessage({
            type: "message",
            message } as SendMessageData)
            console.log("data send")
        }

    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{

        e.preventDefault();
        sendJsonMessage({
            type: "message",
            message
        } as SendMessageData)
    }
    function formatTimeStamp(timestamp:string): string{
        const date = new Date(Date.parse(timestamp))
        const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`

        const formattedTime = date.toLocaleTimeString([],{hour:"2-digit", minute:"2-digit", hour12:true})

        return `${formattedDate} at ${formattedTime}`

    }


    return(<>

        <MessageInterfaceChannels data={data}/>
        {channelId == undefined ?
            (<Box sx={{overflow: "hidden",p:{xs:0}, height:`calc(80vh)`, display: "flex", justifyContent:"center", alignItems:"center"}}>
                <Box sx={{textAlign:"center"}}>
                    <Typography variant="h4" fontWeight={700} letterSpacing={"-0.5px"} sx={{px:5, maxWidth:"600px"}}>
                        Welcome to {server_name}
                    </Typography>
                    <Typography>
                        {data?.[0]?.description ?? "This is our home"}
                    </Typography>
                    </Box>
            </Box>) :
            (<>
                <Box sx={{overflow:'hidden', p:0,height:`calc(100vh- 100px )`}}
                >
                <Scroll>
                  <List sx={{width:"100%", bgcolor: "background.papar"}}>
                      {newMessage.map((msg:Message, index:number) =>{
                         return (
                             <ListItem key={index} alignItems="flex-start">
                                  <ListItemAvatar>
                                      <Avatar alt='user img'/>
                                  </ListItemAvatar>
                                 <ListItemText primaryTypographyProps={{fontSize:"12px", variant:"body2"}}
                                               primary={<>
                                     <Typography component="span"
                                                                    variant="body1"
                                                                    color="text.primary"
                                                                    sx={{display:"inline", fontWeight:600}}>
                                                            {msg.sender}
                                                         </Typography>
                                                    <Typography component="span" variant="caption" color="textSecondary">{"  at "}{formatTimeStamp(msg.timestamp)}
                                                    </Typography>
                                            </>}
                                                secondary={<React.Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body1"
                                                                    color="text.promary"
                                                                    style={{overflow:"visible",
                                                                        whiteSpace:"normal",
                                                                        textOverflow:"clip",
                                                                       }}
                                                                    sx={{display:"inline", fontWeight:400, letterSpacing:"-0.2px"}}>{msg.content}
                                                                </Typography>
                                                            </React.Fragment>}
                                 />
                           </ListItem>

                            )


                      })}
                  </List>
                 </Scroll>
                </Box>
                <Box sx={{position:"absolute",bottom:0, width:"100%"}}>
                <form onSubmit={handleSubmit} style={{bottom:0, right:0, padding:"1rem", backgroundColor:theme.palette.background.default, zIndex:1, }}>
                    <Box sx={{display:"flex"}}>
                        <TextField id="outlined-basic"
                                   label="Message"
                                   variant="outlined"
                                   fullWidth
                                   multiline
                                   value={message}
                                   minRows={1} maxRows={4}
                                   onKeyDown={handleKeyDown}
                                   onChange={(e)=> setMessage(e.target.value)}
                                   sx={{flexGrow:1}}/>
                        <button onClick={()=>{
                    {sendJsonMessage({type:"message", message})}
                }}>
                    Send Message
                </button>
                    </Box>
                </form>

                </Box>
        </>)
        }
    </>)
}

export default MessageInterface;