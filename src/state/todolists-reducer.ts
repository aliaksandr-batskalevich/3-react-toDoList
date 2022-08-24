import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type TodolistActionsType = ReturnType<typeof RemoveTodolistAC> | ReturnType<typeof AddTodolistAC> | ReturnType<typeof ChangeTodolistTitleAC> | ReturnType<typeof ChangeTodolistFilterAC>;

export const todolistsReducer = (state: Array<TodolistType>, action: TodolistActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.payload.newTodolistId, title: action.payload.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const AddTodolistAC = (title: string) => {
    const newTodolistId = v1();
    return { type: 'ADD-TODOLIST',
    payload: {title, newTodolistId}} as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId} as const
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId} as const
}
