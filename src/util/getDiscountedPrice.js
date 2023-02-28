export default function getDiscountedPrice(price, discount) {
  let ans = Number((price - (price * discount) / 100).toFixed(2));
  return ans;
}
