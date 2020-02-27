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
        const target = event.target;
        event.dataTransfer.setData("taskElementId", this.props.task.id);

        setTimeout(() => {
            target.style.display = "none"
        }, 0);
    };

    dragOver = event => {
        event.stopPropagation();
    };
}

export default TaskElement;
