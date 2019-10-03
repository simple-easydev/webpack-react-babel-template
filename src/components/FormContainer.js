import React, { Component } from "react";
import ReactDOM from "react-dom";
import classes from './index.scss';
console.log(classes);

class FormContainer extends Component {
    constructor(){
        super();
        this.state = {
            title:"test"
        }
    }

    render() {
        return(
            <h1>This is TEST</h1>
        )
    }
}

export default FormContainer;