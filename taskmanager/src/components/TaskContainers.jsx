import React, {Component} from "react"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskContainer from "./TaskContainer";
import Container from "react-bootstrap/Container";

class TaskContainers extends Component {

    state = {
        taskContainers: [
            {id: "todoTasksId", title: "ToDo Tasks", formTaskHidden: "false", tasks: []},
            {id: "doneTasksId", title: "Done Tasks", formTaskHidden: "true", tasks: []}
        ]
    };

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        {this.state.taskContainers
                            .map(taskContainer =>
                                <Col>
                                    <TaskContainer
                                        id={taskContainer.id}
                                        title={taskContainer.title}
                                        formTaskHidden={taskContainer.formTaskHidden}
                                        tasks={taskContainer.tasks}
                                    />
                                </Col>
                            )}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default TaskContainers;
