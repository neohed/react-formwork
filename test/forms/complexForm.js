import React, {Component} from 'react'
import Formwork from '../../src'

class ComplexForm extends Component {
    onSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        const {fields, fieldsByName, data, submit} = this.props.formwork;
        return (
            <div>
                <form name="form01" onSubmit={this.onSubmit}>
                    {fields}
                    <div>
                        <p>Can we get an individual element by name?</p>
                        {fieldsByName['email']}
                    </div>
                    {submit}
                </form>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        )
    }
}

export default Formwork(ComplexForm, {
    fields: [
        {
            name: 'name',
            title: 'Given Name:',
            template: (labelText, inputName, inputControl) => <div key={inputName}
                                                                   style={{'border': '2px solid red'}}>
                <p>{labelText}</p><p>{inputName}</p><p>{inputControl}</p></div>,
            validator: {
                validate: value => value.length > 2,
                message: 'Length must be greater than 2 characters'
            },
            'data-entityId': '101'
        },
        {
            name: 'email',
            validator: 'name'
        },
        {
            name: 'jobTitle'
        },
        {
            name: 'nationalInsuranceNumber'
        },
        {
            name: 'heardOfUs',
            type: 'select',
            data: [
                { key: 1, value: 'Radio' },
                { key: 2, value: 'TV' },
                { key: 3, value: 'Web' }
            ]
        },
        {
            name: 'Industry',
            type: 'radio',
            data: [
                { key: 1, value: 'IT' },
                { key: 2, value: 'Medicine' },
                { key: 3, value: 'Leisure' }
            ]
        }
    ],
    data: {
        name: 'David',
        email: 'a@b.c',
        jobTitle: 'Developer',
        nationalInsuranceNumber: 'abc123'
    }
});
