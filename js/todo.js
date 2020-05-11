"use strict";

// render TODO list items
function renderList( list ) {
    const listPlace = document.querySelector('.container');
    let HTML = '';

    for ( let i=0; i<list.length; i++ ) {
        const todoItem = list[i];
        HTML += `
            <div class="item">
                <div class="status ${todoItem.status}"></div>
                <p class="description">${todoItem.description}</p>
                <div class="deadline">${todoItem.deadline}</div>
                <div class="actions">
                    <div class="action remove">Remove</div>
                </div>
            </div>`;
    }

    return listPlace.innerHTML += HTML;
}



/*******************************
    GENERATE CONTENT
*******************************/
renderList(todo_list);


/*******************************
    REMOVE SINGLE TODO ITEM
*******************************/
const removeActions = document.querySelectorAll('.item .action.remove');

for ( let i=0; i<removeActions.length; i++ ) {
    const removeElement = removeActions[i];
    removeElement.addEventListener('click', actionRemoveTodoItem);
}

function actionRemoveTodoItem( event ) {
    const parentItem = event.target.closest('.item');
    parentItem.remove();
}

/*******************************
    REMOVE ALL TODO ITEMS
*******************************/
const BTNremoveAll = document.querySelector('.global-actions > .action.remove');

BTNremoveAll.addEventListener('click', actionRemoveAllTodoItems);

function actionRemoveAllTodoItems( event ) {
    const allTodoItems = event.target
                            .closest('.container')
                            .querySelectorAll('.item');
    
    for ( let i=0; i<allTodoItems.length; i++ ) {
        allTodoItems[i].remove();
    }
}

/*******************************
    FORM ACTIONS
*******************************/
const DOMform = document.querySelector('.form');
const DOMtaskTextarea = DOMform.querySelector('textarea[name="task"]');
const DOMdeadlineInput = DOMform.querySelector('input[name="deadline"]');
const DOMformActions = DOMform.querySelector('.actions');
const DOMformAdd = DOMformActions.querySelector('.btn.add');
const DOMformClear = DOMformActions.querySelector('.btn.clear');

DOMdeadlineInput.value = formatedDate( 86400000 );             // 24*60*60*1000

DOMformClear.addEventListener('click', clearForm);

function clearForm() {
    DOMtaskTextarea.value = '';
    DOMdeadlineInput.value = '';
}

DOMformAdd.addEventListener('click', addNewTodoItem);

function addNewTodoItem() {
    let newTodo = {
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