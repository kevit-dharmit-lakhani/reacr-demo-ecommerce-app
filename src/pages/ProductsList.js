import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import SmallLoader from "../components/SmallLoader";
import { notifActions } from "../store/notifSlice";

const ProductsListPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loaded, setLoaded] = useState(0);

  const itemsNeeded = "thumbnail,title,description,price,rating";

  const fetchData = useCallback(async () => {
    let res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${loaded}&select=${itemsNeeded}`
    );
    res = await res.json();
    const newProducts = res.products;
    if (newProducts.length < 10) {
      setHasMore(false);
      return;
    }
    setLoaded(loaded + 10);

    setProducts([...products, ...newProducts]);
  }, [loaded, products]);

  const categoryList = async () => {
    let res = await fetch("https://dummyjson.com/products/categories");
    res = await res.json();
    setCategories(res);
  };

  useEffect(
    () => {
      fetchData();
      categoryList();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
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

  const filterHandler = async (event) => {
    const category = event.target.value;
    setProducts((products) => []);
    setLoaded((loaded) => 0);
    setHasMore((more) => true);
    let url =
      category === "all"
        ? `https://dummyjson.com/products?limit=10&select=${itemsNeeded}`
        : `https://dummyjson.com/products/category/${category}?select=${itemsNeeded}`;
    let res = await fetch(url);
    res = await res.json();
    const newProducts = res.products;
    setProducts((product) => newProducts);

    if (newProducts.length < 10) {
      setHasMore((more) => false);
      return;
    }
    setLoaded((loaded) => loaded + 10);
  };

  return (
    <>
      {!products.length && <Loader />}
      <FilterBar onSubmit={filterHandler} categories={categories} />
      <ProductCard products={products} />
      {products.length && hasMore && <SmallLoader />}
    </>
  );
};

export default ProductsListPage;
