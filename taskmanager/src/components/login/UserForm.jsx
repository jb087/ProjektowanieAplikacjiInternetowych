import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";
import ApiClient from "../../client/ApiClient";

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
                        <Form.Group>
                            <Form.Control
                                required
                                id="loginId"
                                name="login"
                                type="text"
                                value={this.state.login}
                                placeholder="Login"
                                onChange={this.handleChange}
                            />
                            <Form.Control
                                required
                                id="passwordId"
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

    handleSubmit = async event => {
        event.preventDefault();

        const data = {
            login: this.state.login,
            password: this.state.password
        };

        const isLogin = this.isLoginForm(this.props.location.pathname);
        if (isLogin) {
            await this.validateLoginData(data);
        } else {
            await this.validateRegisterData(data);
        }
    };

    isLoginForm = path => {
        return path === "/login"
    };

    async validateLoginData(data) {
        const isCorrectData = await ApiClient.checkUser(data);
        if (isCorrectData) {
            this.props.history.push("/tasks/" + this.state.login);
            //TODO add route
        } else {
            //TODO notification and reset form
        }
    }

    async validateRegisterData(data) {
        const userExists = await ApiClient.userExists(data);
        if (!userExists) {
            //TODO register user
            this.props.history.push("/login");
        } else {
            //TODO notification and reset form
        }
    }
}

export default UserForm;
