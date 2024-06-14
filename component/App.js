import html from '../core.js';
import Header from './Header.js';
import Options from './Options.js';
import Todolist from './Todolist.js';
import Footer from './Footer.js';
import {connect} from '../store.js';

function App({todos}) {
    return html `
    <div class="container m-5 p-2 rounded mx-auto bg-light shadow">
        ${Header()}
        ${todos.length > 0 && Options()}
        ${Todolist()}
        ${todos.length > 0 && Footer()}
    <div>
    `

}
export default connect()(App);