var TodoList, Task;
/**
 * Task
 * 
 * Task = {
 *     id:
 *     datatime:
 *     content:
 *     priority:
 *     progress:
 * }
 */
Task = function (option) {
    var defaultOption = {
        priority: 'low', // high | middle | low
        progress: 'doing', // todo | doing | done
        content: 'task task task task task task task takst taskt task task'
    }
    if (typeof option === 'string') {
        this.content = option;
        this.priority = defaultOption.priority;
        this.progress = defaultOption.progress;
    } else if (typeof option === 'object') {
        this.priority = option.priority || defaultOption.priority;
        this.progress = option.progress || defaultOption.progress;
        this.content = option.content || defaultOption.content;
    }
    this.datetime = new Date();
    this.id = Math.floor(Math.random() * 900) + 100;
}

function createRandomTask () {
    var priorities = ['high', 'middle', 'low'];
    var progresses = ['todo', 'doing', 'done'];
    var option = {
        priority: priorities[Math.floor(Math.random() * 3)],
        progress: progresses[Math.floor(Math.random() * 3)],
        content: 'weffsacfefw efdsafe tewqrq'
    }
    return new Task(option);
}

/**
 * TaskList
 */
TodoList = function () {
    this.list = [];
}

TodoList.prototype.add = function (task) {
    this.list.push(task);
}

TodoList.prototype.delete = function (task) {
    
}

TodoList.prototype.get = function (task) {

}

TodoList.prototype.filter = function (option) {

}

TodoList.prototype.getFirst = function () {

}