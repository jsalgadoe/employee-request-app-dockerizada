import { useContext } from "react";
import { ColorModeContext } from "../../../theme";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import React from "react";

export const ButtonToggleNav = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <DarkModeIcon fontSize="large" sx={{ color: "white" }} />
      ) : (
        <LightModeIcon fontSize="large" sx={{ color: "beige" }} />
      )}
    </IconButton>
  );
};
