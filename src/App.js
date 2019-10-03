import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import FormContainer from './components/FormContainer';

class App extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            <FormContainer/>
        )
    }
}
export default App;