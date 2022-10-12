import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./Todolist";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskWithReduxPropsType = {
    todoListId: string
    taskId: string
}
export const TaskWithRedux: React.FC<TaskWithReduxPropsType> = React.memo(({todoListId, taskId}) => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoListId].filter(t => t.id === taskId)[0]);
    const dispatch = useDispatch();
    const onChangeStatus = (newStatus: boolean) => {
        dispatch(changeTaskStatusAC(taskId, newStatus, todoListId));
    };
    const changeTitle = (title: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId));
    };
    const onClickHandler = () => {
        dispatch(removeTaskAC(taskId, todoListId));
    };
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeStatus(event.currentTarget.checked);
    };


    return (
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={changeTitle}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});