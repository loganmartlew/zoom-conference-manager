import { GlobalStyles, Theme } from '@mui/material';

const styles = (theme: Theme) => ({
  ':root': {
    '--toastify-color-info': theme.palette.info.main,
    '--toastify-color-success': theme.palette.success.main,
    '--toastify-color-warning': theme.palette.warning.main,
    '--toastify-color-error': theme.palette.error.main,
  },
});

const notificationStyles = <GlobalStyles styles={styles} />;

export default notificationStyles;
