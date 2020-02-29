import React, {Component} from "react"
import Button from "react-bootstrap/Button";
import TaskModalEditor from "./TaskModalEditor";

class TaskElement extends Component {

    state = {
        showModal: false,
        task: this.props.task
    };

    render() {
        return (
            <div
                onDragStart={this.dragStart}
                onDragOver={this.dragOver}
                draggable={true}
            >
                <p id={this.state.task.id}>{this.state.task.task}</p>
                <Button
                    variant="danger"
                    onClick={() => this.props.removeTask(this.state.task.id)}
                >
                    Delete
                </Button>
                <Button variant="primary" onClick={this.handleShow}>Edit</Button>
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
        this.props.addTask(task);

        this.setState({
            showModal: false,
            task: task
        });
    };
}

export default TaskElement;
