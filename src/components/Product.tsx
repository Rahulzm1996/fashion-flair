import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Box, IconButton, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { IProduct, ITshirt } from "../types";
import Snackbar from "./Snackbar";
import { useAppContext } from "../context";
import { StyledCard } from "./styles";

const Product = ({
  id,
  description,
  category,
  image,
  price,
  rating,
  stock,
  title,
}: IProduct) => {
  const { cartItemList, setCartItemList } = useAppContext();

  const [count, setCount] = useState(0);

  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);

  const handleAddToCartClick = () => {
    setIsAddToCartClicked(true);
  };

  const handleRemoveClick = () => {
    //show msg when selected qty is 0
    if (count === 0) {
      setSnackbarInfo({
        open: true,
        message: "quantity cannot be 0 to add",
        variant: "error",
      });
      return;
    }

    const updatedCount = count - 1;
    if (updatedCount === 0) {
      //remove tshirt from cart
      const newCartList = cartItemList.filter((el) => el.id !== id);
      setCartItemList([...newCartList]);
      setSnackbarInfo({
        open: true,
        message: `${name} tshirt has been removed from the cart`,
        variant: "info",
      });
    } else {
      //subtract qty from cart
      const updatedCartItemList = cartItemList.map((el) => {
        if (el.id === id && count - 1 !== 0) {
          return { ...el, qty: count - 1, total: price * (count - 1) };
        }
        return el;
      });

      setCartItemList([...updatedCartItemList]);
    }

    setCount((count) => count - 1);
  };

  const handleAddClick = () => {
    if (quantity === 0 || quantity <= count + 1) {
      //show msg when selected qty is >= available quantity
      setSnackbarInfo((prev) => ({
        open: true,
        message: "no more quantity available",
        variant: "warning",
      }));
    }

    if (
      cartItemList.length === 0 ||
      cartItemList.findIndex((el) => el.id === id) === -1
    ) {
      //add tshirt to cart if its not there in cart
      const item = {
        id: id,
        qty: count + 1,
        total: price,
        product: { id, name, price, color, quantity, imageURL },
      };
      cartItemList.push(item);
      setCartItemList([...cartItemList]);
      setSnackbarInfo({
        open: true,
        message: `${name} tshirt has been added to the cart`,
        variant: "success",
      });
    } else {
      //update tshirt qty and price in cart if its available in cart
      const updatedCartItemList = cartItemList.map((el) => {
        if (el.id === id) {
          return { ...el, qty: count + 1, total: price * (count + 1) };
        }
        return el;
      });
      setCartItemList([...updatedCartItemList]);
    }
    setCount((count) => count + 1);
  };

  useEffect(() => {
    if (cartItemList.length === 0) return;

    //setting count here if tshirt is present in cart and
    //user comes back from cart to products page
    const currentTshirtIncart = cartItemList.find((el) => el.id === id);
    if (currentTshirtIncart?.id) {
      setCount(currentTshirtIncart.qty);
    }
  }, [cartItemList, id]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <StyledCard key={id}>
        <CardMedia
          component="img"
          alt={name}
          width="100%"
          height="180"
          image={image}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Typography gutterBottom variant="subtitle2" component="div">
              {title}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Rs {price}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            {isAddToCartClicked ? (
              <Button
                variant="contained"
                size="small"
                onClick={handleAddToCartClick}
                sx={{
                  marginLeft: "auto",
                  background: "#0d0d0d",
                  "&:hover": {
                    background: "#0d0d0d",
                  },
                }}
              >
                Add to cart
              </Button>
            ) : (
              <Box
                sx={{
                  color: "#fff",
                  background: "#0d0d0d",
                  width: "80px",
                  borderRadius: "4px",
                  marginLeft: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "& .MuiIconButton-root.Mui-disabled": {
                    backgroundColor: "unset",
                    color: "unset",
                    pointerEvents: "unset",
                    cursor: "not-allowed",
                  },
                }}
              >
                <IconButton
                  aria-label="sub"
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={handleRemoveClick}
                  disabled={count === 0}
                >
                  <RemoveIcon fontSize="inherit" />
                </IconButton>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {count}
                </Typography>
                <IconButton
                  aria-label="add"
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={handleAddClick}
                  disabled={count >= stock ? true : false}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
            )}
          </Stack>
        </CardContent>
      </StyledCard>

      {snackbarInfo.open && (
        <Snackbar {...snackbarInfo} setSnackbarInfo={setSnackbarInfo} />
      )}
    </Grid>
  );
};

export default Product;
