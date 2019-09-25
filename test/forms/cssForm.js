import React, {Component} from 'react'
import Formwork from '../../src'

class CssForm extends Component {
    render() {
        const {fields} = this.props.formwork;
        return (
            <div>
                {fields}
            </div>
        )
    }
}

export default Formwork(CssForm, {
    fields: [
        {
            name: 'email',
            validator: 'name',
            'data-entityId': '101',
            'aria-describedby': 'info'
        }
    ],
    css: {
        fieldset: 'blue-background',
        legend: 'orange-background',
        input: 'green-background',
        error: {
            'backgroundColor': '#ff0000',
            'color': '#000'
        },
        submit: 'yellow-background'
    }
});
