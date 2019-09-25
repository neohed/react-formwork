import {simpleFormSubmit} from '../actions/types'

const formReducer = (state = {}, action) => {
    switch(action.type) {
        case simpleFormSubmit:
            return {...state, simpleForm: action.payload};
    }

    return state;
};

export default formReducer;
