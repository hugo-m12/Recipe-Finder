import React from 'react';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer(){
    return (
    <>
        <footer className="bg-black text-white text-center p-12"> 
            <nav> 
            <p> Copyright © 2024 | All Rights Reserved </p>
                <div className="flex justify-center mt-5 gap-5">
                   <a className='no-underline text-inherit' href='https://www.instagram.com/shots_by_hugomoreira/' rel="noreferrer" target="_blank">
                        <FontAwesomeIcon className="fa-2xl" icon={faInstagram} />
                    </a> 
                    <a className='no-underline text-inherit' href='https://www.linkedin.com/in/hugo-moreira-9889a9261/' rel="noreferrer" target="_blank">
                        <FontAwesomeIcon className="fa-2xl" icon={faLinkedin} />
                    </a>
                    <a className='no-underline text-inherit' href='https://github.com/hugo-m12' rel="noreferrer" target="_blank">
                        <FontAwesomeIcon className="fa-2xl" icon={faGithub} />
                    </a>
                </div>
            </nav>
        </footer>
    </>
    )
}

export default Footer;