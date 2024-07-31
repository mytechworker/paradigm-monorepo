import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from '@client/redux//store';

// actions
import { user, category, company } from '@client/redux//features';

export const useReduxActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return bindActionCreators(
    {
      ...user.actions,
      ...category.actions,
      ...company.actions,
    },
    dispatch,
  );
};

export const useReduxState = <T,>(selector: (state: AppState) => T) => {
  return useSelector(selector);
};
