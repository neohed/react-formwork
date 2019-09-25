/*
 * Demo data from MusicBrainz:
 * https://wiki.musicbrainz.org/Development/JSON_Web_Service
 *
 */

const getDefaults = () => ({
    artist: {
        "id": "5b11f4ce-a62d-471e-81fc-a69a8278c7da",
        "name": "Nirvana",
        "sort-name": "Nirvana",
        "type": "Group",
        "country": "US",
        "disambiguation": "90s US grunge band",
        "life-span": {
            "ended": true,
            "begin": "1988-02",
            "end": "1994-04-05"
        },
        "aliases": [ { "name": "Nirvana US", "sort-name": "Nirvana US" } ]
    },
    label: {
        "id": "46f0f4cd-8aab-4b33-b698-f459faf64190",
        "name": "Warp Records",
        "sort-name": "Warp Records",
        "label-code": 2070,
        "type": "Original Production",
        "country": "GB",
        "life-span": { "ended": false, "begin": "1989" },
        "tags": [ { "count": 2, "name": "electronic" } ],
        "disambiguation": null,
    },
    recording: {
        "id": "fcbcdc39-8851-4efc-a02a-ab0e13be224f",
        "title": "LAST ANGEL",
        "disambiguation": "video",
        "artist-credit": [
            {
                "name": "倖田來未",
                "joinphrase": " feat. ",
                "artist": {
                    "id": "455641ea-fff4-49f6-8fb4-49f961d8f1ac",
                    "name": "倖田來未",
                    "sort-name": "Koda, Kumi",
                    "disambiguation": null
                }
            },
            {
                "name": "東方神起",
                "artist": {
                    "id": "05cbaf37-6dc2-4f71-a0ce-d633447d90c3",
                    "name": "東方神起",
                    "sort-name": "TVXQ",
                    "disambiguation": null
                },
                "joinphrase": ""
            }
        ],
        "isrcs": [ "JPB600760301" ],
        "length": 228106,
        "releases": [
            {
                "id": "abcd76db-7d5f-3eb7-b386-051c97bfe2e4",
                "title": "Kingdom",
                /* some properties omitted to keep this example shorter. */
            }
        ]
    },
    dataSet: null
});

const records = (state = getDefaults(), action) => {
    switch (action.type) {
        case 'EDIT_SET':
            return {...state, dataSet: action.set };
        default:
            return state;
    }
};

export default records;
