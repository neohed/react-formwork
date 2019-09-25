import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {submitSimpleForm} from '../../actions'
import Formwork from '../../../src'

class SubmitForm extends Component {
    onSubmit = (e) => {
        e.preventDefault();
        const {data} = this.props.formwork;

        this.props.submitSimpleForm(data);
    };

    render() {
        const {fields, submit} = this.props.formwork;

        return (
            <div>
                <form name="simple-form" onSubmit={this.onSubmit}>
                    <div className="simple">
                        {fields}
                    </div>
                    <div style={{float: 'left', width: '100%'}}>
                        {submit}
                    </div>
                </form>
                <pre>
                    {JSON.stringify(this.props.simpleForm, null, 2)}
                </pre>
            </div>
        )
    }
}

SubmitForm.propTypes = {
    formwork: PropTypes.object,
    simpleForm: PropTypes.object,
    submitSimpleForm: PropTypes.func
};

const model = {
    name: 'David',
    email: 'a@b.c',
    jobTitle: 'Developer',
    nationalInsuranceNumber: 'abc123',
    ISBN: '011010010101010',
    carRegistration: '',
    address1: '',
    address2: '',
    address3: '',
    address4: '',
    postcode: ''
};

export default connect(state => ({
    simpleForm: state.formReducer.simpleForm
}), {
    submitSimpleForm
})(Formwork(SubmitForm, {
    titles: { ISBN: 'ISBN'},
    fields: model
}));
