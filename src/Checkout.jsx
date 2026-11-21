
import React, { useState } from "react";
import "./Checkout.css";
import {
    ArrowLeft,
    MapPin,
    CreditCard,
    CheckCircle
} from "lucide-react";

function Checkout({ cartItems = [], onBack, onPlaceOrder }) {

    const [step, setStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [delivery, setDelivery] = useState({
        name: "",
        phone: "",
        address: "",
        pincode: ""
    });

    const [payment, setPayment] = useState("Cash on Delivery");

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const deliveryFee = cartItems.length > 0 ? 30 : 0;
    const total = subtotal + deliveryFee;

    const handleChange = (e) => {
        setDelivery({
            ...delivery,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = (e) => {
        e.preventDefault();

        if (
            !delivery.name.trim() ||
            !delivery.phone.trim() ||
            !delivery.address.trim() ||
            !delivery.pincode.trim()
        ) {
            alert("Please fill all delivery details");
            return;
        }

        if (!/^[0-9]{10}$/.test(delivery.phone)) {
            alert("Enter a valid 10 digit phone number");
            return;
        }

        if (!/^[0-9]{6}$/.test(delivery.pincode)) {
            alert("Enter a valid 6 digit pincode");
            return;
        }

        setStep(2);
    };

    const handlePlaceOrder = () => {
        setOrderPlaced(true);

        if (onPlaceOrder) {
            onPlaceOrder({
                delivery,
                payment,
                cartItems,
                total
            });
        }
    };

    if (orderPlaced) {
        return (
            <div className="checkout-page">
                <div className="order-success">
                    <CheckCircle size={75} color="#22a06b" />

                    <h2>Order Placed Successfully!</h2>

                    <p>Thank you for ordering with CARVING-CATCH.</p>

                    <h3>Total Amount: ₹{total}</h3>

                    <button onClick={onBack}>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">

            <div className="checkout-header">

                <button
                    className="checkout-back"
                    onClick={() => {
                        if (step === 2) {
                            setStep(1);
                        } else {
                            onBack?.();
                        }
                    }}
                >
                    <ArrowLeft size={20} />
                </button>

                <h2>Checkout</h2>

            </div>

            <div className="checkout-steps">
                <div className={step === 1 ? "active-step" : "completed-step"}>
                    1. Delivery
                </div>

                <div className={step === 2 ? "active-step" : ""}>
                    2. Payment
                </div>
            </div>

            {step === 1 ? (

                <form className="checkout-form" onSubmit={handleNext}>

                    <h3>
                        <MapPin size={20} />
                        Delivery Details
                    </h3>

                    <label>Customer Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={delivery.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone Number</label>

                    <input
                        type="tel"
                        name="phone"
                        placeholder="10 digit mobile number"
                        value={delivery.phone}
                        onChange={handleChange}
                        maxLength={10}
                        required
                    />

                    <label>Delivery Address</label>

                    <textarea
                        name="address"
                        placeholder="Enter your full address"
                        value={delivery.address}
                        onChange={handleChange}
                        required
                    />

                    <label>Pincode</label>

                    <input
                        type="text"
                        name="pincode"
                        placeholder="6 digit pincode"
                        value={delivery.pincode}
                        onChange={handleChange}
                        maxLength={6}
                        required
                    />

                    <button type="submit" className="checkout-next">
                        Next
                    </button>

                </form>

            ) : (

                <div className="checkout-form">

                    <h3>
                        <CreditCard size={20} />
                        Payment Details
                    </h3>

                    <div className="payment-options">

                        <label>
                            <input
                                type="radio"
                                value="Cash on Delivery"
                                checked={payment === "Cash on Delivery"}
                                onChange={(e) => setPayment(e.target.value)}
                            />
                            Cash on Delivery
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="UPI"
                                checked={payment === "UPI"}
                                onChange={(e) => setPayment(e.target.value)}
                            />
                            UPI
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="Card"
                                checked={payment === "Card"}
                                onChange={(e) => setPayment(e.target.value)}
                            />
                            Debit / Credit Card
                        </label>

                    </div>

                    <div className="checkout-summary">
                        <h3>Order Summary</h3>

                        <p>
                            Subtotal <strong>₹{subtotal}</strong>
                        </p>

                        <p>
                            Delivery Fee <strong>₹{deliveryFee}</strong>
                        </p>

                        <hr />

                        <h3>
                            Total <strong>₹{total}</strong>
                        </h3>
                    </div>

                    <button
                        className="checkout-next"
                        onClick={handlePlaceOrder}
                        disabled={cartItems.length === 0}
                    >
                        Place Order - ₹{total}
                    </button>

                </div>

            )}

        </div>
    );
}

export default Checkout;
