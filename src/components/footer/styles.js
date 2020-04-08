import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        position: "relative",
        bottom: 0,
    },
}));

export default useStyles;
