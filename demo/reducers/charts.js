/*
 * Demo data from MusicBrainz:
 * https://wiki.musicbrainz.org/Development/JSON_Web_Service
 *
 */

const getDefaults = () => ({
    area: {
        fillColor: 'black',
        strokeColor: '#c43a31',
        interpolation: 'cardinal'
    },
    bar: {
    }
});

const charts = (state = getDefaults(), action) => {
    switch (action.type) {
        case 'EDIT_CHART':
            return {...state, dataSet: action.set };
        default:
            return state;
    }
};

export default charts;
