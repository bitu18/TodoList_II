import html from '../core.js';
import TodoItem from './TodoItem.js';
import {connect} from '../store.js'


function Footer({todos, filters}) {
    const count = todos.filter(filters.active).length; // todos.filter(todo => !todo.completed).length;
    const countFormat = 'item' + (count <= 1 ? '' : 's') + ' left';
    return html `
        <footer class="footer">
            <span class="todo-count">
                <strong>${count}</strong> ${countFormat}
            </span>
            ${todos.some(filters.completed) > 0 &&    // ${todos.some(todo => todo.completed) > 0}
                html `
                    <button
                    class="clear-completed"
                    onclick="dispatch('CLEAR_ALL_COMPLETED')"
                    >
                    Clear completed
                    </button>
            `}
                
        </footer>
    `
}

export default connect()(Footer);