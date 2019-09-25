import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Formwork from '../../../src'

class EditArtist extends React.Component {
    render() {
        const {fields} = this.props.formwork;

        return (
            <div className="simple">
                {fields}
            </div>
        )
    }
}

EditArtist.propTypes = {
    formwork: PropTypes.object,
};

export default connect(state => ({
    artist: state.records.artist
}))(Formwork(EditArtist, {
    fields: 'artist',
    data:  'artist'
}));
