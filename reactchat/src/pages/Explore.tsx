import Box from "@mui/material/Box";
// import Box from '@mui/material/Box';
import {CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import Main from "./templates/Main.tsx";
import PopularChannel from "../components/PrimaryDraw/PopularChannel.tsx";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories.tsx";
import ExploreServers from "../components/Main/ExploreServers.tsx";



const Explore = () =>{


    return (

           <Box sx={{display: "flex"}}>
               <CssBaseline/>
                <PrimaryAppBar/>
                <PrimaryDraw>
                    <PopularChannel open={false}/>
                </PrimaryDraw>
                 <SecondaryDraw>
                     <ExploreCategories/>
                 </SecondaryDraw>
                <Main>
                    <ExploreServers/>
                </Main>
           </Box>
    )

};


export default Explore;