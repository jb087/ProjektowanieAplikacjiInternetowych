import React, {Component} from "react"
import FormTask from "./FormTask";
import TaskElement from "./TaskElement";

class TaskContainer extends Component {

    //TODO usunąć state do góry
    state = {
        tasks: []
    };

    render() {
        return (
            <div
                onDrop={this.drop}
                onDragOver={this.dragOver}
            >
                <h1>{this.props.title}</h1>
                {
                    this.state.tasks
                        .map(task =>
                            <TaskElement
                                key={task.id}
                                task={task}
                            />)
                }
                {this.props.formTaskHidden === "false" &&
                    <FormTask onSubmit={this.addTask} hidden={this.props.formTaskHidden}/>
                }
            </div>
        );
    }

    drop = event => {
        event.preventDefault();

        const taskElementId = event.dataTransfer.getData("taskElementId");
        const taskElement = document.getElementById(taskElementId);
        taskElement.style.display = "block";

        this.removeTask(taskElementId);

        this.addTask({
            task: taskElement.innerHTML,
            id: taskElementId
        })
    };

    dragOver = event => {
        event.preventDefault();
    };

    addTask = task => {
        const tasks = [...this.state.tasks];
        tasks.push(task);
        this.setState({tasks: tasks});
    };

    removeTask = taskId => {
        const tasks = [...this.state.tasks].filter(task => !task.id.includes(taskId));
        this.setState({tasks: tasks});
        console.log(this.state.tasks);
    };
}

export default TaskContainer;
