import { Box, Button, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import { useAppContext } from "../context";
import Snackbar from "./Snackbar";
import { useState } from "react";

const Cart = () => {
  const { cartItemList, setCartItemList } = useAppContext();
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });

  const handleDeleteTshirtCart = (id: number, name: string | undefined) => {
    const newCartItemList = cartItemList.filter((item) => item.id !== id);
    setCartItemList([...newCartItemList]);
    setSnackbarInfo({
      open: true,
      message: `${name} has been removed from cart`,
      variant: "info",
    });
  };

  return (
    <Box sx={{ minHeight: "calc(100%  - 64px - 160px)", padding: "2rem 4rem" }}>
      <Typography variant="body1" mb="16px !important">
        Shopping Cart
      </Typography>

      {snackbarInfo.open && (
        <Snackbar {...snackbarInfo} setSnackbarInfo={setSnackbarInfo} />
      )}

      {cartItemList.length === 0 ? (
        <Typography variant="body1" mb="16px !important">
          There are no items in the cart.
        </Typography>
      ) : (
        <Stack
          spacing={4}
          sx={{ width: "80vw", maxWidth: "400px", marginRight: "auto" }}
        >
          {cartItemList.map((tshirt) => {
            const {
              id,
              qty,
              product: { name, imageURL, price },
            } = tshirt;

            return (
              <Stack
                key={id}
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-evenly"
              >
                <Box
                  sx={{
                    img: {
                      height: "50px",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <img src={imageURL} alt={name} width="100" />
                </Box>
                <Stack>
                  <Typography
                    variant="subtitle2"
                    textAlign="left"
                    fontWeight="bold"
                  >
                    {name}
                  </Typography>
                  <Typography variant="subtitle2" textAlign="left">
                    Rs {price}
                  </Typography>
                </Stack>
                <Typography variant="subtitle2">Qty : {qty}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDeleteTshirtCart(id, name)}
                  sx={{
                    color: "#242525",
                    borderColor: "#242525",
                    "&:hover": {
                      background: "#f2f6f8",
                      borderColor: "#242525",
                    },
                  }}
                >
                  delete
                </Button>
              </Stack>
            );
          })}

          <Divider sx={{ borderColor: "unset", borderWidth: "1px" }} />

          <Stack
            direction="row"
            spacing={2}
            margin="0 auto"
            justifyContent="center"
          >
            <Typography variant="subtitle2" fontWeight="bold">
              Total amount
            </Typography>
            <Typography variant="body2">
              Rs. {cartItemList.reduce((acc, el) => acc + el.total, 0)}
            </Typography>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default Cart;
