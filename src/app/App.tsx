import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {useAppDispatch} from "../utils/hooks";
import {authMeTC, logOutTC} from "../features/Login/authReducer";

type AppPropsType = {
    demo?: boolean
}

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>ERROR 404: PAGE not FOUND</h1>
            <div onClick={() => navigate(-1)}>Back</div>
            <a href="/">Go to main page</a>
        </div>
    )
}

function App({demo = false}: AppPropsType) {

    let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);

    const dispatch = useAppDispatch();
    let isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);

    useEffect(() => {
        dispatch(authMeTC());
    }, []);

    const logOutHandler = () => {
        dispatch(logOutTC());
    }

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);

    if (!isInitialized) {
        return <h1 style={{alignItems: 'center'}}>LOADING...</h1>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isAuth && <Button onClick={logOutHandler} color="inherit">LogOut</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'404'} element={<PageNotFound/>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
