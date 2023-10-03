
import { ThemeProvider } from '@mui/material/styles';
import {CssBaseline,useMediaQuery} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";

import createMuiTheme from "../theme/theme.tsx";
import {ColorModeContext} from "../context/DarkModeContext.tsx"

interface ToggleColorModeProps {
    children: React.ReactNode
}


 const ToggleColorMode:React.FC<ToggleColorModeProps> = ({children})=>{
    const [mode, setMode] = useState<"light" | "dark">(
        ()=>(localStorage.getItem("colorMode") as "light" | "dark"
            ) || (useMediaQuery("([prefers-color-scheme: dark])") ? "dark" : "light")
    )

     const toggleColorMode = React.useCallback(()=>{
        setMode((prevMode)=>(prevMode ==="light" ? "dark" :"light"))
     }, [])

     useEffect(() => {
         localStorage.setItem("colorMode", mode)
     }, [mode]);

    const colorMode = useMemo(()=>({toggleColorMode}), [toggleColorMode]);

    const theme = React.useMemo(() => createMuiTheme(mode || "light"), [mode])

     return (
         <ColorModeContext.Provider value={colorMode}>
             <ThemeProvider theme={theme}>
                 <CssBaseline/>
                 {children}
             </ThemeProvider>
         </ColorModeContext.Provider>
     )
 };

export default ToggleColorMode
