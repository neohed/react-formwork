import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => <ul>
    <li><Link to="/editArtist">Edit Artist</Link></li>
    <li><Link to="/editLabel">Edit Label</Link></li>
    <li><Link to="/editRecording">Edit Recording</Link></li>
    <li><Link to="/editAnything">Edit Anything</Link></li>
    <li><Link to="/areaChart">Area Chart</Link></li>
    <li><Link to="/validation">Validation</Link></li>
    <li><Link to="/submit">Submit Form</Link></li>
    <li><Link to="/validity">Form Validity</Link></li>
</ul>;

export default Menu;
