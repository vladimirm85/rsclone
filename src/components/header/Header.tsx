import React from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/img/logo.png';
import AuthModal from '../login/AuthModal';
import { AppStateType } from '../../store/store';

type MapStatePropsType = {
  isAuth: boolean;
};

const Header: React.FC<MapStatePropsType> = ({ isAuth }): JSX.Element => {
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
              {isAuth && (
                <>
                  <li>
                    <NavLink to="/saves" activeClassName="active-menu-item">
                      S<span className="red-letter">a</span>ves
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/score" activeClassName="active-menu-item">
                      Sc<span className="red-letter">o</span>re
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/game" activeClassName="active-menu-item">
                  G<span className="red-letter">a</span>me
                </NavLink>
              </li>
              {isAuth ? (
                <li>
                  <NavLink to="/settings" activeClassName="active-menu-item">
                    S<span className="red-letter">e</span>ttings
                  </NavLink>
                </li>
              ) : (
                <li>
                  <button type="button" onClick={handleOpen}>
                    L<span className="red-letter">o</span>gin
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <AuthModal open={open} close={handleClose} />
    </header>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.authData.isAuth,
});

const HeaderW = connect(mapStateToProps)(Header);

export default HeaderW;
