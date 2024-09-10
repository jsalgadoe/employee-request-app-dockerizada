/* eslint-disable react/prop-types */
import { SxProps, Theme } from "@mui/material";
import Alert, { AlertColor } from "@mui/material/Alert";

export const AlertMuiComponent = ({
  message,
  icon,
  styles,
  severity,
  variant,
  setError,
}) => {
  const close = () => {
    setError("");
  };

  return (
    <Alert
      onClose={close}
      icon={icon}
      severity={severity}
      sx={styles}
      variant={variant}
    >
      {message}
    </Alert>
  );
};
