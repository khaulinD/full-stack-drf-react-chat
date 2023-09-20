import {createBrowserRouter,RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import React from "react";
import {ThemeProvider} from "@mui/material";
import createMuiTheme from "./theme/theme.tsx"
import Explore from "./pages/Explore.tsx";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>}/>
            <Route path="category/:categoryName" element={<Explore/>}/>
        </Route>
    )
)


const App: React.FC =()=>{
    const theme = createMuiTheme();
    return(
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>

    )
}

export default App
