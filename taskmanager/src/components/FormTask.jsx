import React, {Component} from "react"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {v1 as uuidv1} from "uuid"

class FormTask extends Component {

    state = {
        task: ""
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Col} md="8" controlId="validation1">
                        <Form.Control
                            required
                            name="task"
                            type="text"
                            value={this.state.task}
                            placeholder="Task"
                            onChange={this.handleChange}
                        />
                        <Button type="submit">Add task</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit({
            id: uuidv1(),
            task: this.state.task,
            taskContainerId: this.props.taskContainerId
        });
        this.setState({task: ""})
    };

    handleChange = event => {
        event.preventDefault();
        const {name, value} = event.currentTarget;
        this.setState({[name]: value});
    };
}

export default FormTask;
