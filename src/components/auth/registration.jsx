import React from "react";
import {
    Button, FormControl, FormHelperText, TextField, Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    emailErrors,
    nameErrors,
    passwordErrors,
    passwordConfirmErrors,
    regExp,
} from "../../validation";
import withSchoolService from "../hoc/with-school-service";
import useStyles from "./styles";
import { authActions } from "../../actions/index";

const Registration = ({
    registration, authentication,
}) => {
    const classes = useStyles();
    const {
        register, handleSubmit, watch, errors,
    } = useForm();

    const onSubmit = (data) => {
        const registrationData = {
            email: data.email,
            name: data.name,
            password: data.password,
        };
        registration(registrationData);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" align="center" gutterBottom>
                Реєстрація
            </Typography>
            <FormControl className={classes.input}>
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    variant="outlined"
                    size="small"
                    inputRef={register({ required: true, pattern: regExp.email })}
                />
                {errors.email
                && (
                    <FormHelperText className={classes.helper} id="email-helper-text">
                        { emailErrors[errors.email.type] }
                    </FormHelperText>
                )}
            </FormControl>
            <FormControl className={classes.input}>
                <TextField
                    label="Ім'я"
                    type="text"
                    name="name"
                    variant="outlined"
                    size="small"
                    inputRef={register({ required: true, minLength: 2, pattern: regExp.name })}
                />
                {errors.name
                && (
                    <FormHelperText className={classes.helper} id="email-helper-text">
                        { nameErrors[errors.name.type] }
                    </FormHelperText>
                )}
            </FormControl>
            <FormControl className={classes.input}>
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    variant="outlined"
                    size="small"
                    inputRef={register({ required: true, minLength: 6, pattern: regExp.password })}
                />
                {errors.password
                && (
                    <FormHelperText className={classes.helper} id="email-helper-text">
                        { passwordErrors[errors.password.type] }
                    </FormHelperText>
                )}
            </FormControl>
            <FormControl className={classes.input}>
                <TextField
                    label="Підтвердіть пароль"
                    type="password"
                    name="passwordConfirm"
                    variant="outlined"
                    size="small"
                    inputRef={register({ validate: (value) => value === watch("password") })}
                />
                {errors.passwordConfirm
                && (
                    <FormHelperText className={classes.helper} id="email-helper-text">
                        { passwordConfirmErrors[errors.passwordConfirm.type] }
                    </FormHelperText>
                )}
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={authentication}
                className={classes.button}
            >
                Зареєструватися
            </Button>
        </form>
    );
};

const mapStateToProps = ({ authReducer: { authentication } }) => ({
    authentication,
});

const mapDispatchToProps = (dispatch, { schoolService }) => bindActionCreators({
    registration: (userInfo) => authActions.registration(
        schoolService,
        userInfo,
    )(),
}, dispatch);

export default withSchoolService()(connect(mapStateToProps, mapDispatchToProps)(Registration));
