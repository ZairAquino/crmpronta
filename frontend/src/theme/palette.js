import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: '#E8D5FF',
  light: '#B794F6',
  main: '#805AD5',
  dark: '#553C9A',
  darker: '#322659',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#FED7E2',
  light: '#FBB6CE',
  main: '#ED64A6',
  dark: '#B83280',
  darker: '#702459',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#C6F6D5',
  light: '#9AE6B4',
  main: '#48BB78',
  dark: '#2F855A',
  darker: '#1A202C',
  contrastText: '#fff',
};

const WARNING = {
  lighter: '#FEFCBF',
  light: '#F6E05E',
  main: '#D69E2E',
  dark: '#B7791F',
  darker: '#744210',
  contrastText: '#fff',
};

const ERROR = {
  lighter: '#FED7D7',
  light: '#FEB2B2',
  main: '#E53E3E',
  dark: '#C53030',
  darker: '#742A2A',
  contrastText: '#fff',
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
