import React, { useMemo, useReducer, useContext, useEffect, FC } from 'react';

import { AppStateTypes, ActionType } from '@client/types/types';

export const AppContext = React.createContext<any>(null);

const initState = {
  name: 'Paradigm Fund',
  theme: 'light',
  token: null,
  mobile: false,
  boxed: false,
  darkSidebar: false,
  sidebarPopup: false,
  sidebarIcons: false,
  collapsed: false,
  weakColor: false,
  optionDrawer: false,
  mobileDrawer: false,
  fullscreen: false,
  isPageLoaded: false,
} as AppStateTypes;

let mql: MediaQueryList;

const reducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_SETUP':
      return { ...state, mobile: !mql.matches };
    case 'SET_MOBILE':
      return { ...state, mobile: !mql.matches };
    case 'SET_OPTIONS':
      return { ...state, optionDrawer: !state.optionDrawer };
    case 'SET_MOBILE_DRAWER':
      return { ...state, mobileDrawer: !state.mobileDrawer };
    case 'SET_BOXED':
      return { ...state, boxed: !state.boxed };
    case 'SET_SIDEBAR_THEME':
      return { ...state, darkSidebar: !state.darkSidebar };
    case 'SET_SIDEBAR_POPUP':
      return { ...state, sidebarPopup: !state.sidebarPopup };
    case 'SET_SIDEBAR_ICONS':
      if (state.collapsed) return { ...state };
      return { ...state, sidebarIcons: !state.sidebarIcons };
    case 'SET_COLLAPSE':
      const collapse = state.collapsed;
      let sidebarIcons = state.sidebarIcons;
      if (!collapse) sidebarIcons = true;
      return {
        ...state,
        collapsed: !state.collapsed,
        sidebarIcons,
      };
    default:
      throw new Error('inValid Action Type!');
  }
};

const AppContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = useMemo(() => [state, dispatch], [state, dispatch]);

  const setting = JSON.parse(localStorage.getItem('settings') as string);

  const saveToLocal = (state: Partial<AppStateTypes>) => {
    delete state.mobile;
    delete state.optionDrawer;
    delete state.mobileDrawer;

    localStorage.setItem('settings', JSON.stringify(state));
  };

  useEffect(() => {
    if (setting && setting['theme'] === 'dark') {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
    mql = window.matchMedia('(min-width: 992px)');
    mql.addEventListener('change', mediaQuery);
    dispatch({ type: 'SET_SETUP' });
    return () => mql.removeEventListener('change', mediaQuery);
  }, []);

  useEffect(() => {
    if (state) {
      saveToLocal(state);
    }
  }, [state]);

  const mediaQuery = () => {
    return dispatch({ type: 'SET_MOBILE' });
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext<[AppStateTypes, () => void]>(AppContext);

  if (!context) {
    throw new Error('useAppContext hook need to be use inside AppContextProvider!');
  }

  return context;
};

// actions
export const setTheme = (dispatch: any, payload: AppStateTypes['theme']) => {
  return dispatch({ type: 'SET_THEME', payload });
};

export const setMobileDrawer = (dispatch: any, payload?: AppStateTypes['mobileDrawer']) => {
  return dispatch({ type: 'SET_MOBILE_DRAWER', payload });
};

export const setAuthToken = (dispatch: any, payload: AppStateTypes['token']) => {
  return dispatch({ type: 'SET_AUTH_TOKEN', payload });
};

export default AppContextProvider;
