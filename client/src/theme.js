import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#6ec6ff",
      main: "#2196f3",
      dark: "#0069c0",
      contrastText: "#fff"
    },
    secondary: {
      light: "#62efff",
      main: "#00bcd4",
      dark: "#008ba3",
      contrastText: "#000"
    }
  },
  typography: {
    useNextVariants: true
  }
});
