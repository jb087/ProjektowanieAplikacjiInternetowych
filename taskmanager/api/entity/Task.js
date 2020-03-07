class Task {

    constructor(id, taskName, taskContainerId, userId) {
        this.id = id;
        this.taskName = taskName;
        this.taskContainerId = taskContainerId;
        this.userId = userId;
    }

    static viewTask(id, taskName, taskContainerId, userId) {
        return {
            id: id,
            task: taskName,
            taskContainerId: taskContainerId,
            userId: userId
        }
    }
}

module.exports = Task;
