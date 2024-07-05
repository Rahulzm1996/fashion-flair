import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import { useAppContext } from "../context";
import Snackbar from "./Snackbar";
import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IProduct } from "../types";
import {
  NO_ITEM_IN_CART,
  getAddToCartUrl,
  getCartDetailsUrl,
  removeItemFromCartUrl,
} from "../constants";
import axios from "axios";
import { isEmpty, wrap } from "lodash";
import { ICartProps } from "./types";

const Cart = () => {
  const { cartItemList, setCartItemList, stockDetails } = useAppContext();
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });

  const [state, setState] = useState<{
    loading: boolean;
    cartData: { count: number; resources: Array<IProduct> };
    incrementalProductUpdate: boolean;
  }>({
    loading: false,
    cartData: {
      count: 0,
      resources: [],
    },
    incrementalProductUpdate: true,
  });
  const { loading, incrementalProductUpdate } = state;

  //do it on mount only
  const fetchCartItems = async () => {
    try {
      const { data, status } = await axios.get(getCartDetailsUrl());
      if (status === 200) {
        setCartItemList(data?.resources || []);
        setState((prevState) => ({
          ...prevState,
          cartData: data,
        }));
      }
      //handler other error codes here
    } catch (error) {
      console.error("error occured while fetching cart items ", error);
      setSnackbarInfo({
        open: true,
        message: `Some error occured while fetching cart item`,
        variant: "error",
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    setState({
      loading: true,
      cartData: {
        count: 0,
        resources: [],
      },
    });
    fetchCartItems();
  }, []);

  const handleDeleteProduct = async (id: string, name: string | undefined) => {
    try {
      const { data, status } = await axios.delete(removeItemFromCartUrl(id));
      if (status === 200) {
        setCartItemList(data?.resources || []);

        setSnackbarInfo({
          open: true,
          message: `${name} has been removed from cart`,
          variant: "info",
        });
      }
    } catch (error) {
      console.error("error occured while fetching cart items ", error);
      setSnackbarInfo({
        open: true,
        message: `Error occured while removing ${name} from cart`,
        variant: "error",
      });
    }
  };

  const addProductToCart = async ({
    id,
    quantity,
  }: {
    id: number | string;
    quantity: number;
  }) => {
    setState((prevState) => ({
      ...prevState,
      incrementalProductUpdate: true,
    }));
    try {
      const { data, status } = await axios.put(getAddToCartUrl(), {
        id: id,
        quantity: quantity,
      });
      if (status === 200) {
        setCartItemList(data?.resources || []);
      }
    } catch (error) {
      console.error("error occured while adding product to cart ", error);
      setSnackbarInfo({
        open: true,
        message: `Some error occured while updating quantity`,
        variant: "error",
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        incrementalProductUpdate: false,
      }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100%  - 64px - 160px)",
        flex: 1,
        position: "relative",
      }}
    >
      <Box
        sx={{
          padding: "2rem 4rem",
        }}
      >
        {incrementalProductUpdate && (
          <Stack
            sx={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Stack>
        )}
        {snackbarInfo.open && (
          <Snackbar {...snackbarInfo} setSnackbarInfo={setSnackbarInfo} />
        )}

        {loading ? (
          <Stack
            width="100%"
            height="400px"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Stack>
        ) : null}

        {!loading && isEmpty(cartItemList) ? (
          <Stack
            sx={{ width: "100%", minHeight: "calc(100%  - 64px - 160px)" }}
            justifyContent="center"
            alignItems="center"
          >
            <Stack sx={{ width: "50%", height: "50%", gap: "12px" }}>
              <Typography variant="h6" sx={{ margin: "0 auto" }}>
                There are no items in the cart. Please add items to cart.
              </Typography>
              <img
                src={NO_ITEM_IN_CART}
                alt="no products"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  objectFit: "cover",
                }}
              />
            </Stack>
          </Stack>
        ) : null}

        {!loading && !isEmpty(cartItemList) ? (
          <Stack spacing={5}>
            {cartItemList.map((product) => {
              const { id } = product;
              return (
                <CartItem
                  key={id}
                  product={product}
                  incrementalProductUpdate={incrementalProductUpdate}
                  handleDeleteProduct={handleDeleteProduct}
                  addProductToCart={addProductToCart}
                />
              );
            })}

            <Divider sx={{ borderColor: "unset", borderWidth: "1px" }} />

            <Stack
              direction="row"
              spacing={2}
              margin="0 auto"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight="bold">
                Total amount
              </Typography>
              <Stack direction="row" alignItems={"center"}>
                &#8377;
                <Typography variant="h6">
                  {cartItemList
                    ?.reduce?.((acc, el) => acc + el.quantity * el.price, 0)
                    ?.toFixed(2)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ) : null}
      </Box>
    </Box>
  );
};

const CartItem = (props: ICartProps) => {
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const {
    product,
    incrementalProductUpdate,
    handleDeleteProduct,
    addProductToCart,
  } = props;
  const { id, image, price, quantity, title } = product || {};
  const { stockDetails } = useAppContext();

  const handleRemoveClick = () => {
    addProductToCart({ id: id, quantity: quantity - 1 });
  };

  const handleAddClick = () => {
    const stock = stockDetails?.find((product) => product.id === id)?.stock;
    if (quantity >= stock) {
      setSnackbarInfo({
        open: true,
        message: `${title} out of stock!`,
        variant: "warning",
      });
      return;
    }
    addProductToCart({ id: id, quantity: quantity + 1 });
  };

  return (
    <Stack
      key={id}
      sx={{
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: { xs: "column", sm: "row" },
        rowGap: { xs: "16px", sm: "40px" },
        columnGap: { xs: "0", sm: "16px" },
      }}
    >
      <Box
        sx={{
          img: {
            height: "100px",
            borderRadius: "8px",
          },
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: "100px",
            display: "block",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            objectFit: "cover",
          }}
        />
      </Box>
      <Stack width="100%" gap="8px">
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Stack direction="row" gap="8px" alignItems={"center"}>
          <Stack direction="row" alignItems={"center"}>
            &#8377;<Typography variant="h6"> {price}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap="24px">
        <Stack direction="row" gap="24px">
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
              disabled={quantity === 1 || incrementalProductUpdate}
            >
              <RemoveIcon fontSize="inherit" />
            </IconButton>
            <Typography gutterBottom variant="subtitle2" component="div">
              {quantity}
            </Typography>
            <IconButton
              aria-label="add"
              size="small"
              sx={{ color: "#fff" }}
              onClick={handleAddClick}
              disabled={incrementalProductUpdate}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleDeleteProduct(id, title)}
            disabled={incrementalProductUpdate}
            sx={{
              width: "max-content",
              background: "#0d0d0d",
              "&:hover": {
                background: "#0d0d0d",
              },
              "&.MuiButtonBase-root.Mui-disabled": {
                color: "white",
                background: "#0d0d0d",
                cursor: "not-allowed",
                "&:hover": {
                  background: "#0d0d0d",
                },
              },
            }}
          >
            Remove
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          gap="8px"
          alignItems="center"
        >
          <Typography variant="subtitle2" display="block" gutterBottom>
            {`Price (${quantity} ${quantity === 1 ? "item" : "items"})`}
          </Typography>
          <Stack direction="row" alignItems="center">
            &#8377;
            <Typography variant="h6" gutterBottom component="span">
              {(price * quantity).toFixed(2)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {snackbarInfo.open && (
        <Snackbar {...snackbarInfo} setSnackbarInfo={setSnackbarInfo} />
      )}
    </Stack>
  );
};

export default Cart;
