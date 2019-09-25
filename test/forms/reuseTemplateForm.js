import React, {Component} from 'react'
import Formwork from '../../src'

class ReuseTemplateForm extends Component {
    render() {
        const {fields, submit} = this.props.formwork;
        return (
            <div>
                <form name="form01">
                    {fields}
                    {submit}
                </form>
            </div>
        )
    }
}

export default Formwork(ReuseTemplateForm, {
    fields: [
        {
            name: 'name',
            title: 'Given Name:',
            template: (labelText, inputName, inputControl) => <div key={inputName}
                                                                   style={{'border': '2px solid red'}}>
                <p>{labelText}</p><p>{inputName}</p><p>{inputControl}</p></div>
        },
        {
            name: 'email',
            template: 'name'
        }
    ],
    data: {
        name: 'David',
        email: 'a@b.c'
    }
});
