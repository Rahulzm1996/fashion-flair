import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Stack, Typography } from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";

import Filters from "./Filters";
import { ISearchBarProps } from "../types";

const SearchBar = ({
  products,
  productsList,
  setproductsList,
}: ISearchBarProps) => {
  const [searchedText, setSearchedText] = useState("");
  const history = useHistory();
  const { url, path } = useRouteMatch();
  console.log({ url, path });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);

    //when clear the input field, show all the products
    if (e.target.value === "") {
      setproductsList(products);
    }
  };

  const handleproductsSearch = () => {
    if (!searchedText) return;

    const filteredSearchResults = products.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(searchedText.toLowerCase())
      )
    );
    // setproductsList(filteredsearchResults);
    console.log({ filteredSearchResults });

    history.push("/search", { searchResults: filteredSearchResults });
  };

  return (
    <Box sx={{ width: "100%", padding: "24px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Input
          type="text"
          value={searchedText}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.charCode === 13 || event.which === 13) {
              //handling enter key press here for search
              handleproductsSearch();
            }
          }}
          placeholder="Search for products.."
          inputProps={{ "aria-label": "search box" }}
          sx={{ width: "40%" }}
        />

        {/* //keeping search button disable if searched it empty */}
        <IconButton
          aria-label="search"
          onClick={handleproductsSearch}
          size="small"
          disabled={!searchedText}
          sx={{
            color: "#fff",
            background: "#242525",
            padding: "4px",
            borderRadius: "4px",
            "&:hover": {
              color: "#fff",
              background: "#242525",
            },
            "&.MuiIconButton-root.Mui-disabled": {
              cursor: "not-allowed",
              pointerEvents: "unset",

              "&:hover": {
                color: "unset",
                background: "unset",
              },
            },
          }}
        >
          <SearchOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;
