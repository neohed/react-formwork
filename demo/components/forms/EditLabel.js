import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Formwork from '../../../src'

class EditLabel extends React.Component {
    render() {
        const {fields} = this.props.formwork;

        return (
            <div className="simple">
                {fields}
            </div>
        )
    }
}

EditLabel.propTypes = {
    formwork: PropTypes.object,
};

export default connect(state => ({
    label: state.records.label
}))(Formwork(EditLabel, {
    fields: 'label',
    data:  'label'
}));
