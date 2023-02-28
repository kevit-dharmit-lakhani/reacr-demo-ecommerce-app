import { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notifActions } from "../store/notifSlice";
import ProductDetails from "../components/ProductDetails";
import getDiscountedPrice from "../util/getDiscountedPrice";
// import Loader from "../components/Loader";
import ProductsCarousel from "../components/ProductsCarousel";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState({});
  const [carouselItems, setCarouselItems] = useState([]);

  const params = useParams();

  const trialFn = async () => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(Math.ceil(Math.random() * 100));
    }
    const response = await Promise.all(
      arr.map(async (id) => {
        let res = await fetch(`https://dummyjson.com/products/${id}`);
        res = res.json();
        return res;
      })
    );
    setCarouselItems(response);
  };

  const fetchData = useCallback(async () => {
    // console.log("inside useCallback");
    const res = await fetch(`https://dummyjson.com/products/${params.id}`);
    if (!res.ok) {
      console.log("error");
      setIsLoading(false);
    }
    const product = await res.json();
    product.discountedPrice = getDiscountedPrice(
      product.price,
      product.discountPercentage
    );
    setProductData(product);
    await trialFn();
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
      {/* {isLoading && <Loader />} */}
      <ProductDetails product={productData} isLoading={isLoading} />
      <ProductsCarousel items={carouselItems} setIsLoading={setIsLoading} />
    </>
  );
};

export default ProductDetailsPage;
