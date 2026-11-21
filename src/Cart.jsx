
import React from "react";
import "./Cart.css";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2
} from "lucide-react";

function Cart({
    cartItems = [],
    onIncrease,
    onDecrease,
    onRemove,
    onBack,
    onCheckout
}) {

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-page">

      <div className="cart-header">
        <button className="cart-back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <h2>My Cart</h2>

        <ShoppingCart size={25} />
      </div>

      {cartItems.length === 0 ? (

        <div className="empty-cart">
          <ShoppingCart size={65} />
          <h2>Your Cart is Empty!</h2>
          <p>Add delicious food to your cart.</p>

          <button onClick={onBack}>
            Explore Food
          </button>
        </div>

      ) : (

        <>
          <div className="cart-items">

            {cartItems.map((item) => (

              <div className="cart-item" key={item.id}>

                <img src={item.image} alt={item.name} />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div className="quantity-controls">

                    <button onClick={() => onDecrease(item.id)}>
                      <Minus size={15} />
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => onIncrease(item.id)}>
                      <Plus size={15} />
                    </button>

                  </div>
                </div>

                <button
                  className="cart-delete-btn"
                  onClick={() => onRemove(item.id)}
                >
                  <Trash2 size={20} />
                </button>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h3>Order Summary</h3>

            <div>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div>
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>

            <hr />

            <div className="cart-total">
              <strong>Total</strong>
              <strong>₹{total}</strong>
            </div>

           <button
    className="checkout-btn"
    onClick={onCheckout}
    disabled={cartItems.length === 0}
>
    Proceed to Checkout
</button>

          </div>
        </>

      )}

    </div>
  );
}

export default Cart;
