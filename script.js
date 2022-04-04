let num = 0;

function Task(value, date) {
    if (typeof (date) == 'object') {
        let day = date.getDate();
        let month = date.getMonth();
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

const getTemplate = (type, task, id) => {
    if (!type) {
        //uncompleted task
        return `
                <div class="block" id="${id}">
                    <div>
                        <p class="date" id="date">${task.date}</p>              
                        <p class="taskText">${task.value}</p>
                    </div>
                    <div class="taskButtons">
                        <a class="taskButton" href="#" onclick="makeCompleted(this.parentNode.parentNode.id)">Complete</a>
                        <a class="taskButton" href="#" onclick="deleteTask(this.parentNode.parentNode.id)">Delete</a>
                    </div>
                </div>
               `;
    } else {
        //completed task
        return `
                <div class="block" id="${id}">
                    <div>
                        <p class="date" id="date">${task.date}</p>              
                        <p class="taskText">${task.value}</p>
                    </div>
                    <div class="taskButtons">
                        <a class="taskButton" href="#" onclick="makeUncompleted(this.parentNode.parentNode.id)">Uncomplete</a>
                        <a class="taskButton" href="#" onclick="deleteTask(this.parentNode.parentNode.id)">Delete</a>
                    </div>
                </div>
                `;
    }
}

const addNewTask = () => {
    const input = document.forms.formMakeTask.makeTask;
    const task = new Task(input.value, new Date());
    input.value = null;
    let empty = true;
    for (let char of task.value) {
        if (char !== ' ') {
            empty = false;
            break;
        }
    }
    if (empty){
        return false;
    }
    num++;
    const beginOfUncompleted = document.getElementById("uncompletedTasks");
    beginOfUncompleted.insertAdjacentHTML('afterbegin', getTemplate(0, task, num));
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
    beginOfCompleted.insertAdjacentHTML('afterbegin', getTemplate(1, task, id));
}

const makeUncompleted = (id) => {
    const information = document.getElementById(id).firstElementChild.children;
    const task = new Task(information[1].innerHTML, information[0].innerHTML);
    console.log(task);
    deleteTask(id);
    const beginOfUncompleted = document.getElementById("uncompletedTasks");
    beginOfUncompleted.insertAdjacentHTML('afterbegin', getTemplate(0, task, id));
}