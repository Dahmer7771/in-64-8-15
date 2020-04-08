import React from 'react';
import Container from "@material-ui/core/Container";
import UsersSearchPanel from "../../components/users-search-panel";
import UsersList from "../../components/users-list";

const Users = () => {
    return (
        <Container style={{ marginTop: "16px" }}>
            <UsersSearchPanel />
            <UsersList />
        </Container>
    );
};

export default Users;
