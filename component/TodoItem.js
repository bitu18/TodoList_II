import html from '../core.js';
import { connect } from '../store.js';

function TodoItem({ todo, index, editIndex }) {
    return html`
        <div class="row px-3 align-items-center todo-item ${todo.completed && 'editing'} rounded">
            <div class="col-auto m-1 p-0 d-flex align-items-center">
                <h2 class="m-0 p-0">
                    <input
                    type="checkbox"
                    class="input-check"
                    ${todo.completed && 'checked'}
                    onchange="dispatch('TOGGLE', '${todo.id}')" 
                    >
                </h2>
            </div>
            <div class="col px-1 m-1 d-flex align-items-center wrapper-item">
                <label class="label-content 
                ${todo.completed && 'disabled'}"
                ondblclick="dispatch('START_EDIT', '${todo.id}')"
                >
                    ${todo.title}
                </label>
                <input 
                type="text" class="form-control form-control-lg border-0 edit-todo-input rounded px-3 
                ${!(todo.id === editIndex) && 'd-none'}" 
                value="${todo.title}"
                onkeyup="event.keyCode === 13 && dispatch('END_EDIT', this.value.trim()) || 
                         event.keyCode === 27 && dispatch('CANCEL_EDIT')"
                onblur="dispatch('END_EDIT', this.value.trim())"
                />
            </div>
            <div class="col-auto m-1 p-0 px-3 d-none">
            </div>
            <div class="col-auto m-1 p-0 todo-actions">
                <div class="row d-flex align-items-center justify-content-end date_infor">
                    <h5 class="m-0 p-0 px-2 edit-icon" onclick="dispatch('START_EDIT', '${todo.id}')">
                        <i class="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Edit todo"></i>
                    </h5>
                    <h5 class="m-0 p-0 px-2 delete-icon" onclick="dispatch('DELETE', '${todo.id}')">
                        <i class="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Delete todo"></i>
                    </h5>
                </div>
                <div class="row todo-created-info">
                    <div class="col-auto d-flex align-items-center pr-2">
                        <i class="fa fa-info-circle px-2 text-black-50 btn date_circle_icon" data-toggle="tooltip" data-placement="bottom" title="Created date"></i>
                        <label class="date-label text-black-50">${todo.date}</label>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export default connect()(TodoItem);
