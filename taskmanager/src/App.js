import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginRegistryMenu from "./components/login/login/registy/menu/LoginRegistryMenu";
import UserForm from "./components/login/login/registy/form/UserForm";
import {Container} from "react-bootstrap";
import TaskContainers from "./components/task/TaskContainers";


function App() {
    return (
        <div className="App">
            <Router>
                <Container>
                    <Switch>
                        <Route path="/tasks/:login" component={TaskContainers} />
                        <Route path="/login" component={UserForm}/>
                        <Route path="/register" component={UserForm}/>
                        <Route path="/" component={LoginRegistryMenu}/>
                    </Switch>
                </Container>
            </Router>
        </div>
    );
}

export default App;
