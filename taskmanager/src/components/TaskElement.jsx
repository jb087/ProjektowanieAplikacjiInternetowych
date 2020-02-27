import React, { Component } from "react"

class TaskElement extends Component {

    render() {
        return (
            <div
                onDragStart={this.dragStart}
                onDragOver={this.dragOver}
                draggable={true}
            >
                <p id={this.props.task.id}>{this.props.task.task}</p>
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
