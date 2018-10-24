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
  async initialize() {
    try {
      App.setScreen(Screens.PERMISSIONS, '(Detecting location...)');
      await App.getResult();
    } catch (e) {
      App.setScreen(Screens.ERROR, e.message);
    }
  },
  async getResult() {
    const { coords } = await getLocation();
    App.setScreen(Screens.ANALYZING, '(Analyzing weather...)');
    const weather = await getWeather(coords.latitude, coords.longitude);
    App.result = calculateResult(weather);
    App.setScreen(Screens.RESULT);
  },
  setScreen(screen, message = null) {
    App.screen = screen;
    if (message) {
      App.message = message;
    }
    m.redraw();
  }
};

const renderBodyClass = classList => m(BodyClass, { classList });
const renderMessage = (message, className = '') => (
  m('p', { class: className }, message)
);

m.mount(document.body, {
  view: function () {
    switch (App.screen) {
      case Screens.RESULT:
        return [
          renderMessage(getResultMessage(App.result), 'title'),
          renderBodyClass([
            App.screen,
            `${App.screen}--${App.result}`
          ])
        ];
      case Screens.UNSTARTED:
        return [
          m('img.sun', { src: 'sun.gif' }),
          renderMessage('Should I wash my car?', 'title'),
          m('button.start', { onclick: App.initialize }, 'Start'),
          m('p', App.message),
          renderBodyClass([App.screen])
        ];
      default:
        return [
          renderMessage(App.message),
          renderBodyClass([App.screen])
        ];
    }
  }
});