import React from 'react';
import Container from "@material-ui/core/Container";
import ClassList from "../../components/class-list";
import ClassEditor from "../../components/class-editor/class-editor";

const ClassesList = () => {
    return (
        <Container style={{ marginTop: "16px" }}>
            <ClassList />
            <ClassEditor />
        </Container>
    );
};

export default ClassesList;
