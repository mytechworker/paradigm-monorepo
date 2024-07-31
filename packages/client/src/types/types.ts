export type SidebarTypes = {
  path: string;
  icon: React.ReactElement;
  name: string;
};

export interface AppStateTypes {
  name: string;
  theme: 'dark' | 'light';
  token: string | null;
  mobile: boolean;
  boxed: boolean;
  darkSidebar: boolean;
  sidebarPopup: boolean;
  sidebarIcons: boolean;
  collapsed: boolean;
  weakColor: boolean;
  optionDrawer: boolean;
  mobileDrawer: boolean;
  fullscreen: boolean;
  isPageLoaded: boolean;
}

export type ActionType = {
  type: string;
  payload?: any;
};

export type GenericResponse<T = {}> = {
  success: boolean;
  message: string;
  data?: T;
};
