import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginRegistryMenu from "./components/login/LoginRegistryMenu";
import UserForm from "./components/login/UserForm";
import {Container} from "react-bootstrap";


function App() {
    return (
        <div className="App">
            <Router>
                <Container>
                    <Switch>
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
