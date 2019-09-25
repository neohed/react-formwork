import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'

import configureStore from './configureStore'
import App from './components/App';
import EditArtist from './components/forms/EditArtist'
import EditLabel from './components/forms/EditLabel'
import EditRecording from './components/forms/EditRecording'
import EditAnything from './components/forms/EditAnything'
import Attempt001 from './components/charts/Attempt001'
import ValidationForm from './components/forms/ValidationForm'
import SubmitForm from './components/forms/SubmitForm'
import FormValidity from './components/forms/FormValidity'

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App>
                <Route path="/editArtist" component={EditArtist} />
                <Route path="/editLabel" component={EditLabel} />
                <Route path="/editRecording" component={EditRecording} />
                <Route path="/editAnything" component={EditAnything} />
                <Route path="/areaChart" component={Attempt001} />
                <Route path="/validation" component={ValidationForm} />
                <Route path="/submit" component={SubmitForm} />
                <Route path="/validity" component={FormValidity} />
            </App>
        </Router>
    </Provider>,
    document.getElementById('root')
);
