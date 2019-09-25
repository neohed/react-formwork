import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Formwork from '../../../src'

class ValidationForm extends Component {
    render() {
        const {fields} = this.props.formwork;
        return <form name="form01" className="simple">
            {fields}
        </form>
    }
}

ValidationForm.propTypes = {
    formwork: PropTypes.object,
};

export default Formwork(ValidationForm, {
    fields: [{
        name: 'name',
        validator: {
            validate: value => value.length > 2,
            message: 'Length must be greater than 2 characters'
        }
    }]
});
