import * as cuid from 'cuid';
import {
    ADD_TODO, CLEAR_COMPLETED, COMPLETE_ALL, DELETE_TODO, EDIT_TODO, SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED,
    TOGGLE_TODO
} from '../constants/todoConstants';

export interface IAction {
    type: string;
    payload?: any;
}

export interface ITodo {
    id: any;
    text: string,
    completed: boolean;
}

export interface IState {
    visibilityFilter: string;
    todos: ITodo[]
}

const initialState: IState = {
    visibilityFilter: SHOW_ALL,
    todos: [
        {
            id: cuid(),
            text: 'Give Redux Presentation',
            completed: false
        }
    ]
};

const todoReducer = (state = initialState, { type, payload }: IAction): IState => {
    switch (type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: cuid(),
                        text: payload.text,
                        completed: false
                    }
                ]
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== payload.id)
            };
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === payload.id ? { ...todo, text: payload.text } : todo)
            }
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo)
            };
        case COMPLETE_ALL:
            const areAllMarked = state.todos.every(todo => todo.completed);
            return {
                ...state,
                todos: state.todos.map(todo => ({ ...todo, completed: !areAllMarked }))
            }
        case CLEAR_COMPLETED:
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed)
            }
        case SHOW_ALL:
        case SHOW_COMPLETED:
        case SHOW_ACTIVE:
            return {
                ...state,
                visibilityFilter: type
            };
        default:
            return state;
    }
}

export default todoReducer;
