import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FFBE61',
    },
    secondary: {
      main: '#FFBE61',
    },
  },
  typography: {
    h1: {
      fontFamily: 'PWYummyDonuts',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      '@media (min-width:600px)': {
        fontSize: '0.7rem',
      }
    },
    h2: {
      fontFamily: 'Pacifico',
    },
    h3: {
      fontFamily: 'Pacifico',
    },
    h4: {
      fontFamily: 'Pacifico',
    },
    h5: {
      fontFamily: 'Pacifico',
    },
    h6: {
      fontFamily: 'Pacifico',
    },
    subtitle1: {
      fontFamily: 'Varela Round',
    },
    subtitle2: {
      fontFamily: 'Varela Round',
    },
    button: {
      fontFamily: 'Varela Round',
    },
    caption: {
      fontFamily: 'Varela Round',
    },
    body1: {
      fontFamily: "Varela Round, sans-serif",
    },
    body2: {
      fontFamily: 'Varela Round',
    },
    fontFamily: 'Pacifico',
    overline: {
      fontFamily: 'Varela Round',
    },
    TextField : {
      fontFamily: 'Varela Round',
    }
  },
  overrides: {
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
    },
  },
});

export default Theme