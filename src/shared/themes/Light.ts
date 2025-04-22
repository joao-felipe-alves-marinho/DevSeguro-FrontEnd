import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

const primaryMainColor = '#00518F';
const primaryLightColor = '#AADAFF';
const primaryDarkColor = '#13293A';
const backgroundColor = '#C3D4E0';

const Light = createTheme({
  palette: {
    primary: {
      main: primaryMainColor,
      light: primaryLightColor,
      dark: primaryDarkColor,
    },
    info: {
      main: '#3A89AE',
      light: '#D5E9F2',
      dark: '#265B73',
    },
    background: {
      default: backgroundColor,
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Noto Sans, Arial , Roboto, sans-serif',
    },

  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          borderRadius: 50,
          fontWeight: 'bold',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        fontFamily: 'Arial, Roboto, sans-serif',
        fontWeight: '600',
        color: 'inherit',
      }
    },
    MuiTextField: {
      defaultProps: {
        helperText: ' ',
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: `4px solid ${primaryMainColor}`,
          backgroundColor: '#D5D5D5',
          color: primaryMainColor,
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: 'space-between',
        },
      },
    }
  }
}, ptBR);

export default Light;