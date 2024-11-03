import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userStatus: 'guest',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.userStatus = action.payload;
    },
  },
});

export const { setUserStatus } = userSlice.actions;
export default userSlice.reducer;
