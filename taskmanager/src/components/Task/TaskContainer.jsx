import React, {Component} from "react"
import TaskForm from "./TaskForm";
import TaskElement from "./TaskElement";

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

        this.props.addTask({
            id: taskElementId,
            task: taskElement.innerHTML,
            taskContainerId: this.props.id
        })
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
