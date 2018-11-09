import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
Application State:
    tasks: Map(), is to task
    users: [], list of users
 */

function tasks(state = new Map(), action) {
    switch (action.type) {
        case 'TASK_LIST' :
            let state1 = new Map(state);
            action.data.forEach((task) => {
                state1.set(task.id, task);
            });
            return state1;
        case 'TASK_DELETE':
            let state2 = new Map(state);
            state2.delete(action.task_id);
            return state2;
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case 'USER_LIST':
            return action.data;
        default:
            return state;
    }
}

function session(state = null, action) {
    switch (action.type) {
        case 'NEW_SESSION':
            return action.data;
        case 'END_SESSION':
            return null;
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    let reducer = combineReducers({tasks, users, session});
    let state1 = reducer(state0, action);

    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;