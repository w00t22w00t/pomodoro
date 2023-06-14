import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Time } from '../types';

type stateType = {
  mode: PaletteMode;
  focusLength: Time;
  breakLength: Time;
};

export const defaultTime: Time = {
  minutes: 0,
  seconds: 10,
};

const initialState: stateType = {
  mode: 'dark',
  focusLength: { ...defaultTime },
  breakLength: { ...defaultTime },
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<PaletteMode>) => {
      console.log(action, 'test');
      state.mode = action.payload;
    },
    setFocusLength: (state, action: PayloadAction<Time>) => {
      // change any
      state.focusLength = action.payload;
    },
    setBreakLength: (state, action: PayloadAction<Time>) => {
      // change any
      state.breakLength = action.payload;
    },
  },
});

export const { setTheme, setFocusLength, setBreakLength } = themeSlice.actions;
export default themeSlice.reducer;
