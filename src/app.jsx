import React, { useEffect } from "react";
import "typeface-roboto";
import { connect } from "react-redux";
import {
    Switch,
    Route,
} from "react-router-dom";
import Header from "./components/header";
import AuthPage from "./pages/auth";
import SideMenu from "./components/side-menu";
import HomePage from "./pages/home";
import NewsPage from "./pages/articles";
import authActions from "./actions/auth.actions";
import Alert from "./components/alert";
import alertActions from "./actions/alert.actions";
import ArticlePage from "./pages/article";
import UsersPage from "./pages/users";
import ArticlesListPage from "./pages/articles-list";
import Footer from "./components/footer";

const App = ({
    checkAuthorization,
    alertOpen,
    alertTitle,
    alertContent,
    alertCb,
    closeAlert,
    confirm,
}) => {
    useEffect(() => {
        checkAuthorization();
    }, [checkAuthorization]);

    return (
        <>
            <Header />
            <SideMenu />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/article/:id" component={ArticlePage} />
                <Route path="/login" component={AuthPage} />
                <Route path="/registration" component={AuthPage} />
                <Route path="/posts" component={NewsPage} />
                <Route path="/users" component={UsersPage} />
                <Route path="/articles-list" component={ArticlesListPage} />
                <Route render={() => <h1>404 Not Found</h1>} />
            </Switch>
            {/*<Footer />*/}
            <Alert
                open={alertOpen}
                handleClose={closeAlert}
                title={alertTitle}
                content={alertContent}
                cb={alertCb}
                confirm={confirm}
            />
        </>
    );
};

const mapStateToProps = ({
    alertReducer: {
        alertOpen, alertTitle, alertContent, alertCb, confirm,
    },
}) => ({
    alertOpen,
    alertTitle,
    alertContent,
    alertCb,
    confirm,
});

const mapDispatchToProps = {
    checkAuthorization: () => authActions.checkAuthorization(),
    closeAlert: () => alertActions.closeAlert(),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
