import { Box, Typography } from "@mui/material";

import { NO_PAGE_FOUND_IMAGE_URL } from "../constants";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        width: "90vw",
        margin: "0 auto",
        height: "calc(100% - 64px - 160px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={NO_PAGE_FOUND_IMAGE_URL}
        alt="no page found"
        style={{ width: "400px", height: "400px" }}
      />

      <Typography variant="h6" sx={{ my: "16px !important" }}>
        Page not found! please check the url or visit again.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
