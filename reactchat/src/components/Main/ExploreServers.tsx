import {useParams} from "react-router-dom";
import useCrud from "../../hooks/useCrud.ts";
import {useEffect} from "react";
import {
    Avatar,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon, ListItemText,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import {MEDIA_URL} from "../../config.ts";
interface  Server{
    id: number;
    name: string;
    category: string;
    icon: string;
    banner: string;
}

const ExploreServers = () =>{
    const {categoryName} = useParams()
    const url = categoryName ? `server/?by_serverid=${categoryName}` : `/server/`;
    const {dataCRUD, fetchData} = useCrud<Server>([], url);

    useEffect(() => {
        fetchData();
    }, [categoryName]);
    return (<>
    <Container maxWidth="lg">
        <Box sx={{pt:6}}>
            <Typography variant='h3' noWrap component='h1'
                        sx={{display:{sm: "block",
                                fontWeight:700,
                                letterSpacing:"-2px"},
                            textAlign:{xs:'center', sm:"left"},
                            textTransform:"capitalize"}}>
                {categoryName ? categoryName : "Popular Channels"}
            </Typography>
        </Box>
        <Box>
            <Typography variant='h6'
                        color='textSecondary'
                        noWrap component='h2'
                        sx={{display:{sm: "block",
                                fontWeight:700,
                                letterSpacing:"-1px"},
                            textAlign:{xs:'center', sm:"left"},
                        }}>
                {categoryName ? `Channels talking about ${categoryName}` : "Check out some of popular channels"}
            </Typography>
        </Box>
        <Box sx={{pt:8, pb:2}}>
            <Typography variant='h5'
                        noWrap
                        component='h2'
                        sx={{display:{sm: "block",
                                fontWeight:700,
                                letterSpacing:"-1px"},
                            textAlign:{xs:'center', sm:"left"},
                        }}>
                {categoryName ? null: `Recommended Channels`}
            </Typography>
        </Box>
        <Grid  sx={{display:{ marginLeft:"40px"}}} container spacing={{xs: 0, sm: 2}}>
            {dataCRUD.map((item)=>(
                <Grid item key={item.id} xs={12} sm={6} md={6} lg={3}>
                    <Card sx={{height:"100%", display:"flex", flexDirection:"column", boxShadow:"none", backgroundImage:"none"}}>
                        <Link to={`/server/${item.id}`} style={{textDecoration:"none", color:"inherit"}}>
                            <CardMedia
                                component="img"
                                image={item.banner ? `${MEDIA_URL}${item.banner}` : "http://127.0.0.1:8000/media/stock.jpg"}
                                alt="random"
                                sx={{display:{xs:"none", sm:"block"}, maxHeight: "155.19px"}}/>
                            <CardContent sx={{flexGrow:1, p:0, "&:last-child": {paddingBottom:0}}}>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemIcon sx={{minWidth:0}}>
                                            <ListItemAvatar sx={{minWidth:"50px"}}>
                                                <Avatar alt="server icon" src={`${MEDIA_URL}${item.icon}`}/>
                                            </ListItemAvatar>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography variant="body2" sx={{
                                                    fontWeight: 700,
                                                    lineHeight: 1.2,
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap" }}>
                                                    {item.name}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" >
                                                    {item.category}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Link>
                    </Card>
                </Grid>
            ))}
        </Grid>

    </Container>
        </>)
}

export default ExploreServers