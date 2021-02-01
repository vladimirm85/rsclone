import React from 'react';
import unmountCanvas from '../../hoc/unmomuntCanvas';

const About: React.FC = (): JSX.Element => {
  return (
    <main>
      <div className="container-inner">
        <div className="score-content">
          <div className="main-title">About game</div>
        </div>
      </div>
    </main>
  );
};

const AboutW = unmountCanvas(About);

export default AboutW;
