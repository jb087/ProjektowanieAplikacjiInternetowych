import React, {Component} from "react"
import FormTask from "./FormTask";
import TaskElement from "./TaskElement";

class TaskContainer extends Component {

    render() {
        return (
            <div
                onDrop={this.drop}
                onDragOver={this.dragOver}
            >
                <h1>{this.props.title}</h1>
                {
                    this.props.tasks
                        .filter(task => task.taskContainerId === this.props.id)
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
                    <FormTask
                        taskContainerId={this.props.id}
                        onSubmit={this.props.addTask}
                        hidden={this.props.formTaskHidden}
                    />
                }
            </div>
        );
    }

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
}

export default TaskContainer;
