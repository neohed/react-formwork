import React, { Component } from 'react'
import Formwork from '../../src'

class SimpleForm extends Component {
    render() {
        const {fields, submit} = this.props.formwork;

        return (
            <div>
                <form name="simple-form">
                    {fields}
                    {submit}
                </form>
            </div>
        )
    }
}

const model = {
    name: 'David',
    email: 'a@b.c'
};

export default Formwork(SimpleForm, {
    fields: model
});
