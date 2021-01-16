import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import loader from '../../assets/img/loader.svg';
import './verification.scss';

const Verification: React.FC<RouteComponentProps> = ({
  location,
}): JSX.Element => {
  useEffect(() => {
    const url = location.pathname;
    const dataArray = url.split('/').splice(-2);
    const [email, verificationKey] = dataArray;
  });

  return (
    <main>
      <div className="container-inner">
        <div className="loader_content">
          <img src={loader} alt="loader" />
        </div>
      </div>
    </main>
  );
};

export default Verification;
