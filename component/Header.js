import html from '../core.js';
import { connect } from '../store.js';

function Header({todos}) {
    return html`
        <div class="row m-1 p-4">
            <div class="col">
                <div class="p-1 h1 text-primary text-center mx-auto display-inline-block header_wrapper">
                    <i class="fa fa-check bg-primary text-white rounded p-2"></i>
                    <u class="header_title">My Todo-s</u>
                </div>
            </div>
        </div>
        <div class="row m-1 p-3">
            <div class="col col-11 mx-auto">
                <div class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                    <div class="col">
                        <input
                            id="todo-input"
                            class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                            type="text"
                            placeholder="Add new .."
                            autofocus
                            onkeyup="event.keyCode === 13 && dispatch('ADD', this.value.trim(), document.getElementById('date').value || null)"
                        >
                    </div>
                    <div class="col-auto m-0 px-2 d-flex align-items-center due-date-container">
                        <label class="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Due date not set</label>
                        <input type="date" id="date">
                    </div>
                    <div class="col-auto px-0 mx-0 mr-2">
                        <button
                            type="button"
                            class="btn btn-primary header_add"
                            onclick="dispatch('ADD', document.getElementById('todo-input').value.trim(), document.getElementById('date').value || null)"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
        ${todos.length > 0 && '<div class="p-2 mx-4 border-black-25 border-bottom"></div>'}
        
    `;
}

export default connect()(Header);
