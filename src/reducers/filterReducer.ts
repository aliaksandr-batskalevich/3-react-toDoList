import {actionType, FilterValuesType} from "../App";

const CHANGE_FILTER = 'CHANGE-FILTER';

export type changeFilterActionType = ReturnType<typeof changeFilterAC>


export const filterReducer = (state: FilterValuesType, action: actionType) => {
    switch (action.type) {
        case CHANGE_FILTER: {
            return action.payload.newFilter;
        }
        default: {
            return state
        }
    }
};

export const changeFilterAC = (newFilter: FilterValuesType) => {
    return (
        {
            type: CHANGE_FILTER,
            payload: {newFilter}
        } as const
    )
};