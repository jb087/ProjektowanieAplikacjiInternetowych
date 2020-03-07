import React, {Component} from "react"
import TaskContainer from "./TaskContainer";
import ApiClient from "../../../client/ApiClient";
import {Button, Col, Container, Row} from "react-bootstrap";
import "./TaskContainers.css"
import TaskForm from "../form/TaskForm";

class TaskContainers extends Component {

    state = {
        taskContainers: [
            {id: "todoTasksId", order: 1, title: "ToDo Tasks"},
            {id: "doneTasksId", order: 2, title: "Done Tasks"}
        ],
        tasks: []
    };

    render() {
        return (
            <div className="TaskContainers">
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
                                                tasks={this.state.tasks}
                                                addTask={this.addTask}
                                                removeTask={this.removeTask}
                                                login={this.props.match.params.login}
                                            />
                                        </Col>
                                )
                        }
                        <Col>
                            <div className="Logout">
                                <Button
                                    variant="danger"
                                    onClick={this.logout}
                                >
                                    Logout
                                </Button>
                            </div>
                            <TaskForm
                                taskContainerId="todoTasksId"
                                onSubmit={this.addTask}
                                login={this.props.match.params.login}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    async componentDidMount() {
        const tasks = await ApiClient.getTasks(this.props.match.params.login);
        this.setState({tasks: tasks});
    }

    logout = () => {
        this.props.history.push("/");
    };

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
        ApiClient.deleteTaskById(this.props.match.params.login, taskId);

        this.setState({tasks: tasks});
    };
}

export default TaskContainers;
