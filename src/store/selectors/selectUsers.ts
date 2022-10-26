import {UserType} from 'types';
import { RootStateOrAny } from 'react-redux';
import {RootStoreType} from "../index";

export const selectUsers = (state: RootStoreType): UserType[] => state.usersData.users;
