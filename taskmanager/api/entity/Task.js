class Task {

    constructor(id, taskName, taskContainerId, userId) {
        this.id = id;
        this.taskName = taskName;
        this.taskContainerId = taskContainerId;
        this.userId = userId;
    }
}

module.exports = Task;
