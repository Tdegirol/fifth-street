import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Sort from "../components/Sort";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <Sort />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
