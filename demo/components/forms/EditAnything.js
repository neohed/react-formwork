import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {map} from 'lodash'
import {edit} from '../../actions'
import Formwork from '../../../src'

class EditAnything extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    dataSets = () => map(['artist', 'label', 'recording'], dataSet => <button key={dataSet} onClick={() => this.props.edit(dataSet)}>{dataSet}</button>);

    render() {
        const {fields} = this.props.formwork;

        return (
            <div>
                <div className="bunch-o-buttons">
                    {this.dataSets()}
                </div>
                <div className="simple">
                    <h3>{this.props.setName}</h3>
                    {fields}
                </div>
                <pre>
                    {JSON.stringify(this.props.artist, null, 2)}
                </pre>
            </div>
        )
    }
}

EditAnything.propTypes = {
    formwork: PropTypes.object,
    setName: PropTypes.string,
    artist: PropTypes.string,
    edit: PropTypes.func
};

export default connect(state => ({
    setName: state.records.dataSet,
    dataSet: state.records[state.records.dataSet]
}), {
    edit
})(Formwork(EditAnything, {
    fields: 'dataSet',
    data:  'dataSet'
}));
