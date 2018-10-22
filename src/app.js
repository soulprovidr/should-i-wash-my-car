import '@babel/polyfill';
import './assets/style.css';

import { Results, Screens } from './constants';

import BodyClass from './components/bodyClass';

import calculateResult from './lib/calculateResult';
import getLocation from './lib/getLocation';
import getResultMessage from './lib/getResultMessage';
import getWeather from './lib/getWeather';

const App = {
  message: null,
  result: null,
  screen: Screens.UNSTARTED,
  setScreen(screen, message) {
    App.screen = screen;
    App.message = message;
    m.redraw();
  },
  async start() {
    try {
      App.setScreen(Screens.PERMISSIONS, '(Detecting location...)');
      const { coords } = await getLocation();
      App.setScreen(Screens.ANALYZING, '(Analyzing weather...)');
      App.result = calculateResult(await getWeather(coords.latitude, coords.longitude));
      const message = getResultMessage(App.result);
      App.setScreen(Screens.RESULT, message);
    } catch (e) {
      App.setScreen(Screens.ERROR, e.message);
    }
  }
};

m.mount(document.body, {
  view: function () {
    let classList = [];
    let children = [];
    switch (App.screen) {
      case Screens.UNSTARTED:
        children = children.concat([
          m('img.sun', { src: 'sun.gif' }),
          m('p.title', 'Should I wash my car?'),
          m('button.start', { onclick: App.start }, 'Start'),
          m('p', App.message)
        ]);
        break;
      case Screens.RESULT:
        classList.push(App.screen);
        classList.push(`${App.screen}--${App.result}`);
        children = children.concat([
          m('p.title', App.message)
        ]);
        break;
      default:
        classList.push(App.screen);
        children = children.concat([
          m('p', App.message)
        ]);
        break;
    }
    return children.concat([
      m(BodyClass, { classList })
    ]);
  }
});