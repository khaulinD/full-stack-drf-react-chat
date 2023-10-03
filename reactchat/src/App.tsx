import {createBrowserRouter,RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import React from "react";
import Explore from "./pages/Explore.tsx";
import ToggleColorMode from "./components/ToggleColorMode.tsx";
import Server from "./pages/Server.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>}/>
            <Route path="/server/:serverId/:channelId?" element={<Server/>}/>
            <Route path="category/:categoryName" element={<Explore/>}/>
        </Route>
    )
)


const App: React.FC =()=>{
    return(
        <ToggleColorMode>
            <RouterProvider router={router} />
        </ToggleColorMode>

    )
}

export default App
