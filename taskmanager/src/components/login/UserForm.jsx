import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";
import ApiClient from "../../client/ApiClient";
import SimpleAlert from "./SimpleAlert";

class UserForm extends Component {

    state = {
        login: "",
        password: "",
        showUserExistAlert: false,
        showIncorrectDataAlert: false,
        showUserRegisteredAlert: false
    };

    render() {
        return (
            <Row>
                <Col></Col>
                <Col>
                    <SimpleAlert
                        show={this.state.showUserExistAlert}
                        type={"danger"}
                        closeFunction={this.closeUserExistAlert}
                        text={"Provided user exists! Please provide unique username."}
                        dismissible
                    />
                    <SimpleAlert
                        show={this.state.showIncorrectDataAlert}
                        type={"danger"}
                        closeFunction={this.closeIncorrectDataAlert}
                        text={"Provided data are incorrect! Please provide correct data."}
                        dismissible
                    />
                    <SimpleAlert
                        show={this.state.showUserRegisteredAlert}
                        type={"success"}
                        closeFunction={this.closeUserRegisteredAlert}
                        text={"User registered successfully."}
                        dismissible
                    />
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

    closeUserExistAlert = () => {
        this.setState({showUserExistAlert: false});
    };

    closeIncorrectDataAlert = () => {
        this.setState({showIncorrectDataAlert: false});
    };

    closeUserRegisteredAlert = () => {
        this.setState({showUserRegisteredAlert: false});
    };

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
        return path === "/login";
    };

    async validateLoginData(data) {
        const isCorrectData = await ApiClient.checkUser(data);
        if (isCorrectData) {
            this.props.history.push("/tasks/" + this.state.login);
        } else {
            this.setState({showIncorrectDataAlert: true});
        }
    }

    async validateRegisterData(data) {
        const userExists = await ApiClient.userExists(data);
        if (!userExists) {
            await ApiClient.registerUser(data);
            this.setState({showUserRegisteredAlert: true});
            this.props.history.push("/login");
        } else {
            this.setState({showUserExistAlert: true});
        }
    }
}

export default UserForm;
