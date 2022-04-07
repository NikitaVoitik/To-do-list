let num = 0;

window.onload = () => {
    document.addEventListener('keydown', () => {
        if (event.code === 'Enter') {
            addNewTask()
        }
    });
}

function Task(value, date) {
    if (typeof (date) == 'object') {
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day.toString();
        }
        let month = date.getMonth();
        if (month < 10) {
            month = '0' + month.toString();
        }
        const year = date.getFullYear();
        date = `${day}.${month}.${year}`;
    }
    this.value = value;
    this.date = date;
}

const deleteAllCompletedTasks = () => {
    const tasks = document.getElementById("completedTasks");
    tasks.innerHTML = null;
}

const deleteAllTasks = () => {
    num = 0;
    const tasks = document.getElementById("main");
    tasks.innerHTML = `
                       <div class="uncompleted" id="uncompletedTasks">
                       </div>
                       <div class="completed" id="completedTasks">  
                       </div>
                      `;
}

const getTemplate = (task, id) => {
    return `
            <div class="block flex" id="${id}">
                <div>
                    <p class="date" id="date">${task.date}</p>
                    <p class="taskText">${task.value}</p>
                </div>
                <div class="taskButtons flex">
                    <a class="taskButton" href="#" onclick="makeCompleted(this.parentNode.parentNode.id)">Complete</a>
                    <a class="taskButton" href="#" onclick="deleteTask(this.parentNode.parentNode.id)">Delete</a>
                </div>
            </div>
           `;
}

const addNewTask = () => {
    const input = document.getElementById('makeTask');
    const task = new Task(input.value, new Date());
    input.value = null;
    let empty = true;
    for (let char of task.value) {
        if (char !== ' ') {
            empty = false;
            break;
        }
    }
    if (empty) {
        return false;
    }
    num++;
    const beginOfUncompleted = document.getElementById("uncompletedTasks");
    beginOfUncompleted.insertAdjacentHTML('afterbegin', getTemplate(task, num));
    return false;
}

const deleteTask = (id) => {
    const task = document.getElementById(id);
    task.outerHTML = null;
}

const makeCompleted = (id) => {
    const information = document.getElementById(id).firstElementChild.children;
    const task = new Task(information[1].innerHTML, information[0].innerHTML);
    console.log(task);
    deleteTask(id);
    const beginOfCompleted = document.getElementById("completedTasks");
    beginOfCompleted.insertAdjacentHTML('afterbegin', getTemplate(task, id));
}

const makeUncompleted = (id) => {
    const information = document.getElementById(id).firstElementChild.children;
    const task = new Task(information[1].innerHTML, information[0].innerHTML);
    console.log(task);
    deleteTask(id);
    const beginOfUncompleted = document.getElementById("uncompletedTasks");
    beginOfUncompleted.insertAdjacentHTML('afterbegin', getTemplate(task, id));
}