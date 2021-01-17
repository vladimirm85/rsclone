import React from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import AuthModal from '../login/AuthModal';

const Header: React.FC = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header>
      <div className="container-inner">
        <div className="header-content">
          <div className="header-content__img">
            <img src={logo} alt="logo" />
          </div>
          <nav className="header-content__nav">
            <ul>
              <li>
                <NavLink to="/about" activeClassName="active-menu-item">
                  Ab<span className="red-letter">o</span>ut
                </NavLink>
              </li>
              <li>
                <NavLink to="/score" activeClassName="active-menu-item">
                  Sc<span className="red-letter">o</span>re
                </NavLink>
              </li>
              <li>
                <NavLink to="/game" activeClassName="active-menu-item">
                  G<span className="red-letter">a</span>me
                </NavLink>
              </li>
              <li>
                <button type="button" onClick={handleOpen}>
                  L<span className="red-letter">o</span>gin
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <AuthModal open={open} close={handleClose} />
    </header>
  );
};

export default Header;
