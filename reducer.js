import storage from './unity/storage.js';
import dateFormat from './unity/date.js';

/* Unique Identifiers(Id): Assign a unique identifier to each todo item when it is created.
When we sort the list, the indexes change, while th index value of actions 'TOGGLE' and 'DELETE' 
use the original indexes, leading to mismatches.
The id must be in '...' because it is a string */
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/esm-browser/index.js'; // library


const init = {
    todos: storage.get(),
    date: null,
    filter: 'all',
    filters: {
        all: () => true,
        active: (todo) => !todo.completed,
        completed: (todo) => todo.completed,
        'has due date': (todo) => {
            const currentDate = dateFormat().rawDate;
            return !todo.completed && todo.rawDate >= currentDate;
        },
    },
    dateSort: 'all',
    sortDateOptions: {
        'all': () => true,
        // sort ascending (oldest to newest)
        'added date': (a, b) => new Date(a.rawDate) - new Date(b.rawDate),
        // sort descending (newest to oldest)
        'due date': (a, b) => new Date(b.rawDate) - new Date(a.rawDate)
        },
    alphabetSort: null,
    editIndex: null,
};

export default function reducer(action, state = init, args) {
    let updateTodos = [...state.todos];
    let updateDate = state.date;
    let updateFilter = state.filter;
    let updateDateSort = state.dateSort;
    let updateAlphaSort = state.alphabetSort;

    switch (action) {
        case 'ADD':
            const [title, fullDate] = args;
            let date;
            let rawDate;

            // If fullDate is provided, use it, otherwise, default to today's date
            if(fullDate) {
                date = dateFormat(fullDate);
                updateDate = date.formatDate;
                rawDate = date.rawDate;
            } else {
                date = dateFormat();
                updateDate = date.formatDate;
                rawDate = date.rawDate;
            }
            if (title) {
                updateTodos = [
                    ...state.todos,
                    {
                        id: uuidv4(),
                        title: title,
                        completed: false,
                        date: updateDate,
                        rawDate: rawDate,
                    },
                ];
            }
            break;
        case 'TOGGLE':
            const [index] = args;
            // updateTodos[index].completed = !updateTodos[index].completed;
            updateTodos = updateTodos.map(todo => 
                todo.id === index ? {...todo, completed: !todo.completed} : todo
            )   
            break;
        case 'DELETE':
            const [index_for_delete] = args;
            // updateTodos.splice(index_for_delete, 1);
            updateTodos = updateTodos.filter(todo => todo.id !== index_for_delete);
            break;
        case 'START_EDIT':
            const [index_for_eidit] = args;
            state.editIndex = index_for_eidit;
            break;
        case 'END_EDIT':
            const [new_title] = args;
            if(new_title) {
                updateTodos = updateTodos.map(todo => 
                    todo.id === state.editIndex ? {...todo, title: new_title} : todo)
            } else {
                updateTodos = updateTodos.filter(todo => 
                    todo.id !== state.editIndex)
            }
            state.editIndex = null;
            break;
        case 'CANCEL_EDIT':
            state.editIndex = null;
            break;
        case 'SWITCH_FILTER':
            const [filterType] = args;
            updateFilter = filterType;
            break;
        case 'SWITCH_SORT':
            const [sortType] = args;
            updateDateSort = sortType;
            break;
        case 'TOGGLE_ALPHA_SORT':
            const [alplaSortType] = args;
            updateAlphaSort = alplaSortType === 'ascending' ? 'descending' : 'ascending';
            break;
        case 'CLEAR_ALL_COMPLETED':
            updateTodos = updateTodos.filter(todo => !todo.completed);
            break;
        default:
            return state;
    }
    storage.set(updateTodos);
    return {
        ...state,
        todos: updateTodos,
        date: updateDate,
        filter: updateFilter,
        dateSort: updateDateSort,
        alphabetSort: updateAlphaSort,
    };
}
