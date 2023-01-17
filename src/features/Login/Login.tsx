import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch} from "../../utils/hooks";
import {loginTC} from "./authReducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";

type ErrorsObjType = {
    email?: string,
    password?: string,
}

export const Login = () => {

    const dispatch = useAppDispatch();

    let isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);

    const loginHandler = (email: string, password: string, rememberMe?: boolean, captcha?: string) => {
        dispatch(loginTC({email, password, rememberMe, captcha}));
    }

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            let errors: ErrorsObjType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Incorrect email';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length > 12) {
                errors.password = 'Length of password should be to 12 symbols';
            }

            return errors
        },
        onSubmit: values => {
            loginHandler(values.email, values.password, values.rememberMe);
            formik.resetForm();
        },
    });

    return <>

        {isAuth && <Navigate to={'/'}/>}

        <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>

                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                        <p style={{color: 'red'}}>{formik.errors.email}</p>}

                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <p style={{color: 'red'}}>{formik.errors.password}</p>}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                            />}
                        />
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                        >
                            Login
                        </Button>
                    </FormGroup>
                </form>

            </FormControl>
        </Grid>
    </Grid></>
}
