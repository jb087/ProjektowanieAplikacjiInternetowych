import React, {Component} from "react"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskContainer from "./TaskContainer";
import Container from "react-bootstrap/Container";

class TaskContainers extends Component {

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col><TaskContainer
                            title="ToDo Tasks"
                            formTaskHidden="false"
                        />
                        </Col>
                        <Col><TaskContainer
                            title="Done Tasks"
                            formTaskHidden="true"
                        />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default TaskContainers;
