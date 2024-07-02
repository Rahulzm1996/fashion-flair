import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import "./App.css";

import { AppProvider } from "./context";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import NotFoundPage from "./components/NotFoundPage";
import SearchResults from "./components/SearchResults";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <AppProvider>
      <Stack
        sx={{ width: "100vw", minHeight: "100vh", flexDirection: "column" }}
      >
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Layout />
            </Route>
            <Route exact path="/products">
              <Layout />
            </Route>
            <Route exact path="/products/:id">
              <ProductDetails />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/search">
              <SearchResults />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </Stack>
    </AppProvider>
  );
}

export default App;