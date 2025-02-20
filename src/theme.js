import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Lato"
  },
  palette: {
    primary: {
      light: "#45c09f",
      main: "#00a278",
      dark: "#00845c",
      contrastText: "#fff",
    },
  },
  background:{
     default: "#e4f0e2"
  },
  cartBackground:{
    default: "#E9F5E1",
  }
});

export default theme;
