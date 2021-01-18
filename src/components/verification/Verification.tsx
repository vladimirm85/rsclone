import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import './verification.scss';
import { AppStateType } from '../../store/store';
import { verifyEmail } from '../../store/action-creators/verify-ac';
import Preloader from '../common/Preloader/Preloader';

type PropsType = {
  isLoading: boolean;
  isVerify: boolean;
  verifyEmail: (arg: string) => void;
};

const Verification: React.FC<RouteComponentProps & PropsType> = (
  props,
): JSX.Element => {
  const { isLoading, isVerify, location } = props;

  useEffect(() => {
    const url = location.pathname;
    const [key] = url.split('/').splice(-1);
    if (!isVerify) {
      props.verifyEmail(key);
    }
  });

  return (
    <main>
      <div className="container-inner">
        <div className="loader_content">
          {isLoading && <Preloader />}
          {isVerify ? (
            <p>
              Verification was successful! Log in to the game using your e-mail
              and password.
            </p>
          ) : (
            <p>Verification in progress. Wait a second...</p>
          )}
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    isLoading: state.verifyData.isLoading,
    isVerify: state.verifyData.isVerify,
  };
};

const VerificationW = connect(mapStateToProps, { verifyEmail })(Verification);

export default VerificationW;
