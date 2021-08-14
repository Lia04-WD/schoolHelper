import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Intro from './pages/Intro';
import LoginContainer from './components/LoginContainer';
import OptionsContainer from './components/OptionsContainer';

const App = () => {
  return (
    <div>
      <Route path="/" component={Intro} exact />
      <Route path="/login" component={LoginContainer} />
      <Route path="/home" component={Home} />
      <Route path="/options" component={OptionsContainer} />
    </div>
  );
};

export default App;
