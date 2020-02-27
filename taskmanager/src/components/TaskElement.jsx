import React, {Component} from "react"
import Button from "react-bootstrap/Button";

class TaskElement extends Component {

    render() {
        return (
            <div
                onDragStart={this.dragStart}
                onDragOver={this.dragOver}
                draggable={true}
            >
                <p id={this.props.task.id}>{this.props.task.task}</p>
                <Button
                    variant="danger"
                    onClick={() => this.props.removeTask(this.props.task.id)}
                >
                    Delete
                </Button>
            </div>
        );
    }

    dragStart = event => {
        event.dataTransfer.setData("taskElementId", this.props.task.id);
    };

    dragOver = event => {
        event.stopPropagation();
    };
}

export default TaskElement;
