import React from 'react';
import './App.css';
import TaskContainer from "./components/TaskContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
    return (
        <div className="App">
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

export default App;
