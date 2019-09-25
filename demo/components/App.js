import React from 'react';
import PropTypes from 'prop-types'
import Menu from './Menu'
import '../styles/app.css'

const App = ({children}) => <div id="app">
    <h3>Form examples:</h3>
    <Menu />
    {children}
</div>;

App.propTypes = {
    children: PropTypes.node,
};

export default App;
