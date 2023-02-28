import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import { notifActions } from "../store/notifSlice";

import classes from "./ProductsList.module.css";

const ProductsListPage = () => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loaded, setLoaded] = useState(0);

  const itemsNeeded = "thumbnail,title,discountPercentage,price,rating";

  const getData = useCallback(async (url) => {
    let res = await fetch(url);
    res = await res.json();
    const newProducts = res.products;
    if (newProducts.length < 15) {
      setHasMore(false);
      return newProducts;
    }
    setLoaded((loaded) => loaded + 15);
    return newProducts;
  }, []);

  const fetchData = useCallback(async () => {
    const newProducts = await getData(
      `https://dummyjson.com/products?limit=15&skip=${loaded}&select=${itemsNeeded}`
    );

    setProducts([...products, ...newProducts]);
  }, [loaded, products, getData]);

  const categoryList = async () => {
    let res = await fetch("https://dummyjson.com/products/categories");
    res = await res.json();
    setCategories(res);
  };

  const searchQueryHandler = useCallback(
    async (query) => {
      setProducts([]);
      setLoaded(0);
      setHasMore(true);

      const newProducts = await getData(
        `https://dummyjson.com/products/search?q=${query}`
      );
      setProducts(newProducts);
    },
    [getData]
  );

  const filterHandler = useCallback(
    async (category) => {
      setProducts([]);
      setLoaded(0);
      setHasMore(true);
      let url =
        category === "all"
          ? `https://dummyjson.com/products?limit=15&select=${itemsNeeded}`
          : `https://dummyjson.com/products/category/${category}?select=${itemsNeeded}`;

      const newProducts = await getData(url);
      setProducts(newProducts);
    },
    [getData]
  );

  useEffect(
    () => {
      fetchData();
      categoryList();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (params.get("category")) {
      filterHandler(params.get("category"));
    } else if (params.get("searchQuery")) {
      searchQueryHandler(params.get("searchQuery"));
    }
  }, [params, searchQueryHandler, filterHandler]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 490) {
        hasMore && fetchData();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [fetchData, hasMore]);

  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  if (storedUserLoggedInInformation === null) {
    dispatch(
      notifActions.newNotif({
        type: "fail",
        message: "Please sign in to your account or create a new account",
      })
    );
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.filterBar}>
          <FilterBar onSubmit={filterHandler} categories={categories} />
        </div>
        <div className={classes.productsCard}>
          <ProductCard products={products} hasMore={hasMore} />
        </div>
      </div>
    </>
  );
};

export default ProductsListPage;
