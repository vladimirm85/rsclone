import React from 'react';
import Canvas from './components/canvas/Canvas';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Canvas />
      <Footer />
    </>
  );
};

export default App;
