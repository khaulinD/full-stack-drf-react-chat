import Box from "@mui/material/Box";
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import useCrud from "../../hooks/useCrud.ts";
import {MEDIA_URL} from "../../config.ts";

type Props = {
    open: boolean;
};
interface  Server{
    id: number;
    name: string;
    category: string;
    icon: string;
}
const PopularChannel: React.FC<Props> = ({open}) =>{
    const { dataCRUD, error, isLoading, fetchData} =
        useCrud<Server>([],
            "/server/");
    useEffect(() => {
        fetchData();
    }, []);

    return (<>
        <Box sx={{
            height:50,
            p:2,
            display: "flex",
            alignItems:"center",
            flex:"1 1 100%",
        }}
        >
            <Typography sx={{display: open ? "none" : "block", fontWeight: 600, fontSize:"20px"}}>
                Popular
            </Typography>
        </Box>
        <List>
            {dataCRUD.map((item) =>(
                <ListItem
    key={item.id}
    disablePadding
    sx={{ display: "block", width: "100%" }}
    dense={true}
>
    <Link to={`/server/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemButton sx={{ width: "100%" }}>
            <ListItemIcon>
                <ListItemAvatar sx={{ minWidth: "50px" }}>
                    <Avatar alt="Server Icon" src={`${MEDIA_URL}${item.icon}`} />
                </ListItemAvatar>
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        {item.name}
                    </Typography>
                }
                secondary={
                    <Typography variant="body2" sx={{ fontWeight: 400, lineHeight: 1.2, color: "textSecondary" }}>
                        {item.category}
                    </Typography>
                }
                sx={{ flex: 1 }} // Установите flex на 1 для ListItemText
                primaryTypographyProps={{ sx: { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" } }}
            />
        </ListItemButton>
    </Link>
</ListItem>
            ))}
        </List>

    </>)

}

export default PopularChannel