let num = 0;

const deleteAllCompletedTasks = () => {
    if (!confirm("Are you sure you want to delete all COMPLETED tasks?"))
        return;
    const tasks = document.getElementById("completedTasks");
    tasks.innerHTML = "";
}

const deleteAllTasks = () => {
    if (!confirm("Are you sure you want to delete ALL tasks?"))
        return;
    const tasks = document.getElementById("main");
    tasks.innerHTML = `
        <div class="uncompleted" id="uncompletedTasks">
            
        </div>
        <div class="completed" id="completedTasks">
            
        </div>`;
}

const getTemplate = (type, value, id) => {
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

const addNewTask = () => {
    num++;
    const input = document.forms.formMakeTask.makeTask;
    const task = input.value;
    input.value = "";
    const beginOfUncompleted = document.getElementById("uncompletedTasks");
    beginOfUncompleted.insertAdjacentHTML('afterbegin', getTemplate(0, task, num));
    return false;
}

const deleteTask = (id) => {
    const task = document.getElementById(id);
    task.outerHTML = "";
}

const makeCompleted = (id) => {
    const task = document.getElementById(id).firstElementChild.innerHTML;
    deleteTask(id);
    const beginOfCompleted = document.getElementById("completedTasks");
    beginOfCompleted.insertAdjacentHTML('afterbegin', getTemplate(1, task, id));
}

const makeUncompleted = (id) => {
    const task = document.getElementById(id).firstElementChild.innerHTML;
    deleteTask(id);
    const beginOfUncompleted = document.getElementById("uncompletedTasks");
    beginOfUncompleted.insertAdjacentHTML('afterbegin', getTemplate(0, task, id));
}