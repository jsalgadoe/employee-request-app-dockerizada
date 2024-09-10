import { ThemeProvider, createTheme } from "@mui/material/styles";

import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { getDesignTokens } from "./blueTheme";
import PropTypes from "prop-types";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const AppTheme = ({ children }) => {
  const currentModeStorage = useRef(
    localStorage.getItem("theme-app") ?? "light"
  );
  const [mode, setMode] = useState(currentModeStorage.current);

  useEffect(() => {
    localStorage.setItem("theme-app", mode.toString());
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

AppTheme.propTypes = {
  children: PropTypes.node,
};
