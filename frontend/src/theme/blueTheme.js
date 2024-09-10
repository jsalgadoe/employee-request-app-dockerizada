export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#5C6BC0",
          },
          secondary: {
            main: "#8E99F3",
          },
          background: {
            default: "#FFFFFF",
            paper: "#F0F4F8",
          },
          text: {
            primary: "#333333",
            secondary: "#555555",
          },
          divider: "#D1D9E6",
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#303d8d",
          },
          secondary: {
            main: "#7E57C2",
          },
          background: {
            default: "#121212",
            paper: "#1E1E1E",
          },
          text: {
            primary: "#333333",
            secondary: "#474747bb",
          },
          divider: "#333333",
        }),
  },
  // palette: {
  //   mode,
  //   ...(mode === 'light'
  //ternario
  //       primary: {
  //         main: "#34A853",
  //       },
  //       secondary: {
  //         main: "#81C784",
  //       },
  //       background: {
  //         default: "#F8F9FA",
  //         paper: "#E9ECEF",
  //       },
  //       text: {
  //         primary: "#1F2937",
  //         secondary: "#4B5563",
  //       },
  //       divider: "#D1D9E6",
  //     }
  //     : {
  //         // palette values for dark mode
  //         primary: {
  //           main: "#2E7D32",
  //         },
  //         secondary: {
  //           main: "#66BB6A",
  //         },
  //         background: {
  //           default: "#1A202C",
  //           paper: "#2D3748",
  //         },
  //         text: {
  //           primary: "#F9FAFB",
  //           secondary: "#A0AEC0",
  //         },
  //         divider: "#4A5568",
  //       }),
  // },
});
