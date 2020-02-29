import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";

class UserForm extends Component {

    state = {
        login: "",
        password: ""
    };

    render() {
        return (
            <Row>
                <Col></Col>
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="validation1">
                            <Form.Control
                                required
                                name="login"
                                type="text"
                                value={this.state.login}
                                placeholder="Login"
                                onChange={this.handleChange}
                            />
                            <Form.Control
                                required
                                name="password"
                                type="password"
                                value={this.state.password}
                                placeholder="Password"
                                onChange={this.handleChange}
                            />
                            <Button type="submit">Login</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        );
    }

    handleChange = event => {
        event.preventDefault();
        const {name, value} = event.currentTarget;
        this.setState({[name]: value});
    };

    handleSubmit = event => {
        event.preventDefault();
        //TODO
    };
}

export default UserForm;
