let num = 0;

let deleteAllCompletedTasks = () => {
    if (!confirm("Are you sure you want to delete all COMPLETED tasks?"))
        return;
    let tasks = document.getElementById("completedTasks");
    tasks.innerHTML = "";
}

let deleteAllTasks = () => {
    if (!confirm("Are you sure you want to delete ALL tasks?"))
        return;
    let tasks = document.getElementById("main");
    tasks.innerHTML = `
        <div class="uncompleted" id="uncompletedTasks">
            
        </div>
        <div class="completed" id="completedTasks">
            
        </div>`
}

let getTemplate = (type, value, id) => {
    if (!type) {
        return `
                <div class="block" id="${id}">
                    <p class="taskText">${value}</p>
                    <div class="taskButtons">
                        <a class="taskButton" href="#" onclick="makeCompleted(this.parentNode.parentNode.id)">Complete</a>
                        <a class="taskButton" href="#" onclick="deleteTask(this.parentNode.parentNode.id)">Delete</a>
                    </div>
                </div>`;
    } else {
        return `<div class="block" id="${id}">
                    <p class="taskText">${value}</p>
                    <div class="taskButtons">
                        <a class="taskButton" href="#" onclick="makeUncompleted(this.parentNode.parentNode.id)">Uncomplete</a>
                        <a class="taskButton" href="#" onclick="deleteTask(this.parentNode.parentNode.id)">Delete</a>
                    </div>
                </div>`;
    }
}

let addNewTask = () => {
    num++;
    let input = document.forms.formMakeTask.makeTask;
    let task = input.value;
    input.value = "";
    let beginOfUncompleted = document.getElementById("uncompletedTasks");
    beginOfUncompleted.insertAdjacentHTML('afterbegin', getTemplate(0, task, num));
    return false;
}

let deleteTask = (id) => {
    let task = document.getElementById(id);
    task.outerHTML = "";
}

let makeCompleted = (id) => {
    let task = document.getElementById(id).firstElementChild.innerHTML;
    deleteTask(id);
    let beginOfCompleted = document.getElementById("completedTasks");
    beginOfCompleted.insertAdjacentHTML('afterbegin', getTemplate(1, task, id));
}

let makeUncompleted = (id) => {
    let task = document.getElementById(id).firstElementChild.innerHTML;
    deleteTask(id);
    let beginOfCompleted = document.getElementById("uncompletedTasks");
    beginOfCompleted.insertAdjacentHTML('afterbegin', getTemplate(0, task, id));
}