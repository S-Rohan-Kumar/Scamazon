export function addDecimal(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {

  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );

  state.shippingPrice = Number(state.itemsPrice) > 100 ? 0 : 10;

  state.taxPrice = addDecimal(Number(state.itemsPrice) * 0.08);

  state.totalPrice = addDecimal(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice),
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
