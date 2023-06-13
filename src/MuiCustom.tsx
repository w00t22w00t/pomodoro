import { PaletteMode } from '@mui/material';

const typography = {
  fontFamily: '"Roboto Flex", "Roboto", sans-serif',
  fontSize: 20, // ?
};

// Focus styles
const focusThemeLight = {
  background: {
    default: '#FFF2F2',
    paper: '#FFF2F2',
  },
  primary: {
    main: 'rgba(255, 76, 76, 0.15)',
  },
  secondary: {
    main: 'rgba(255, 76, 76, 0.71)',
  },
  text: {
    primary: '#471515',
  },
};

const focusThemeDark = {
  background: {
    default: '#0D0404',
    paper: '#0D0404',
  },
  primary: {
    main: 'rgba(255, 76, 76, 0.15);',
  },
  secondary: {
    main: 'rgba(255, 76, 76, 0.71)',
  },
  text: {
    primary: '#FFF2F2',
  },
};

export const focusTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? focusThemeLight : focusThemeDark),
  },
  typography: typography,
});

// Break styles
const breakThemeLight = {
  background: {
    default: '#F2FFF5',
    paper: '#F2FFF5',
  },
  primary: {
    main: 'rgba(77, 218, 110, 0.15)',
  },
  secondary: {
    main: 'rgba(77, 218, 110, 0.62)',
  },
  text: {
    primary: '#14401D',
  },
  // myCustomColor: 'rgba(255, 76, 76, 0.71)',
};

const breakThemeDark = {
  background: {
    default: '#040D06',
    paper: '#040D06',
  },
  primary: {
    main: 'rgba(77, 218, 110, 0.15)',
  },
  secondary: {
    main: 'rgba(77, 218, 110, 0.62)',
  },
  text: {
    primary: '#F2FFF5',
  },
  // myCustomColor: 'rgba(255, 76, 76, 0.71)',
};

export const breakTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? breakThemeLight : breakThemeDark),
  },
  typography: typography,
});
