import React, { Component } from 'react'
import Formwork from '../../src'

class DataBindForm extends Component {
    render() {
        const { elements, submit, data } = this.props.formwork;
        return (
            <form>
                {elements}
                {submit}
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </form>
        )
    }
}

const model = {
    name: 'David',
    email: 'a@b.c',
    jobTitle: 'Developer'
};

export default Formwork(DataBindForm, {
    elements: model,
    data: model
});
