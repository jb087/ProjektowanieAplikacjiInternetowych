import React, {Component} from "react"
import Button from "react-bootstrap/Button";
import TaskModalEditor from "./TaskModalEditor";
import ApiClient from "../../../client/ApiClient";
import "./TaskElement.css"

class TaskElement extends Component {

    state = {
        showModal: false,
        task: this.props.task
    };

    render() {
        return (
            <div
                className="TaskElement"
                onDragStart={this.dragStart}
                onDragOver={this.dragOver}
                draggable={true}
            >
                <p id={this.state.task.id}>{this.state.task.task}</p>
                <Button
                    className="Button"
                    variant="outline-danger"
                    onClick={() => this.props.removeTask(this.state.task.id)}
                >
                    Delete
                </Button>
                <Button
                    className="Button"
                    variant="outline-primary"
                    onClick={this.handleShow}
                >
                    Edit
                </Button>
                <TaskModalEditor
                    showModal={this.state.showModal}
                    handleClose={this.handleClose}
                    onSaveChanges={this.onSaveChanges}
                    task={this.state.task}
                />
            </div>
        );
    }

    dragStart = event => {
        event.dataTransfer.setData("taskElementId", this.state.task.id);
    };

    dragOver = event => {
        event.stopPropagation();
    };

    handleShow = () => {
        this.setState({showModal: true});
    };

    handleClose = () => {
        this.setState({showModal: false});
    };

    onSaveChanges = newTaskValue => {
        let task = this.state.task;
        task.task = newTaskValue;

        ApiClient.updateTask(this.props.login, task);

        this.props.addTask(task);

        this.setState({
            showModal: false,
            task: task
        });
    };
}

export default TaskElement;
