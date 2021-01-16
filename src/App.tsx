import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Canvas from './components/canvas/Canvas';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Score from './components/Score/Score';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/game" />} />
        <Route path="/game" render={() => <Canvas />} />
        <Route path="/score" render={() => <Score />} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
