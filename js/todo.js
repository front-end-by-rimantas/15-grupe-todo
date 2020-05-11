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

renderList(todo_list);

const removeActions = document.querySelectorAll('.item .action.remove');

for ( let i=0; i<removeActions.length; i++ ) {
    const removeElement = removeActions[i];
    removeElement.addEventListener('click', actionRemoveTodoItem);
}

function actionRemoveTodoItem( event ) {
    const parentItem = event.target.closest('.item');
    parentItem.remove();
}