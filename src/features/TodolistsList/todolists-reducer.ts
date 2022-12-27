import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppActionsType, setAddTodolistLoading, setAppStatus, setMessage} from "../../app/app-reducer";
import {getErrorMessage} from "../../utils/utils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', isLoading: false, isLoadingAdd: false}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
            ;
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', isLoading: false, isLoadingAdd: false}));
        case "SET_IS_LOADING_TODOLIST":
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                isLoading: action.payload.isLoading
            } : tl);
        case "SET_LOADING_ADD":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, isLoadingAdd: action.payload.isLoadingAdd} : tl);
        default:
            return state;
    }
}

// actions
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const);
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
const setTodolistLoading = (todolistId: string, isLoading: boolean) => {
    return {
        type: 'SET_IS_LOADING_TODOLIST',
        payload: {todolistId, isLoading},
    } as const;
};
export const setLoadingAdd = (todolistId: string, isLoadingAdd: boolean) => {
    return {
        type: 'SET_LOADING_ADD',
        payload: {todolistId, isLoadingAdd},
    } as const;
};

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatus("loading"));
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data));
                dispatch(setAppStatus("succeeded"));
            })
            .catch(error => {
                dispatch(setMessage('error', getErrorMessage(error)));
                dispatch(setAppStatus('failed'));
            })
    }
};
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAddTodolistLoading(true));
        dispatch(setAppStatus('loading'));
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item));
                    dispatch(setAppStatus('succeeded'));
                } else {
                    dispatch(setMessage('error', JSON.stringify(res.data.messages)));
                    dispatch(setAppStatus('failed'));
                }
            })
            .catch(error => {
                dispatch(setMessage('error', getErrorMessage(error)));
                dispatch(setAppStatus('failed'));
            })
            .finally(() => {
                dispatch(setAddTodolistLoading(false));
            })
    }
};
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatus('loading'));
        dispatch(setTodolistLoading(todolistId, true));
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistId));
                    dispatch(setMessage('info', 'Todolist removed!'));
                    dispatch(setAppStatus('succeeded'));
                } else {
                    dispatch(setMessage('error', JSON.stringify(res.data.messages)));
                    dispatch(setTodolistLoading(todolistId, false));
                    dispatch(setAppStatus('failed'));
                }
            })
            .catch(error => {
                dispatch(setMessage('error', getErrorMessage(error)));
                dispatch(setTodolistLoading(todolistId, false));
                dispatch(setAppStatus('failed'));
            })
    }
};
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setTodolistLoading(id, true));
        dispatch(setAppStatus('loading'));
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(id, title));
                    dispatch(setAppStatus('succeeded'));
                } else {
                    dispatch(setMessage('error', JSON.stringify(res.data.messages)));
                    setAppStatus('failed');
                }
            })
            .catch(error => {
                dispatch(setMessage('error', getErrorMessage(error)));
                setAppStatus('failed');
            })
            .finally(() => {
                dispatch(setTodolistLoading(id, false));
            })
    }
};

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof setTodolistLoading>
    | AppActionsType
    | ReturnType<typeof setAddTodolistLoading>
    | ReturnType<typeof setLoadingAdd>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    isLoading: boolean;
    isLoadingAdd: boolean
}
