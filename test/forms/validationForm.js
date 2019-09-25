import React, {Component} from 'react'
import Formwork from '../../src'

class ValidationForm extends Component {
    render() {
        const {fields} = this.props.formwork;
        return (
            <div>
                <form>
                    {fields}
                </form>
            </div>
        )
    }
}

export default Formwork(ValidationForm, {
    fields: [
        {
            name: 'name',
            validator: {
                validate: value => value.length > 2,
                message: 'Length must be greater than 2 characters'
            }
        }
    ]
});
