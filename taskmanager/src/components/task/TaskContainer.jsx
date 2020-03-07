import React, {Component} from "react"
import TaskForm from "./TaskForm";
import TaskElement from "./TaskElement";
import ApiClient from "../../client/ApiClient";

class TaskContainer extends Component {

    render() {
        return (
            <div
                onDrop={this.drop}
                onDragOver={this.dragOver}
            >
                <h1>{this.props.title + ": " + this.taskCount()}</h1>
                {
                    this.props.tasks
                        .filter(task => task.taskContainerId === this.props.id)
                        .sort((a, b) => this.compareTasks(a, b))
                        .map(task =>
                            <TaskElement
                                key={task.id}
                                task={task}
                                login={this.props.login}
                                addTask={this.props.addTask}
                                removeTask={this.props.removeTask}
                            />)
                }
                {
                    this.props.formTaskHidden === "false" &&
                    <TaskForm
                        taskContainerId={this.props.id}
                        onSubmit={this.props.addTask}
                        hidden={this.props.formTaskHidden}
                        login={this.props.login}
                    />
                }
            </div>
        );
    }

    compareTasks = (a, b) => {
        if (a.task < b.task) {
            return -1;
        }
        if (a.task > b.task) {
            return 1;
        }
        return 0;
    };

    drop = event => {
        event.preventDefault();

        const taskElementId = event.dataTransfer.getData("taskElementId");
        const taskElement = document.getElementById(taskElementId);
        taskElement.style.display = "block";

        const task = {
            id: taskElementId,
            task: taskElement.innerHTML,
            taskContainerId: this.props.id
        };

        ApiClient.updateTask(this.props.login, task);

        this.props.addTask(task);
    };

    dragOver = event => {
        event.preventDefault();
    };

    taskCount = () => {
        return this.props.tasks
            .filter(task => task.taskContainerId === this.props.id)
            .length;
    };
}

export default TaskContainer;
