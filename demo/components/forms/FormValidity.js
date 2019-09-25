import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Formwork from '../../../src'

const doSomethingWithData = data => data;

class FormValidity extends Component {
    onSubmit = (e) => {
        e.preventDefault();
        const {data, isFormValid} = this.props.formwork;
        if (isFormValid) {
            doSomethingWithData(data)
        }
    };

    render() {
        const {fields, fieldsByName, submit, data, isFormValid} = this.props.formwork;

        return (
            <div>
                <form name="form01" onSubmit={this.onSubmit}>
                    <div>
                        {fields}
                    </div>
                    <div>
                        <p>Get a form element by name:</p>
                        {fieldsByName['email']}
                    </div>
                    {submit}
                </form>
                <p>Is form valid? = {isFormValid + ''}</p>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        )
    }
}

FormValidity.propTypes = {
    formwork: PropTypes.object,
};

const CustomTemplate = (labelText, inputName, inputControl) => <div key={inputName} className="custom-template">
    <span>{labelText}</span>
    <span>{inputName}</span>
    <span>{inputControl}</span>
</div>;

const dropdownData = [
    { key: 1, value: 'Radio' },
    { key: 2, value: 'TV' },
    { key: 3, value: 'Web' }
];

export default Formwork(FormValidity, {
    name: 'My Form',
    fields: [{
        name: 'name',
        title: 'Given Name:',
        template: CustomTemplate,
        validator: {
            validate: value => value.length > 2,
            message: 'Length must be greater than 2 characters'
        },
        'data-id': '101'
    },
        {
            name: 'email',
            validator: 'name',
            className: 'simple'
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
            data: dropdownData
        },
        {
            name: 'heardOfUs2',
            type: 'radio',
            data: dropdownData
        }],
    data: {
        name: 'David',
        email: 'a@b.c',
        jobTitle: 'Developer',
        nationalInsuranceNumber: 'abc123'
    }
});
