import {AppRootStateType} from "./store";
import {AppStateType, AppStatusType} from "./app-reducer";


export const getAppState = (state: AppRootStateType): AppStateType => state.app;
export const getStatusApp = (state: AppRootStateType): AppStatusType => state.app.status;
