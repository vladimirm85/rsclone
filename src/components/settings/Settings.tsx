import React from 'react';
import withAuthRedirect from '../../hoc/withAuthRedirect';

const Settings: React.FC = (): JSX.Element => {
  return (
    <main>
      <div className="container-inner">
        <div className="saves-content">
          <div className="main-title">Settings</div>
        </div>
      </div>
    </main>
  );
};

const SettingsW = withAuthRedirect(Settings);

export default SettingsW;
