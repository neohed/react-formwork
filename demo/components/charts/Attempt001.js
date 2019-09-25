import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Formwork from '../../../src/'
import TextField from '@material-ui/core/TextField';

class Attempt001 extends React.Component {
    state = {
        fillColor: 'black',
        strokeColor: '#c43a31',
        interpolation: 'cardinal'
    };

    render() {
        const {fields} = this.props.formwork;

        return (
            <div className="simple">
                {fields}
            </div>
        )
    }
}

Attempt001.propTypes = {
    formwork: PropTypes.array,
};

const SomeTextField = (title, inputName, onChange, data) => <TextField
    id={inputName}
    label={title}
    value={data}
    onChange={onChange}
    margin="normal"
/>;

export default connect(state => ({
    areaChart: state.charts.area
}))(Formwork(Attempt001, {
    fields: 'areaChart',
    data:  'areaChart',
    templates: {
        'text': SomeTextField
    }
}));
