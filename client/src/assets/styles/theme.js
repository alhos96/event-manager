import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3D4498",
    },
    secondary: {
      main: "#F4C700",
    },
    text: {
      primary: "#3D4498",
      secondary: "rgba(18,18,18,0.8)",
      disabled: "rgba(18,18,18,0.2)",
      hint: "rgba(18,18,18,0.5)",
    },
    divider: "rgba(244, 199, 0, 0.5)",
  },
});
