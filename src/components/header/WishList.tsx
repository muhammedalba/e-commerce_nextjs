
import React from "react";
import { useWishlist } from "./WishlistContext";
// import "react-toastify/dist/ReactToastify.css";
import CartDropdownBox from "./CartDropdownBox";
const WishList: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const total = wishlistItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (

      <CartDropdownBox
        title="Wishlist"
        items={wishlistItems.map((item) => ({
          ...item,
          id: String(item.id),
        }))}
        icon="fa-regular fa-heart"
        total={total}
        threshold={50}
        removeItem={(id: string) => removeFromWishlist(Number(id))}
        viewUrl="/Wishlist"
        showCheckout={false}
      />
  );
};

export default WishList;
