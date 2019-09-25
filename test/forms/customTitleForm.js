import React, { Component } from 'react'
import Formwork from '../../src'

class CustomTitleForm extends Component {
    render() {
        const {fields} = this.props.formwork;

        return (
            <div>
                {fields}
            </div>
        )
    }
}

const model = {
    name: 'David',
    email: 'a@b.c'
};

export default Formwork(CustomTitleForm, {
    fields: model,
    titles: { name: 'First Name', email: 'Primary Email Address'}
});
