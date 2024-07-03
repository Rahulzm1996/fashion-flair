import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Box, Chip, IconButton, Stack, Tooltip } from "@mui/material";
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
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Product = ({
  id,
  description,
  category,
  image,
  price,
  rating,
  stock,
  title,
  product,
}: IProduct) => {
  const history = useHistory();
  const { cartItemList, setCartItemList } = useAppContext();
  const isProductAlreadyInCart = cartItemList.some(
    (product) => product.id === id
  );
  console.log({
    cartItemList,
    id,
    description,
    category,
    image,
    price,
    rating,
    stock,
    title,
    isProductAlreadyInCart,
  });

  const [count, setCount] = useState(0);

  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);

  const handleAddToCartClick = () => {
    setIsAddToCartClicked(true);
    setSnackbarInfo({
      open: true,
      message: `${title} tshirt has been added to the cart`,
      variant: "success",
    });
    setCartItemList((prevList) => [
      ...prevList,
      { ...product, stock: product.stock - 1 },
    ]);
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
      <Link to={`/products/${id}`}>
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
            <Stack width="100%" gap="8px">
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              {description ? (
                <Tooltip title={description}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    width={"100%"}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {description}
                  </Typography>
                </Tooltip>
              ) : null}

              <Stack
                gap="12px"
                alignItems="center"
                direction="row"
                flexWrap="wrap"
              >
                <Chip
                  icon={<StarPurple500SharpIcon />}
                  label={rating.rate}
                  size="small"
                />{" "}
                <Typography variant="caption">{rating.count} Rating</Typography>
                <Chip label={category} size="small" variant="outlined" />
              </Stack>

              <Stack direction="row" gap="8px" alignItems={"center"}>
                <Stack direction="row" alignItems={"center"}>
                  &#8377;<Typography variant="h6"> {price}</Typography>
                </Stack>
                <Typography
                  variant="caption"
                  width={"100%"}
                  color={stock === 0 ? "red" : "green"}
                >
                  {stock === 0 ? "out of stock" : `${stock} in stock`}
                </Typography>
              </Stack>
            </Stack>
            {isAddToCartClicked ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => history.push("/cart")}
                fullWidth
                sx={{
                  background: "#0d0d0d",
                  "&:hover": {
                    background: "#0d0d0d",
                  },
                }}
              >
                Go to cart
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={handleAddToCartClick}
                fullWidth
                disabled={stock === 0}
                sx={{
                  background: "#0d0d0d",
                  "&:hover": {
                    background: "#0d0d0d",
                  },
                }}
              >
                Add to cart
              </Button>
            )}

            {/* <Stack
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
          </Stack> */}
          </CardContent>
        </StyledCard>
        {snackbarInfo.open && (
          <Snackbar {...snackbarInfo} setSnackbarInfo={setSnackbarInfo} />
        )}
      </Link>
    </Grid>
  );
};

export default Product;
