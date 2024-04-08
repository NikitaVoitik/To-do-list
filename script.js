let tasks = [];
let completedTasks = [];

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

if (localStorage.getItem("completedTasks")) {
    completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
}

let uniqueId = tasks.length + completedTasks.length;

$(document).ready(function () {
    tasks.forEach(function (task) {
        $("#uncompletedTasks").prepend(getTemplate(task));
    });
    completedTasks.forEach(function (task) {
        $("#completedTasks").prepend(getTemplate(task));
    });
    $(document).keydown(function (event) {
        if (event.code === 'Enter') {
            addNewTask()
        }
    });
});

function Task(value, date, id) {
    if (typeof (date) == 'object') {
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day.toString();
        }
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month.toString();
        }
        const year = date.getFullYear();
        date = `${day}.${month}.${year}`;
    }
    this.value = value;
    this.date = date;
    this.id = id;
}

const getTemplate = (task) => {
    return `
            <div class="block flex" id="${task.id}">
                <div>
                    <p class="date" id="date">${task.date}</p>
                    <p class="taskText">${task.value}</p>
                </div>
                <div class="taskButtons flex">
                    <a class="taskButton" href="#" onclick="makeCompleted(${task.id})">Complete</a>
                    <a class="taskButton" href="#" onclick="deleteTask(${task.id})">Delete</a>
                </div>
            </div>`;
}

const addNewTask = function () {
    const inputValue = $('#makeTask').val();
    const task = new Task(inputValue, new Date(), uniqueId);
    $('#makeTask').val(null);
    if ($.trim(inputValue) === '') {
        return false;
    }
    uniqueId++;
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    $("#uncompletedTasks").prepend(getTemplate(task));
}

const deleteTask = function (id) {
    const tasksIndex = tasks.findIndex(task => task.id === id);
    if (tasksIndex !== -1) {
        $("#" + id).remove();
        tasks.splice(tasksIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        const completedTasksIndex = completedTasks.findIndex(task => task.id === id);
        if (completedTasksIndex !== -1) {
            $("#" + id).remove();
            completedTasks.splice(completedTasksIndex, 1);
            localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        }
    }
}

const makeCompleted = function (id) {
    const tasksIndex = tasks.findIndex(task => task.id === id);
    if (tasksIndex !== -1) {
        const task = tasks[tasksIndex];
        deleteTask(id);
        completedTasks.push(task);
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        const template = getTemplate(task).replace('makeCompleted', 'makeUncompleted').replace('Complete', 'Uncomplete');
        $("#completedTasks").prepend(template);
    }
}

const makeUncompleted = function (id) {
    const completedTasksIndex = completedTasks.findIndex(task => task.id === id);
    if (completedTasksIndex !== -1) {
        const task = completedTasks[completedTasksIndex];
        completedTasks.splice(completedTasksIndex, 1);
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        $("#" + id).remove();
        const template = getTemplate(task).replace('makeUncompleted', 'makeCompleted').replace('Uncomplete', 'Complete');
        $("#uncompletedTasks").prepend(template);
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Added deleteAllTasks and deleteAllCompletedTasks functions
const deleteAllTasks = function () {
    tasks = [];
    completedTasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    $("#uncompletedTasks").empty();
    $("#completedTasks").empty();
}


const deleteAllCompletedTasks = function () {
    completedTasks = [];
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    $("#completedTasks").empty();
}