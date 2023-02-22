import { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notifActions } from "../store/notifSlice";
import ProductDetails from "../components/ProductDetails";
import Loader from "../components/Loader";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState({});

  const params = useParams();

  const fetchData = useCallback(async () => {
    // console.log("inside useCallback");
    let res = await fetch(`https://dummyjson.com/products/${params.id}`);
    if (!res.ok) {
      console.log("error");
      setIsLoading(false);
    }
    const product = await res.json();
    setProductData(product);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    // console.log("inside useEffect");
    fetchData();
  }, [fetchData]);

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
      {isLoading && <Loader />}
      <ProductDetails product={productData} />
    </>
  );
};

export default ProductDetailsPage;
