import { SxProps } from '@mui/material';

export interface IconProps {
  viewBox?: string;
  sx?: SxProps;
  fill?: string;
}

export interface Time {
  minutes: number;
  seconds: number;
}

// https://mui.com/material-ui/customization/palette/
declare module '@mui/material/styles' {
  interface Palette {
    myCustomColor?: string;
  }
  interface PaletteOptions {
    myCustomColor?: string;
  }
}
