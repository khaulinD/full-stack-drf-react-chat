import Box from "@mui/material/Box";
import { useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import { Link } from "react-router-dom"; // Используем useNavigate
import { MEDIA_URL } from "../../config.ts";
import useCrud from "../../hooks/useCrud.ts";

interface Category {
    id: number;
    name: string;
    description: string;
    icon: string;
}

const ExploreCategories = () => {
    const theme = useTheme();

    const isDarkMode = theme.palette.mode ==='dark';

    const { dataCRUD, error, isLoading, fetchData } = useCrud<Category>([], "/category/");

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Box
                sx={{
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    position: "sticky",
                    top: 0,
                    backgroundColor: theme.palette.background.default,
                    fontWeight: 600, fontSize:"20px"
                }}
            >
                Explore
            </Box>
            <List sx={{ p: 0 }}>
                {dataCRUD.map((item) => (
                    <ListItem disablePadding key={item.id} sx={{ display: "flex", width: "100%" }} dense={true}>
                        <Link
                            to={`/category/${item.name}`}
                            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                        >
                            <ListItemButton sx={{ minHeight: 48, width: "100%" }}>
                                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                                    <ListItemAvatar sx={{ minWidth: "0px" }}>
                                        <img
                                            alt="category-icon"
                                            src={`${MEDIA_URL}${item.icon}`}
                                            style={{
                                                width: "35px",
                                                height: "35px",
                                                display: "block",
                                                filter: isDarkMode ? "invert(100%)":"none",
                                            }}

                                        />
                                    </ListItemAvatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant={"body2"}
                                            sx={{
                                                fontSize:"18px",
                                                fontWeight: 600,
                                                lineHeight: 1.2,
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    }
                                    primaryTypographyProps={{
                                        sx: { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" },
                                    }}
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    );
}

export default ExploreCategories;
