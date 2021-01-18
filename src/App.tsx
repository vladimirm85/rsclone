import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Canvas from './components/canvas/Canvas';
import HeaderW from './components/header/Header';
import Footer from './components/footer/Footer';
import ScoreW from './components/score/Score';
import About from './components/about/About';
import VerificationW from './components/verification/Verification';
import SavesW from './components/saves/Saves';
import SettingsW from './components/settings/Settings';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <HeaderW />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/game" />} />
        <Route path="/about" render={() => <About />} />
        <Route path="/saves" render={() => <SavesW />} />
        <Route path="/score" render={() => <ScoreW />} />
        <Route path="/game" render={() => <Canvas />} />
        <Route path="/settings" render={() => <SettingsW />} />
        <Route path="/verify" component={VerificationW} />
        <Route path="*" render={() => <Redirect to="/game" />} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
