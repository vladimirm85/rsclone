import React from 'react';
import withAuthRedirect from '../../hoc/withAuthRedirect';

const Saves: React.FC = (): JSX.Element => {
  return (
    <main>
      <div className="container-inner">
        <div className="saves-content">
          <div className="main-title">Saves</div>
        </div>
      </div>
    </main>
  );
};

const SaveW = withAuthRedirect(Saves);

export default SaveW;
