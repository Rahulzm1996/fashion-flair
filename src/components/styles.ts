import { styled } from "@mui/material";
import Card from "@mui/material/Card";

export const StyledCard = styled(Card)({
  "&.MuiCard-root": {
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    background: "#e5e9ec",
    padding: "12px",

    "&:hover": {
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    },

    "& .MuiCardContent-root": {
      padding: "8px",
    },
  },
});
