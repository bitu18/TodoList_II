const STORAGE_TODO_LIST = 'todos';

export default {
    get() {
        return JSON.parse(localStorage.getItem(STORAGE_TODO_LIST)) || [];
    },
    set(todos) {
        return localStorage.setItem(STORAGE_TODO_LIST, JSON.stringify(todos));
    }
}