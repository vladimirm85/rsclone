import React from 'react';
import './header.scss';
import logo from '../../assets/img/logo.png';
import Login from '../login/login';

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
                <button type="button" onClick={handleOpen}>
                  L<span className="red-letter">o</span>gin
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Login open={open} close={handleClose} />
    </header>
  );
};

export default Header;
