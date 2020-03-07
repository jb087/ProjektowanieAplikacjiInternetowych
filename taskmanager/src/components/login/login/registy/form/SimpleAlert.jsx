import React, {Component} from 'react';
import {Alert} from "react-bootstrap";

class SimpleAlert extends Component {

    render() {
        return (
            <Alert
                variant={this.props.type}
                show={this.props.show}
                onClose={this.props.closeFunction}
                dismissible
            >
                {this.props.text}
            </Alert>
        );
    }
}

export default SimpleAlert;
