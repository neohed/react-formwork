import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Formwork from '../../../src'

class EditRecording extends React.Component {
    render() {
        const {fields} = this.props.formwork;

        return (
            <div className="simple">
                {fields}
            </div>
        )
    }
}

EditRecording.propTypes = {
    formwork: PropTypes.object
};

export default connect(state => ({
    recording: state.records.recording
}))(Formwork(EditRecording, {
    fields: 'recording',
    data:  'recording'
}));
