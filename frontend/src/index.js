import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import NavBar from "./components/nav";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <NavBar/>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));
