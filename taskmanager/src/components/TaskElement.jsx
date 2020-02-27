import React, { Component } from "react"

class TaskElement extends Component {

    render() {
        return (
            <div>
                <p>{this.props.task.task}</p>
            </div>
        );
    }
}

export default TaskElement;
