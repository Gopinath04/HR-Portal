import React from 'react';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p className="text-center">© {new Date().getFullYear()} HR Management App. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;