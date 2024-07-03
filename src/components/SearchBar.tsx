import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useHistory } from "react-router-dom";
import { ISearchBarProps } from "../types";

const SearchBar = ({ products }: ISearchBarProps) => {
  const [searchedText, setSearchedText] = useState("");
  const history = useHistory();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  const handleproductsSearch = () => {
    if (!searchedText) return;

    const filteredSearchResults = products.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(searchedText.toLowerCase())
      )
    );

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
          sx={{ width: { xs: "100%", sm: "50%" } }}
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
