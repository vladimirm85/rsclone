import React from 'react';
import loader from '../../../assets/img/auth_loader.svg';
import './authPreloader.scss';

const AuthPreloader: React.FC = (): JSX.Element => {
  return (
    <div className="auth-preloader">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default AuthPreloader;
