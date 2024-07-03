import Button from "@mui/material/Button";
import { Chip, Stack, Tooltip } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { IProduct } from "../types";
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
  product,
}: IProduct) => {
  const history = useHistory();
  const { setCartItemList } = useAppContext();

  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);

  const handleAddToCartClick = (e) => {
    e.preventDefault();
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
