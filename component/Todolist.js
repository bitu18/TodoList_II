import html from '../core.js';
import TodoItem from './TodoItem.js';
import {connect} from '../store.js'


function Todolist({todos, filter, filters, dateSort, sortDateOptions, alphabetSort}) {
        const sortTodos = todos.filter(filters[filter])
                               .sort(sortDateOptions[dateSort]);;

        if(alphabetSort === 'ascending') {
            sortTodos.sort((a,b) => a.title.localeCompare(b.title));
        } 
        else if (alphabetSort === 'descending') { 
            sortTodos.sort((a,b) => b.title.localeCompare(a.title));
        }
        
    return html `
    <div class="row mx-1 px-5 pb-3 w-80 content_wrapper">
        <div class="col mx-auto">
            ${sortTodos
                // .filter(filters[filter])
                // .sort(sortDateOptions[dateSort])
                .map((todo, index) => TodoItem({todo, index}))}
        </div>
    </div>
    `
}

export default connect()(Todolist);