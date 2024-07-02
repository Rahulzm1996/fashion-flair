import React, { useEffect, useState } from "react";

import MSnackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = ({
  open = false,
  message = "",
  variant = "",
  setSnackbarInfo,
}) => {
  const [show, setShow] = useState(open);

  const handleClose = () => {
    setShow(false);
    setSnackbarInfo({ open: false, message: "", variant: "" });
  };

  return (
    <MSnackbar
      open={show}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={variant} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MSnackbar>
  );
};

export default Snackbar;
