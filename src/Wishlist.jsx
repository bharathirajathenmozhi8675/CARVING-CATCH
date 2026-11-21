
import React from "react";
import "./Wishlist.css";
import {
    ArrowLeft,
    Heart,
    ShoppingCart,
    Trash2
} from "lucide-react";

function Wishlist({ onBack, onAddToCart }) {

    const [wishlist, setWishlist] = React.useState([
        {
            id: 1,
            name: "Fruit Salad",
            description: "Fresh and healthy fruit salad",
            price: "₹50",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },
        {
            id: 2,
            name: "Tomato Pizza",
            description: "Delicious cheese tomato pizza",
            price: "₹150",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
        },
        {
            id: 3,
            name: "Chicken Meal",
            description: "Fresh and tasty chicken meal",
            price: "₹120",
            image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500"
        }
    ]);

    const removeItem = (id) => {
        setWishlist(wishlist.filter((item) => item.id !== id));
    };

    return (
        <div className="wishlist-page">

            <div className="wishlist-header">
                <button onClick={onBack}>
                    <ArrowLeft size={22} />
                </button>

                <div>
                    <h2>My Wishlist</h2>
                    <p>Your favourite foods</p>
                </div>

                <Heart size={25} color="#E87545" />
            </div>

            <div className="wishlist-count">
                <h3>Saved Items</h3>
                <span>{wishlist.length} Items</span>
            </div>

            {wishlist.length > 0 ? (
                <div className="wishlist-list">

                    {wishlist.map((item) => (
                        <div className="wishlist-card" key={item.id}>

                            <img src={item.image} alt={item.name} />

                            <div className="wishlist-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <strong>{item.price}</strong>

                                <button
                                    className="wishlist-cart-btn"
                                    onClick={() => onAddToCart?.(item)}
                                >
                                    <ShoppingCart size={16} />
                                    Add to Cart
                                </button>
                            </div>

                            <button
                                className="wishlist-remove-btn"
                                onClick={() => removeItem(item.id)}
                                title="Remove"
                            >
                                <Trash2 size={19} />
                            </button>

                        </div>
                    ))}

                </div>
            ) : (
                <div className="wishlist-empty">
                    <Heart size={55} />
                    <h3>Your Wishlist is Empty</h3>
                    <p>Add your favourite food items here.</p>
                    <button onClick={onBack}>Explore Foods</button>
                </div>
            )}

        </div>
    );
}

export default Wishlist;
