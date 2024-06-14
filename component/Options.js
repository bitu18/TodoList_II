import html from '../core.js';
import { connect } from '../store.js';

function Options({filter, filters, dateSort, sortDateOptions, alphabetSort}) {
    return html `
        <div class="row m-1 p-3 px-5 option_wrapper">
            <div class="col-auto d-flex align-items-center filter_wrapper">
                <label class="text-secondary my-2 pr-2 view-opt-label">Filter</label>
                <select id="filter" class="custom-select custom-select-sm btn my-2" 
                onchange="dispatch('SWITCH_FILTER', this.value)">
                    ${Object.keys(filters).map((type) => html 
                            `<option class="select-option"
                            value="${type}"
                            ${filter === type && 'selected'}>
                                ${type[0].toUpperCase() + type.slice(1)}
                            </option>`
                    )}
                </select>
            </div>
            <div class="col-auto d-flex align-items-center px-1 pr-3 sort_wrapper">
                <label class="text-secondary my-2 pr-2 view-opt-label">Sort</label>
                <select class="custom-select custom-select-sm btn my-2"
                onchange="dispatch('SWITCH_SORT', this.value)">
                    ${Object.keys(sortDateOptions).map(type => html
                            `<option value="${type}" ${dateSort === type && 'selected'}>
                            ${type[0].toUpperCase() + type.slice(1)}
                            </option>`
                        )}
                </select>
                ${alphabetSort === 'ascending' ? 
                    html `
                        <i id="ascending" class="fa fa fa-sort-amount-asc text-info btn mx-0 px-0 pl-1 sort-icon" 
                        data-toggle="tooltip" data-placement="bottom" 
                        title="ascending"
                        onclick="dispatch('TOGGLE_ALPHA_SORT', this.title)"></i>` : 
                    html `
                        <i id="descending" class="fa fa fa-sort-amount-desc text-info btn mx-0 px-0 pl-1 sort-icon" 
                        data-toggle="tooltip" data-placement="bottom" 
                        title="descending"
                        onclick="dispatch('TOGGLE_ALPHA_SORT', this.title)"></i>`
                }
            </div>
        </div>
    `
}

export default connect()(Options);