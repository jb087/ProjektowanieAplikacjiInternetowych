import React, {Component} from "react"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskContainer from "./TaskContainer";
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import ApiClient from "../../client/ApiClient";

class TaskContainers extends Component {

    state = {
        taskContainers: [
            {id: "todoTasksId", order: 1, title: "ToDo Tasks", formTaskHidden: "false"},
            {id: "doneTasksId", order: 2, title: "Done Tasks", formTaskHidden: "true"}
        ],
        tasks: []
    };

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        {
                            this.state.taskContainers
                                .sort((a, b) => this.compareTaskContainers(a, b))
                                .map(taskContainer =>
                                    <Col key={taskContainer.id}>
                                        <TaskContainer
                                            id={taskContainer.id}
                                            title={taskContainer.title}
                                            formTaskHidden={taskContainer.formTaskHidden}
                                            tasks={this.state.tasks}
                                            addTask={this.addTask}
                                            removeTask={this.removeTask}
                                        />
                                    </Col>
                                )
                        }
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Button variant="primary" onClick={this.saveTasks}>Save Tasks</Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        );
    }

    compareTaskContainers = (a, b) => {
        if (a.order < b.order) {
            return -1;
        }
        if (a.order > b.order) {
            return 1;
        }
        return 0;
    };

    addTask = taskElement => {
        const tasks = [...this.state.tasks].filter(task => !task.id.includes(taskElement.id));
        tasks.push(taskElement);

        this.setState({tasks: tasks});
    };

    removeTask = taskId => {
        const tasks = [...this.state.tasks].filter(task => !task.id.includes(taskId));

        this.setState({tasks: tasks});
    };

    saveTasks = () => {
        const message = ApiClient.saveTasks(this.props.match.params.login, this.state.tasks);
        //TODO allert z message
    };
}

export default TaskContainers;
