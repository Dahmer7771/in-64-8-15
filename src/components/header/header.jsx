import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Button,
    useScrollTrigger,
    CssBaseline,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { menuActions } from "../../actions/index";
import useStyles from "./styles";
import LogoutButton from "../logout-button/logout-button";

const menuItems = {
    ADMIN: [
        {
            id: 1,
            title: "Статті",
            route: "/posts",
        },
        {
            id: 2,
            title: "Користувачі",
            route: "/users",
        },
        {
            id: 3,
            title: "Адм Статей",
            route: "/articles-list",
        },
    ],
    MODERATOR: [
        {
            id: 1,
            title: "Статті",
            route: "/posts",
        },
        {
            id: 2,
            title: "Адм Статей",
            route: "/articles-list",
        },
    ],
    USER: [
        {
            id: 1,
            title: "Статті",
            route: "/posts",
        },
    ],
    PUBLIC: [
        {
            id: 1,
            title: "Статті",
            route: "/posts",
        },
    ],
};

const AuthButton = () => {
    const history = useHistory();
    const location = useLocation();

    switch (location.pathname) {
    case "/login":
        return (
            <Button onClick={() => history.push("/registration")} color="inherit">Реєстрація</Button>
        );
    default:
        return (
            <Button onClick={() => history.push("/login")} color="inherit">Увійти</Button>
        );
    }
};

const ElevationScroll = (props) => {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
};

const ElevationHeader = ({ showMenu, isAuth, currentUser }) => {
    const history = useHistory();
    const classes = useStyles();
    const listItems = menuItems[currentUser.role || "PUBLIC"];

    return (
        <>
            <CssBaseline />
            <ElevationScroll>
                <AppBar className={classes.header} color="primary" position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={() => showMenu()}
                            className={classes.menuButton}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.headerTitleWrapper}>
                            {/*<img onClick={() => history.push("/")} className={classes.logo} alt="logo" src="./images/logo.png" />*/}
                            <Typography variant="h6" className={classes.title}>
                                <Link to="/">
                                    ЗОШ №1
                                </Link>
                            </Typography>
                        </div>
                        <div className={classes.menuItems}>
                            {listItems.map((item) => (
                                <Button
                                    key={item.id}
                                    onClick={() => history.push(item.route)}
                                    color="inherit"
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </div>
                        {isAuth ? <LogoutButton /> : <AuthButton />}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </>
    );
};

const mapStateToProps = ({ authReducer: { isAuth, currentUser } }) => ({
    isAuth,
    currentUser,
});

const mapDispatchToProps = {
    showMenu: menuActions.showMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(ElevationHeader);
