import { createSlice } from '@reduxjs/toolkit';

import { Profile } from '@client/types/user.types';

type userSliceTypes = {
  profile: Profile | null;
  users: Profile[];
};

const initialState: userSliceTypes = {
  profile: null,
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    resetProfile: (state) => {
      return {
        ...state,
        profile: null,
      };
    },
    resetUsers: (state) => {
      return {
        ...state,
        users: [],
      };
    },
  },
});

export const { setProfile, setUsers, resetProfile } = userSlice.actions;

export default userSlice;
