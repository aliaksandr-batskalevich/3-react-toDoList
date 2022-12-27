import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setLoadingAdd,
    SetTodolistsActionType
} from './todolists-reducer'
import {
    TaskPriorities,
    TaskResponseType,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {AppActionsType, AppStateType, setAppStatus, setMessage} from "../../app/app-reducer";
import axios from "axios";
import {getErrorMessage} from "../../utils/utils";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case "SET_IS_LOADING_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isLoadingTask: action.payload.isLoadingTask
                } : t)
            }
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const);

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const);

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const);

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const);

export const setIsLoadingTask = (todolistId: string, taskId: string, isLoadingTask: boolean) => {
    return {
        type: 'SET_IS_LOADING_TASK',
        payload: {todolistId, taskId, isLoadingTask}
    } as const;
};


// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items.map(t => ({...t, isLoadingTask: false}));
            const action = setTasksAC(tasks, todolistId);
            dispatch(action);
            dispatch(setAppStatus("succeeded"));
        })
        .catch(error => {
            dispatch(setMessage('error', getErrorMessage(error)));
            dispatch(setAppStatus('failed'));
        })
};

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'));
    dispatch(setLoadingAdd(todolistId, true));
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = {...res.data.data.item, isLoadingTask: false};
                const action = addTaskAC(task);
                dispatch(action);
                dispatch(setAppStatus('succeeded'));
            } else {
                if (res.data.messages.length) {
                    dispatch(setMessage('error', JSON.stringify(res.data.messages)));
                } else {
                    dispatch(setMessage('error', 'Some error'));
                }
                dispatch(setAppStatus('failed'));
            }
        })
        .catch(error => {
            dispatch(setMessage('error', getErrorMessage(error)));
            dispatch(setAppStatus('failed'));
        })
        .finally(() => {
            dispatch(setLoadingAdd(todolistId, false));
        })
};

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'));
    dispatch(setIsLoadingTask(todolistId, taskId, true));
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action);
            dispatch(setMessage('info', 'Task removed!'));
            dispatch(setAppStatus('succeeded'));
        })
        .catch(error => {
            dispatch(setMessage('error', getErrorMessage(error)));
            dispatch(setIsLoadingTask(todolistId, taskId, false));
            dispatch(setAppStatus('failed'));
        })
};

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

        dispatch(setIsLoadingTask(todolistId, taskId, true));
        dispatch(setAppStatus('loading'));

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action);
                dispatch(setAppStatus('succeeded'))
            })
            .catch(error => {
                dispatch(setMessage('error', getErrorMessage(error)));
                dispatch(setAppStatus('failed'));
            })
            .finally(() => {
                dispatch(setIsLoadingTask(todolistId, taskId, false));
            })
    };

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | AppActionsType
    | ReturnType<typeof setIsLoadingTask>
    | ReturnType<typeof setLoadingAdd>
