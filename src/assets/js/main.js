let todoItemsToDoStorage = JSON.parse(localStorage.getItem('todo')) || []
let completedToDoStorage = JSON.parse(localStorage.getItem("completedTodo")) || [];
let inProgressToDoStorage = JSON.parse(localStorage.getItem("inProgressTodo")) || [];
const todoContent = document.querySelector('#todo-content');
const todoCompletedContent = document.querySelector("#todo-completed-content")
const todoInProgressContent = document.querySelector("#todo-inprogress-content")
const addButton = document.querySelector('#todo-submit-button');
let todoCompleted = document.getElementsByClassName('completed-todo');
let rollBackToDo = document.getElementsByClassName('rollback');
let inProgressButton = document.getElementsByClassName('inprogress-todo');

completedToDo();
saveToDo();
inProgressToDo();
getInProgress();

function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

function init() {
    let openMenu = document.getElementById("open-menu");
    let bodyOverlay = document.getElementById("body-overlay")
    openMenu && openMenu.addEventListener("click", toggleMenu);
    bodyOverlay && bodyOverlay.addEventListener("click", toggleMenu);
}

function toggleMenu() {
    let ele = document.getElementsByTagName('body')[0];
    if (!hasClass(ele, "menu-open")) {
        addClass(ele, "menu-open");
    } else {
        removeClass(ele, "menu-open");
    }
}

document.addEventListener('readystatechange', function () {
    if (document.readyState === "complete") {
        init();
    }
});

function addToDo() {
    let todoTitleInput = document.querySelector(".todo-title-input").value;
    let newToDo = document.createElement("li");
    newToDo.className = 'todo-item d-flex align-items-center pt-4 mb-2';
    let todoItem = `
     <div class="d-flex w-100 justify-content-between todo-item-border">
     <div>
     <span class="d-block todo-title">${todoTitleInput}</span>
     </div>
     <div class="edit-todo d-flex align-items-center">
     <img src="assets/images/inprogress.jpg" class="d-block inprogress-todo" width="55px">
     <img src="assets/images/completed.png" class="d-block completed-todo" width="55px">
     </div>
     </div>
     `
    todoItemsToDoStorage.push(todoTitleInput);
    localStorage.setItem('todo', JSON.stringify(todoItemsToDoStorage));
    newToDo.innerHTML = todoItem;
    todoContent.append(newToDo);
}

function saveToDo() {
    for (let i = 0; i < todoItemsToDoStorage.length; i++) {
        let newToDoSave = document.createElement("li");
        newToDoSave.className = 'todo-item d-flex align-items-center pt-4 mb-2';
        let todoItemSave = `
        <div class="d-flex w-100 justify-content-between todo-item-border">
        <div>
        <span class="d-block todo-title">${todoItemsToDoStorage[i]}</span>
        </div>
        <div class="edit-todo d-flex align-items-center">
        <img src="assets/images/inprogress.jpg" class="d-block inprogress-todo" width="55px">
        <img src="assets/images/completed.png" class="d-block completed-todo" width="55px">
        </div>
        </div>
        `
        newToDoSave.innerHTML = todoItemSave;
        todoContent && todoContent.append(newToDoSave);
    }
}


addButton && addButton.addEventListener("click", function () {
    addToDo();
})

for (let i = 0; i < todoCompleted.length; i++) {
    todoCompleted[i].addEventListener("click", function () {
        let txt = this.parentNode.parentNode.innerText;
        let el = this.parentNode.parentNode
        let ind = todoItemsToDoStorage.indexOf(txt);
        todoItemsToDoStorage.splice(ind, 1);
        localStorage.setItem("todo", JSON.stringify(todoItemsToDoStorage));
        inProgressToDoStorage.splice(ind, 1);   
        localStorage.setItem("inProgressTodo", JSON.stringify(inProgressToDoStorage));
        el.remove();
        completedToDoStorage.push(txt);
        localStorage.setItem('completedTodo', JSON.stringify(completedToDoStorage));
    })
}

function completedToDo() {
    for (let i = 0; i < completedToDoStorage.length; i++) {
        let complatedEl = document.createElement("li");
        complatedEl.className = 'todo-item d-flex align-items-center pt-4 mb-2';
        let completedTodo = `
            <div class="d-flex w-100 justify-content-between todo-item-border">
            <div>
            <span class="d-block todo-title">${completedToDoStorage[i]}</span>
            </div>
            <div class="edit-todo d-flex align-items-center">
            <img src="assets/images/rollback.webp" class="d-block rollback" width="25px">
            </div>
            </div>
            `
        complatedEl.innerHTML = completedTodo;
        todoCompletedContent && todoCompletedContent.prepend(complatedEl);
    }
}


for (let i = 0; i < rollBackToDo.length; i++) {
    rollBackToDo[i].addEventListener("click", function () {
        let txtRollBack = this.parentNode.parentNode.innerText;
        let indRollBack = completedToDoStorage.indexOf(txtRollBack);
        let el = this.parentNode.parentNode
        completedToDoStorage.splice(indRollBack, 1);
        localStorage.setItem('completedTodo', JSON.stringify(completedToDoStorage));
        todoItemsToDoStorage.push(txtRollBack);
        localStorage.setItem('todo', JSON.stringify(todoItemsToDoStorage));
        el.remove();
    });
};

function inProgressToDo() {
    for (let i = 0; i < inProgressButton.length; i++) {
        inProgressButton[i].addEventListener("click", function () {
            let inProgressText = this.parentNode.parentNode.innerText;
            let el = this.parentNode.parentNode;
            let ind = todoItemsToDoStorage.indexOf(inProgressText)
            todoItemsToDoStorage.splice(ind, 1);
            localStorage.setItem('todo', JSON.stringify(todoItemsToDoStorage));
            inProgressToDoStorage.push(inProgressText);
            localStorage.setItem("inProgressTodo", JSON.stringify(inProgressToDoStorage));
            el.remove();
        })
    }

}

function getInProgress() {
    for(let i = 0; i < inProgressToDoStorage.length; i++){
        let inProgressLi = document.createElement("li");
        inProgressLi.className = 'todo-item d-flex align-items-center pt-4 mb-2';
        let inProgressItem = `
            <div class="d-flex w-100 justify-content-between todo-item-border">
            <div>
            <span class="d-block todo-title">${inProgressToDoStorage[i]}</span>
            </div>
            <div class="edit-todo d-flex align-items-center">
            <img src="assets/images/completed.png" class="d-block completed-todo" width="55px">
            </div>
            </div>
            `
        inProgressLi.innerHTML = inProgressItem
        todoInProgressContent && todoInProgressContent.prepend(inProgressLi);
    }
}

