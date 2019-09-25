import {simpleFormSubmit} from './types'

export const submitSimpleForm = payload => ({
    type: simpleFormSubmit,
    payload
});

export const edit = set => ({
    type: 'EDIT_SET',
    set
});
