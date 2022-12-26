export type AppActionsType = ReturnType<typeof setMessage>
    | ReturnType<typeof setNullMessage>
    | ReturnType<typeof setAppStatus>

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type TextType = 'error' | 'info';
type MessageType = null | {
    textType: TextType
    text: string
}

export type AppStateType = typeof initialState;


const initialState = {
    status: 'idle' as AppStatusType,
    message: null as MessageType,
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType) => {
    switch (action.type) {
        case "SET_APP_STATUS":
            return {...state, ...action.payload};
        case "SET_MESSAGE":
            return {...state, message: {...action.payload}};
        case "SET_NULL_MESSAGE":
            return {...state, message: null};
        default:
            return state;
    }
}

export const setAppStatus = (status: AppStatusType) => {
    return {
        type: 'SET_APP_STATUS',
        payload: {status},
    } as const;
};
export const setMessage = (textType: TextType, text: string) => {
    return {
        type: 'SET_MESSAGE',
        payload: {textType, text},
    } as const;
};
export const setNullMessage = () => {
    return {
        type: 'SET_NULL_MESSAGE',
    } as const;
};
