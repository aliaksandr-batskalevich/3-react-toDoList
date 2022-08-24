import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
});

test.skip('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});

test('add task should be correct', () => {
    const action = addTaskAC('todolistId1', 'hello');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][0].id).toBeDefined();
    expect(endState["todolistId1"][0].title).toBe('hello');
    expect(endState["todolistId1"][0].isDone).toBe(false);
});

test.skip('change status should be correct', () => {
    const action = changeStatusAC('todolistId1', '2', false);
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].isDone).toBe(false);
});

test.skip('change task title should be correct', () => {
    const action = changeTaskTitleAC('todolistId1', '2', 'false');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].title).toBe('false');
});

test.skip('add todolist should be correct', () => {
    let action = AddTodolistAC('newTodolist');
    let newState = tasksReducer(startState, action);

    let oldKeysArr = ['todolistId1', 'todolistId2'];
    let newKeysArr = Object.keys(newState);
    let newKey = [];

    for (let i of newKeysArr) {
        if (oldKeysArr.indexOf(i) === -1) {
            newKey.push(i);
        }
    }

    expect(Object.keys(newState).length).toBe(3);
    expect(newKey.join()).toBe(action.payload.newTodolistId);
});

test.skip('remove todolist should be correct', () => {

    let action = RemoveTodolistAC('todolistId1');
    let newState = tasksReducer(startState, action);

    let newKeysArr = Object.keys(newState);

    expect(newKeysArr.length).toBe(1);
    expect(newKeysArr[0]).toBe('todolistId2');
});