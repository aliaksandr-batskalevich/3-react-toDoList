import {RootStoreType} from "../index";

export const selectUsersCount = (state: RootStoreType): number => state.userCount.count;
