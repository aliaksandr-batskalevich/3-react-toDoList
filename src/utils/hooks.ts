import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionsType, AppRootStateType} from "../app/store";

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>();

export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, ActionsType>