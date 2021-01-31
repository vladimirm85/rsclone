import React from 'react';
import preloader from '../../../assets/img/loader.svg';
import './preloader.scss';

const Preloader: React.FC = (): JSX.Element => {
  return (
    <div className="preloader">
      <img src={preloader} alt="preloader" />
    </div>
  );
};

export default Preloader;
