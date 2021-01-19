import React from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/img/logo.png';
import AuthModal from '../login/AuthModal';
import { AppStateType } from '../../store/store';
import { actions } from '../../store/action-creators/auth-ac';

type MapStatePropsType = {
  isAuth: boolean;
  isModalOpen: boolean;
};

type MapDispatchPropsType = {
  setModal: (arg: boolean) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Header: React.FC<PropsType> = (props): JSX.Element => {
  const { isAuth, isModalOpen, setModal } = props;

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
                  <button type="button" onClick={() => setModal(true)}>
                    L<span className="red-letter">o</span>gin
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <AuthModal isModalOpen={isModalOpen} setModal={setModal} />
    </header>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.authData.isAuth,
  isModalOpen: state.authData.isModalOpen,
});

const HeaderW = connect(mapStateToProps, { ...actions })(Header);

export default HeaderW;
