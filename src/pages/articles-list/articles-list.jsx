import React from 'react';
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import ArticleCreator from "../../components/article-creator";
import ArticlesList from "../../components/articles-list";

const ArticlesListPage = ({ editing }) => {
    return (
        <Container style={{ marginTop: "16px" }}>
            { editing
            ? <ArticleCreator />
            : <ArticlesList /> }
        </Container>
    );
};

const mapStateToProps = ({ articlesReducer: { editing } }) => ({
    editing,
});

export default connect(mapStateToProps, null)(ArticlesListPage);
