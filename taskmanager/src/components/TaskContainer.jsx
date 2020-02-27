import React, {Component} from "react"
import FormTask from "./FormTask";

class TaskContainer extends Component {

    state = {
        tasks: []
    };

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {
                    this.state.tasks
                        .map(task => <p>{task}</p>)
                }
                <FormTask onSubmit={this.addTask}/>
            </div>
        );
    }

    addTask = task => {
        const tasks = [...this.state.tasks];
        tasks.push(task);
        this.setState({tasks: tasks});
    };
}

export default TaskContainer;
