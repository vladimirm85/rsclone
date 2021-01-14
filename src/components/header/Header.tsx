import React from 'react';
import './header.scss';
import logo from '../../assets/img/logo.png';

const Header: React.FC = (): JSX.Element => {
  return (
    <header>
      <div className="container-inner">
        <div className="header-content">
          <div className="header-content__img">
            <img src={logo} alt="logo" />
          </div>
          <nav>
            <ul className="header-content__nav">
              <li>
                Ab<span className="red-letter">o</span>ut
              </li>
              <li>
                Sc<span className="red-letter">o</span>re
              </li>
              <li>
                G<span className="red-letter">a</span>me
              </li>
              <li>
                L<span className="red-letter">o</span>gin
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
