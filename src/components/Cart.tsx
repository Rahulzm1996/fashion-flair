import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import { useAppContext } from "../context";
import Snackbar from "./Snackbar";
import { useState } from "react";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IProduct } from "../types";

const Cart = () => {
  const { cartItemList, setCartItemList } = useAppContext();
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });

  return (
    <Box
      sx={{
        minHeight: "calc(100%  - 64px - 160px)",
        padding: "2rem 4rem",
        flex: 1,
      }}
    >
      <Typography variant="h5" mb="16px !important">
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
        <Stack spacing={4}>
          {cartItemList.map((product) => {
            const {
              id,
              description,
              category,
              image,
              price,
              rating,
              stock,
              title,
            } = product;
            console.log({ product });

            return <CartItem key={id} product={product} />;

            // return (
            //   <Stack
            //     key={id}
            //     direction="row"
            //     spacing={2}
            //     alignItems="center"
            //     justifyContent="space-evenly"
            //   >
            //     <Box
            //       sx={{
            //         img: {
            //           height: "100px",
            //           borderRadius: "8px",
            //         },
            //       }}
            //     >
            //       <img
            //         src={image}
            //         alt={title}
            //         width="100"
            //         style={{
            //           display: "block",
            //           backgroundSize: "cover",
            //           backgroundRepeat: "no-repeat",
            //           backgroundPosition: "center",
            //           width: "100%",
            //           objectFit: "cover",
            //         }}
            //       />
            //     </Box>
            //     <Stack width="100%" gap="8px">
            //       <Typography gutterBottom variant="h6" component="div">
            //         {title}
            //       </Typography>
            //       {description ? (
            //         <Tooltip title={description}>
            //           <Typography
            //             gutterBottom
            //             variant="caption"
            //             component="div"
            //             width={"100%"}
            //             sx={{
            //               overflow: "hidden",
            //               textOverflow: "ellipsis",
            //               display: "-webkit-box",
            //               WebkitLineClamp: "2",
            //               WebkitBoxOrient: "vertical",
            //             }}
            //           >
            //             {description}
            //           </Typography>
            //         </Tooltip>
            //       ) : null}

            //       <Stack
            //         gap="12px"
            //         alignItems="center"
            //         direction="row"
            //         flexWrap="wrap"
            //       >
            //         <Chip
            //           icon={<StarPurple500SharpIcon />}
            //           label={rating.rate}
            //           size="small"
            //         />{" "}
            //         <Typography variant="caption">
            //           {rating.count} Rating
            //         </Typography>
            //         <Chip label={category} size="small" variant="outlined" />
            //       </Stack>

            //       <Stack direction="row" gap="8px" alignItems={"center"}>
            //         <Stack direction="row" alignItems={"center"}>
            //           &#8377;<Typography variant="h6"> {price}</Typography>
            //         </Stack>
            //         <Typography variant="caption" width={"100%"} color="green">
            //           {stock} in stock
            //         </Typography>
            //       </Stack>
            //     </Stack>
            //     <Stack>
            //       <Box
            //         sx={{
            //           color: "#fff",
            //           background: "#0d0d0d",
            //           width: "80px",
            //           borderRadius: "4px",
            //           marginLeft: "auto",
            //           display: "flex",
            //           justifyContent: "space-between",
            //           alignItems: "center",
            //           "& .MuiIconButton-root.Mui-disabled": {
            //             backgroundColor: "unset",
            //             color: "unset",
            //             pointerEvents: "unset",
            //             cursor: "not-allowed",
            //           },
            //         }}
            //       >
            //         <IconButton
            //           aria-label="sub"
            //           size="small"
            //           sx={{ color: "#fff" }}
            //           // onClick={handleRemoveClick}
            //           // disabled={count === 0}
            //         >
            //           <RemoveIcon fontSize="inherit" />
            //         </IconButton>
            //         <Typography
            //           gutterBottom
            //           variant="subtitle2"
            //           component="div"
            //         >
            //           {4}
            //         </Typography>
            //         <IconButton
            //           aria-label="add"
            //           size="small"
            //           sx={{ color: "#fff" }}
            //           // onClick={handleAddClick}
            //           // disabled={count >= stock ? true : false}
            //         >
            //           <AddIcon fontSize="inherit" />
            //         </IconButton>
            //       </Box>
            //     </Stack>
            //     <Button
            //       variant="outlined"
            //       size="small"
            //       onClick={() => handleDeleteTshirtCart(id, name)}
            //       sx={{
            //         color: "#242525",
            //         borderColor: "#242525",
            //         "&:hover": {
            //           background: "#f2f6f8",
            //           borderColor: "#242525",
            //         },
            //       }}
            //     >
            //       delete
            //     </Button>
            //   </Stack>
            // );
          })}

          <Divider sx={{ borderColor: "unset", borderWidth: "1px" }} />

          {/* <Stack
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
          </Stack> */}
        </Stack>
      )}
    </Box>
  );
};

export interface ICartProps {
  product: IProduct;
}

const CartItem = (props: ICartProps) => {
  const { cartItemList, setCartItemList } = useAppContext();
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const { product } = props;
  const { id, description, category, image, price, rating, stock, title } =
    product || {};
  const [quantity, setQuantity] = useState(1);

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
    if (stock <= 0) {
      //show msg when selected qty is >= available stock
      setSnackbarInfo({
        open: true,
        message: "no more stock available",
        variant: "warning",
      });
    }

    //update tshirt qty and price in cart if its available in cart
    const updatedCartItemList = cartItemList.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          stock: el.stock - 1,
        };
      }
      return el;
    });
    setCartItemList([...updatedCartItemList]);
    setQuantity((quantity) => quantity + 1);
  };

  const handleDeleteProduct = (id: number, name: string | undefined) => {
    const newCartItemList = cartItemList.filter((item) => item.id !== id);
    setCartItemList([...newCartItemList]);
    setSnackbarInfo({
      open: true,
      message: `${name} has been removed from cart`,
      variant: "info",
    });
  };

  return (
    <Stack
      key={id}
      direction="row"
      spacing={4}
      alignItems="center"
      justifyContent="space-evenly"
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

        <Stack gap="12px" alignItems="center" direction="row" flexWrap="wrap">
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
      <Stack gap="24px">
        <Stack direction="row" gap="8px">
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
              // onClick={handleRemoveClick}
              // disabled={count === 0}
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
              disabled={stock === 0}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleDeleteProduct(id, title)}
            sx={{
              color: "#242525",
              borderColor: "#242525",
              "&:hover": {
                background: "#f2f6f8",
                borderColor: "#242525",
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
              {price * quantity}
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
