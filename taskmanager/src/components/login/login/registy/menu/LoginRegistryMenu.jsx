import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./LoginRegistryMenu.css"

class LoginRegistryMenu extends Component {

    render() {
        return (
            <div className="LoginRegistryMenu">
                <Link to="/login">
                    <Button
                        className="LoginRegistryButton"
                        variant="primary"
                    >
                        Login
                    </Button>
                </Link>
                <Link to="/register">
                    <Button
                        className="LoginRegistryButton"
                        variant="danger"
                    >
                        Register
                    </Button>
                </Link>
            </div>
        );
    }
}

export default LoginRegistryMenu;
