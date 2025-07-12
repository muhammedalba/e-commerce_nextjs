
import { useCart } from "./CartContext";
import CartDropdownBox from "./CartDropdownBox";

const CartDropdown: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();

  const activeItems = cartItems.filter((item) => item.active);
  const total = activeItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  return (

      <CartDropdownBox
        title="Shopping Cart"
        items={activeItems.map((item) => ({
          ...item,
          id: String(item.id),
        }))}
        icon="fa-sharp fa-regular fa-cart-shopping"
        total={total}
        threshold={50}
        removeItem={(id: string) => removeFromCart(Number(id))}
        viewUrl="/cart"
        showCheckout
      />

  );
};

export default CartDropdown;
