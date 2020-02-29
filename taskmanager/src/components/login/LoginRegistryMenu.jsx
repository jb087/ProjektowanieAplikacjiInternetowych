import React, {Component} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class LoginRegistryMenu extends Component {

    render() {
        return (
            <Row>
                <Col></Col>
                <Col>
                    <div>
                        <Link to="/login">
                            <Button variant="primary">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="danger">Register</Button>
                        </Link>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        );
    }
}

export default LoginRegistryMenu;
