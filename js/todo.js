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
            </div>`;
    }

    return listPlace.innerHTML += HTML;
}

renderList(todo_list);