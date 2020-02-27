import React, {Component} from "react"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class FormTask extends Component {

    state = {
        task: null
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Col} md="4" controlId="validation1">
                        <Form.Control
                            required
                            name="task"
                            type="text"
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
        this.props.onSubmit(this.state.task);
    };

    handleChange = event => {
        event.preventDefault();
        const {name, value} = event.currentTarget;
        this.setState({[name]: value});
    };
}

export default FormTask;
