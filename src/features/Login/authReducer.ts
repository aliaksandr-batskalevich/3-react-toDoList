import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {ThunkAppDispatchType} from "../../utils/hooks";
import axios from "axios";
import {setAppErrorAC, setAppStatusAC, setIsInitialized} from "../../app/app-reducer";

let authInitState = {
    isAuth: false,
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
};

export const authReducer = (state: AuthStateType = authInitState, action: AuthActionsType) => {
    switch (action.type) {
        case "AUTH_ME":
            return {...state, ...action.payload}
        case "LOGIN":
            return {...state, isAuth: true};
        case "LOGOUT":
            return {...state, isAuth: false, id: null, email: null, login: null}
        default:
            return state;
    }
};

// Action Creators
const login = () => {
    return {
        type: 'LOGIN',
    } as const;
};
const authMe = (isAuth: boolean, id: number, email: string, login: string) => {
    return {
        type: 'AUTH_ME',
        payload: {isAuth, id, email, login}
    } as const;
};
const logout = () => {
    return {
        type: 'LOGOUT'
    } as const;
};

// ThunkCreators
export const authMeTC = () => async (dispatch: ThunkAppDispatchType) => {
    dispatch(setAppStatusAC("loading"));
    try {
        let response = await authAPI.authMe();
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(authMe(true, id, email, login));
            dispatch(setAppStatusAC("succeeded"));
        } else {
            throw new Error(JSON.stringify(response.data.messages));
        }
    } catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response
                ? error.response.data.reason
                : error.message;
        } else {
            // @ts-ignore
            errorMessage = error.message;
        }
        dispatch(setAppErrorAC(errorMessage));
        dispatch(setAppStatusAC("failed"));
    }
    dispatch(setIsInitialized(true));
}

export const loginTC = (loginParams: LoginParamsType) => async (dispatch: ThunkAppDispatchType) => {
    dispatch(setAppStatusAC("loading"));
    try {
        let response = await authAPI.login(loginParams);
        if (response.data.resultCode === 0) {
            dispatch(login());
            dispatch(setAppStatusAC("succeeded"));
        } else {
            throw new Error(JSON.stringify(response.data.messages));
        }
    } catch (error) {
        let errorMessage: string

        if (axios.isAxiosError(error)) {
            errorMessage = error.response
                ? error.response.data.reason
                : error.message
        } else {
            // @ts-ignore
            errorMessage = error.message
        }
        dispatch(setAppErrorAC(errorMessage));
        dispatch(setAppStatusAC("failed"));
    }
};

export const logOutTC = () => async (dispatch: ThunkAppDispatchType) => {
    dispatch(setAppStatusAC("loading"));
    try {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(logout());
            dispatch(setAppStatusAC("succeeded"));
        } else {
            throw new Error(JSON.stringify(response.data.messages));
        }
    }
    catch (error) {
        let errorMessage: string
        if (axios.isAxiosError(error)) {
            errorMessage = error.response
                ? error.response.data().reason
                : error.message;
        } else {
            // @ts-ignore
            errorMessage = error.message;
        }
        dispatch(setAppErrorAC(errorMessage));
        dispatch(setAppStatusAC("failed"));
    }
};

// types
export type AuthStateType = typeof authInitState
export type AuthActionsType = ReturnType<typeof login>
    | ReturnType<typeof authMe>
    | ReturnType<typeof logout>