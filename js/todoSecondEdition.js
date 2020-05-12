"use strict";

const DOMcontainer = document.querySelector('.container');

const DOMglobals = DOMcontainer.querySelector('.global-actions');
const BTNremoveAll = DOMglobals.querySelector('.action.remove');

const DOMform = DOMcontainer.querySelector('.form');
const DOMtaskTextarea = DOMform.querySelector('textarea[name="task"]');
const DOMdeadlineInput = DOMform.querySelector('input[name="deadline"]');
const DOMformActions = DOMform.querySelector('.actions');
const DOMformAdd = DOMformActions.querySelector('.btn.add');
const DOMformClear = DOMformActions.querySelector('.btn.clear');

let DOMitems = null;

function renderList( list ) {
    for ( let i=0; i<list.length; i++ ) {
        renderTodoItem( list[i] );
    }
}

function renderTodoItem( data ) {
    const HTML = `
        <div class="item">
            <div class="status ${data.status}"></div>
            <p class="description">${data.description}</p>
            <div class="deadline">${data.deadline}</div>
            <div class="actions">
                <div class="action remove">Remove</div>
            </div>
        </div>`;
    
    DOMcontainer.insertAdjacentHTML('beforeend', HTML);
    DOMitems = DOMcontainer.querySelectorAll('.item');
    return;
}

function formatedDate( deltaTime = 0 ) {
    let now = new Date();

    if ( deltaTime !== 0 ) {
        now = new Date( Date.now() + deltaTime );
    }

    let minutes = now.getMinutes();
    let hours = now.getHours();
    let days = now.getDate();
    let month = now.getMonth() + 1;
    const year = now.getFullYear();
    
    if ( minutes < 10 ) {
        minutes = '0'+minutes;
    }
    if ( hours < 10 ) {
        hours = '0'+hours;
    }
    if ( days < 10 ) {
        days = '0'+days;
    }
    if ( month < 10 ) {
        month = '0'+month;
    }

    return year+'-'+month+'-'+days+' '+hours+':'+minutes;
}

function removeAllTodos() {
    for ( let i=4-1; i>=0; i-- ) {
        removeTodo(i);
    }
}

function removeTodo( todoIndex ) {
    // remove item from DOM
    DOMitems[todoIndex].remove();
    DOMitems = DOMcontainer.querySelectorAll('.item');

    // remove item from todo_list (global variable)
    let leftTodos = [];
    for ( let i=0; i<todo_list.length; i++ ) {
        if ( i !== todoIndex ) {
            leftTodos.push( todo_list[i] );
        }
    }
    todo_list = leftTodos;
    return;
}

/*******************************
    GENERATE CONTENT
*******************************/
renderList(todo_list);

DOMdeadlineInput.value = formatedDate( 86400000 );

/*******************************
    INIT ACTIONS
*******************************/

BTNremoveAll.addEventListener('click', removeAllTodos);