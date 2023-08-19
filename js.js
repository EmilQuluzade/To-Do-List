let tasks = [];
const newTask = document.querySelector('#input-text');
const addTask = document.querySelector('#submit-text');
const taskList = document.querySelector('.tasks');
const placeHolder = document.querySelector('.placeholder');
addTask.addEventListener("click", function (event) { event.preventDefault(); addingTask(); });
document.addEventListener('DOMContentLoaded', contentfromLocalstorage);

function contentfromLocalstorage() {
    const itemsfromLocalStorage = localStorage.getItem('tasks');
    if (itemsfromLocalStorage) {
        tasks = JSON.parse(itemsfromLocalStorage);
        displayingtasks();
    }
}

function addingTask() {
    placeHolder.style.display = 'none'
    const taskName = newTask.value;
    tasks.push(taskName);
    newTask.value = '';
    displayingtasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayingtasks() {
    taskList.innerHTML = '';

    tasks.length===0 ? placeHolder.style.display = 'block' : placeHolder.style.display = 'none' ;
    for (let i = tasks.length - 1; i >= 0; i--) {
        const taskItem = document.createElement('div');
        taskItem.className = 'tasklook';
        taskItem.innerText = tasks[i];
        taskList.appendChild(taskItem);

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = "edit-button";
        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = "delete-button";
        deleteButton.innerText = 'Delete';
        taskItem.appendChild(deleteButton);
        deleteButton.addEventListener("click", function () { deleteButtonClick(i); });
        taskItem.appendChild(deleteButton);

        editButton.addEventListener("click", function () {
            editMode(i, taskItem);
        });
    }
}

function editMode(index, taskItem) {
    taskItem.innerHTML= '' ;
    const taskContent = tasks[index];
    const editInput = document.createElement('input');
    editInput.className = "edit-input";
    taskItem.appendChild(editInput);
    

    const saveChagnesbutton = document.createElement('button');
    saveChagnesbutton.className = "saved-button";
    saveChagnesbutton.innerText = "Save";
    taskItem.appendChild(saveChagnesbutton);

    editInput.value = taskContent;

    saveChagnesbutton.addEventListener('click', function () {
        saveChanges(index, editInput.value);
    });

    editInput.addEventListener('keyup', function (e) {
        if (e.key === "Enter") {
            saveChanges(index, editInput.value);
        }
    });

    editInput.focus();
}

function saveChanges(index, editedText) {
    tasks[index] = editedText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayingtasks();
}

function deleteButtonClick(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayingtasks();
}
