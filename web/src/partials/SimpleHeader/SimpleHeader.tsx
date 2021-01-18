import React from 'react';
import logo from '../../assets/Logo.png';

import './SimpleHeader.css';

const SimpleHeader: React.FC = (props) =>
{

    return(
        <div id='SimpleHeader'>
            <body>
                <div className='header'>
                    <img src={logo} alt="Logomarca" />
                </div>
            </body>
        </div>
    );
}

export default SimpleHeader;