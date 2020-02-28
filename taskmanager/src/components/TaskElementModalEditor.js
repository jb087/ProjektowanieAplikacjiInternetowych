import React, {Component} from "react";
import ModalHeader from "react-bootstrap/ModalHeader";
import {ModalBody, ModalFooter, ModalTitle} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class TaskElementModalEditor extends Component {

    state = {
        taskValue: this.props.task.task
    };

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Edit Task</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <input
                        onChange={this.onInputChange}
                        name="taskValue"
                        value={this.state.taskValue}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="secondary"
                        onClick={this.props.handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => this.props.onSaveChanges(this.state.taskValue)}
                    >
                        Save changes
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    onInputChange = event => {
        event.preventDefault();
        const {name, value} = event.currentTarget;
        this.setState({[name]: value});
    };
}

export default TaskElementModalEditor;
