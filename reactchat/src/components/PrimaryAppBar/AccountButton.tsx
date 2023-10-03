
import Box from "@mui/material/Box";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import DarkModeSwitch from "./DarkMode/DarkModeSwitch.tsx";
import React, { useState } from "react";

const AccountButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isMenuOpen}
      keepMounted
      onClose={handleProfileMenuClose}
    >
      <MenuItem>
        <DarkModeSwitch />
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Размещаем контейнер справа
          alignItems: "center", // Выравниваем по вертикали по центру
          width: "100%", // Чтобы занять всю ширину
        }}
      >
        {renderMenu}
        <IconButton color="inherit" onClick={handleProfileMenuOpen}>
          <AccountCircle />
        </IconButton>
      </Box>
    </>
  );
};

export default AccountButton;