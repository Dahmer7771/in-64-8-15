import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    List, ListItem, ListItemText,
} from "@material-ui/core";
import { menuActions } from "../../actions/index";

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
        {
            id: 4,
            title: "Адм Класів",
            route: "/classes-list",
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

const MenuList = ({ currentUser, hideMenu }) => {
    const history = useHistory();
    const listItems = menuItems[currentUser.role || "PUBLIC"];

    return (
        <List>
            {listItems.map(({ id, title, route }) => (
                <ListItem
                    button
                    key={id}
                    onClick={() => {
                        history.push(route);
                        hideMenu();
                    }}
                >
                    <ListItemText
                        primary={title}
                    />
                </ListItem>
            ))}
        </List>
    );
};

const mapStateToProps = ({ authReducer: { currentUser } }) => ({
    currentUser,
});

const mapDispatchToProps = {
    hideMenu: menuActions.hideMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
