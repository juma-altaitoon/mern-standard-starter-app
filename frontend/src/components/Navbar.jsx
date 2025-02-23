import React from "react";
import { Link } from  'react-router-dom';

export default function Navbar({toggleTheme, theme}) {

    return (
        <nav>
            <div>Logo</div>
            <ul>
                <li><Link to="/" >Home</Link></li>
                <li><Link>About</Link></li>
            </ul>
            <button onClick={toggleTheme}>
                {theme === 'light' ? 'Dark-Mode': 'Light-Mode'}
            </button>
        </nav> 
    )
}