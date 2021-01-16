import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Canvas from './components/canvas/Canvas';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Score from './components/score/Score';
import About from './components/about/About';
import Verification from './components/verification/Verification';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/game" />} />
        <Route path="/About" render={() => <About />} />
        <Route path="/score" render={() => <Score />} />
        <Route path="/game" render={() => <Canvas />} />
        <Route path="/verification" component={Verification} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
