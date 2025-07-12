import Image from "next/image";
import Link from "next/link";
import { memo, useMemo, useCallback } from "react";

type Item = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type Props = {
  title: string;
  icon: string;
  items: Item[];
  total: number;
  threshold: number;
  removeItem: (id: string) => void;
  viewUrl: string;
  showCheckout?: boolean;
};

function CartDropdownBoxComponent({
  title,
  items,
  icon,
  total,
  threshold,
  removeItem,
  viewUrl,
  showCheckout = false,
}: Props) {
  const itemCount = useMemo(() => items.length, [items]);
  const remaining = useMemo(
    () => Math.max(threshold - total, 0),
    [threshold, total]
  );
  const progressPercent = useMemo(
    () => Math.min((total / threshold) * 100, 100).toFixed(2),
    [total, threshold]
  );

  const handleRemove = useCallback(
    (id: string) => () => removeItem(id),
    [removeItem]
  );

  return (
    <div className="btn-border-only cart category-hover-header relative">
      <i className={icon} />
      <span className="number">{itemCount}</span>

      <div className="category-sub-menu card-number-show overflow-auto p-5">
        <h5 className="shopping-cart-number">
          {title} ({itemCount.toString().padStart(2, "0")})
        </h5>
        {itemCount === 0 ? (
          <p className="text-muted">No items in your {title.toLowerCase()}.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="cart-item-1 border-top">
              <div className="img-name">
                <div
                  className="close section-activation"
                  onClick={() => removeItem(item.id)}
                >
                  <i className="fa-regular fa-x" />
                </div>
                <div className="thumbanil">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={60}
                    height={60}
                  />
                </div>
                <div className="details">
                  <Link href="/shop/details-profitable-business-makes-your-profit">
                    <h5 className="title">{item.title}</h5>
                  </Link>
                  <div className="number">
                    {item.quantity} <i className="fa-regular fa-x" />
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="sub-total-cart-balance mt-4">
          <div className="bottom-content-deals">
            <div className="top d-flex justify-content-between mb-2">
              <span>Sub Total:</span>
              <span className="number-c fw-bold">${total.toFixed(2)}</span>
            </div>

            <div className="single-progress-area-incard mb-2">
              <div
                className="progress"
                role="progressbar"
                aria-valuenow={parseFloat(progressPercent)}
              >
                <div
                  className="progress-bar wow fadeInLeft"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {remaining > 0 && (
              <p className="text-sm text-muted">
                Spend <span className="fw-bold">${remaining.toFixed(2)}</span>{" "}
                more to reach{" "}
                <span className="text-success fw-bold">Free Shipping</span>.
              </p>
            )}
          </div>

          <div className="button-wrapper d-flex align-items-center justify-content-between mt-4">
            <Link href={viewUrl} className="rts-btn btn-primary">
              View {title}
            </Link>
            {showCheckout && (
              <Link
                href="/checkout"
                className="rts-btn btn-primary border-only"
              >
                Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CartDropdownBoxComponent);
