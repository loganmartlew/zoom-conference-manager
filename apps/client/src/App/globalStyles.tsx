import { GlobalStyles } from '@mui/material';

const styles = {
  'body, #root': {
    minHeight: '100vh',
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
};

const globalStyles = <GlobalStyles styles={styles} />;

export default globalStyles;
