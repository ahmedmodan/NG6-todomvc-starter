import {
    ADD_TODO, CLEAR_COMPLETED, COMPLETE_ALL, COMPLETE_TODO, DELETE_TODO,
    TOGGLE_TODO, SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED, EDIT_TODO
} from '../constants/todoConstants';

export const addTodo = (text) => ({ type: ADD_TODO, payload: { text } });

export const deleteTodo = id => ({ type: DELETE_TODO, payload: { id } });

export const editTodo = (id, text) => ({ type: EDIT_TODO, payload: { id, text } });

export const toggleTodo = id => ({ type: TOGGLE_TODO, payload: { id } });

export const completeAll = () => ({ type: COMPLETE_ALL });

export const clearCompleted = () => ({ type: CLEAR_COMPLETED });

export const showAll = () => ({ type: SHOW_ALL });

export const showCompleted = () => ({ type: SHOW_COMPLETED});

export const showActive = () => ({ type: SHOW_ACTIVE });

