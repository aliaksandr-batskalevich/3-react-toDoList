import {combineReducers, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

let rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
});

export const store = legacy_createStore(rootReducer);

export type AppStateType = ReturnType<typeof rootReducer>