"use strict";
let todo_id = 0;
let todo_list = [];

const DOMcontainer = document.querySelector('.container');

const DOMglobals = DOMcontainer.querySelector('.global-actions');
const BTNremoveAll = DOMglobals.querySelector('.action.remove');

const DOMform = DOMcontainer.querySelector('.form');
const DOMtaskTextarea = DOMform.querySelector('textarea[name="task"]');
const DOMswitchStatus = DOMform.querySelector('.switch');
const DOMdeadlineInput = DOMform.querySelector('input[name="deadline"]');
const DOMformActions = DOMform.querySelector('.actions');
const DOMformAdd = DOMformActions.querySelector('.btn.add');
const DOMformClear = DOMformActions.querySelector('.btn.clear');
const DOMformSave = DOMformActions.querySelector('.btn.save');
const DOMformCancel = DOMformActions.querySelector('.btn.cancel');

let DOMitems = null;

function renderList( list ) {
    for ( let i=0; i<list.length; i++ ) {
        renderTodoItem( list[i] );
    }
}

function renderTodoItem( data ) {
    const id = 'todo_'+data.id;
    const HTML = `
        <div class="item" id="${id}">
            <div class="status ${data.status}"></div>
            <p class="description">${data.description}</p>
            <div class="deadline">${data.deadline}</div>
            <div class="actions">
                <div class="action remove">Remove</div>
                <div class="action edit">Edit</div>
            </div>
        </div>`;
    
    DOMcontainer.insertAdjacentHTML('beforeend', HTML);
    DOMitems = DOMcontainer.querySelectorAll('.item');

    const item = DOMcontainer.querySelector('#'+id);
    
    // registruojame event listener'i
    item.querySelector('.action.remove')
        .addEventListener('click', () => {
            let currentlyAddedItemIndex = 0;

            // randu kelintas siuo metu sarase yra norimas mano TODO item
            for ( let i=0; i<DOMitems.length; i++ ) {
                if ( DOMitems[i].id === id ) {
                    currentlyAddedItemIndex = i;
                    break;
                }
            }

            removeTodo( currentlyAddedItemIndex );
        });

    item.querySelector('.action.edit')
        .addEventListener('click', () => {
            DOMform.classList.add('editing');
        });
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
    for ( let i=DOMitems.length-1; i>=0; i-- ) {
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
    updateMemory();
    return;
}

function createNewTodo() {
    let newTodo = {
        id: todo_id,
        description: DOMtaskTextarea.value.trim(),
        created_on: formatedDate(),
        deadline: DOMdeadlineInput.value.trim(),
        status: 'todo'
    };

    if ( newTodo.description.length === 0 ) {
        return alert('ERROR: tuscias aprasymas');
    }
    
    if ( newTodo.deadline.length > 0 &&
        (new Date(newTodo.deadline)).toString() === 'Invalid Date' ) {
        return alert('ERROR: nevalidus deadline');
    }
    
    todo_list.push( newTodo );
    renderTodoItem( newTodo );
    todo_id++;
    updateMemory();
}

function updateSwitch( event ) {
    const value = event.target.dataset.option;
    event.target.parentElement.setAttribute('data-selected', value);
}

/*******************************
    MEMORY MANAGEMENT
*******************************/

function memoryManagement() {
    if ( localStorage.getItem('todo_id') ) {
        // jei yra, tai is localStorage istraukiu esama reiksme ir ja priskiriu todo_id
        todo_id = JSON.parse( localStorage.getItem('todo_id') );
    } else {
        // jei localStorage nera todo_id, tai ji sukuriu ir priskiriu reiksme 0
        localStorage.setItem('todo_id', JSON.stringify(todo_id));
    }

    
    if ( localStorage.getItem('todo_list') ) {
        // jei yra, tai is localStorage istraukiu esama reiksme ir ja priskiriu todo_list
        todo_list = JSON.parse( localStorage.getItem('todo_list') );
    } else {
        // jei localStorage nera todo_list, tai ji sukuriu ir priskiriu reiksme []
        localStorage.setItem('todo_list', JSON.stringify(todo_list));
    }
}

function updateMemory() {
    localStorage.setItem('todo_id', JSON.stringify(todo_id));
    localStorage.setItem('todo_list', JSON.stringify(todo_list));
}

memoryManagement();

/*******************************
    GENERATE CONTENT
*******************************/
renderList(todo_list);

DOMdeadlineInput.value = formatedDate( 86400000 );

/*******************************
    INIT ACTIONS
*******************************/

BTNremoveAll.addEventListener('click', removeAllTodos);

DOMformAdd.addEventListener('click', createNewTodo);

DOMswitchStatus.addEventListener('click', updateSwitch);

DOMformCancel.addEventListener('click', () => {
    DOMform.classList.remove('editing');
})