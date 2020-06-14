import { limitArray } from '../helpers';
import { requestUser } from '../sockets/userSocketConnect';

export const navigate = (nav, setNav) => async (screen) => {
  const { history, currentScreen } = nav;
  const newHistory = limitArray([currentScreen, ...history], 10);
  requestUser('Emit');
  setNav({ history: newHistory, currentScreen: screen, forwardScreen: [] });
};
export const goBack = (nav, setNav) => () => {
  const { history, forwardScreens, currentScreen } = nav;
  const previousScreen = history.shift() || currentScreen;
  setNav({ history, currentScreen: previousScreen, forwardScreen: [currentScreen, ...forwardScreens] });
};
