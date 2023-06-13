import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Time } from '../types';

type stateType = {
  mode: PaletteMode;
  focusLength: Time;
  breakLength: Time;
};

const initialState: stateType = {
  mode: 'dark',
  focusLength: {
    minutes: 1,
    seconds: 0,
  },
  breakLength: {
    minutes: 1,
    seconds: 0,
  },
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<PaletteMode>) => {
      console.log(action, 'test');
      state.mode = action.payload;
    },
    setFocusLength: (state, action: any) => {
      // change any
      state.focusLength = action;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
