import { createMuiTheme } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import orange from "@material-ui/core/colors/orange";

const theme = createMuiTheme({
    palette: {
        primary: deepOrange,
        secondary: orange,
    },
});

export default theme;
