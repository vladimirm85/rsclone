import React from 'react';
import Canvas from './components/canvas/Canvas';
import Header from './components/header/Header';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Canvas />
    </>
  );
};

export default App;
