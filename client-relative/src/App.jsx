import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LogRocket from 'logrocket';


import { GenStoreProvider } from './context/generalStore'
import MainPage from './pages/MainPage.jsx';

import './consts/Dots.scss';
import './App.css';

LogRocket.init('0fqhvu/tap2tell');

function App() {

  useEffect(() => {
    LogRocket.identify(
      localStorage.getItem('device-uuid') || uuidv4(), {
      userType: 'relative',
    });

  }, []);
  const [rotateScreen, setRotateScreen] = useState(window.orientation)

  document.documentElement.style.setProperty('--vh', `${document.documentElement.clientHeight / 100}px`);
  document.documentElement.style.setProperty('--vw', `${document.documentElement.clientWidth / 100}px`);

  const WidthAndHeight = () => {
    document.documentElement.style.setProperty('--vh', `${document.documentElement.clientHeight / 100}px`);
    document.documentElement.style.setProperty('--vw', `${document.documentElement.clientWidth / 100}px`);
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth !== document.documentElement.clientWidth) {
      WidthAndHeight()
    }
    setRotateScreen(window.orientation)
  });

  // window.addEventListener("orientationchange", () => {
  // })
  return (
    <GenStoreProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/:id" exact >
              <MainPage rotateScreen={rotateScreen} />
            </Route>
          </Switch>
        </Router>

      </div>
    </GenStoreProvider>
  );
}

export default App;
