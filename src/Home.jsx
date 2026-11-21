
import React, { useState } from "react";
import "./Home.css";
import Orders from "./Order.jsx";
import Profile from "./Profile.jsx";
import Wishlist from "./Wishlist.jsx";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";

import {
    MapPin,
    Bell,
    ShoppingBag,
    Home as HomeIcon,
    Heart,
    User,
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

function Home({ onLogout, userData }) {

    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [activeTab, setActiveTab] = useState("Home");
    const [navOpen, setNavOpen] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    const [checkoutData, setCheckoutData] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);

    const categories = [
        { name: "Chicken", icon: "🍗" },
        { name: "Noodles", icon: "🍜" },
        { name: "All", icon: "🍔" },
        { name: "Pizza", icon: "🍕" },
        { name: "Healthy", icon: "🥗" }
    ];
    

    const foods = [
        {
            id: 1,
            name: "Fruit Salad",
            category: "Healthy",
            description: "A plate of Fruit Salad",
            price: 50,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
        },
        {
            id: 2,
            name: "Tomato Pizza",
            category: "Pizza",
            description: "9-10 inch pizza",
            price: 150,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
        },
        {
            id: 3,
            name: "Chicken Meal",
            category: "Chicken",
            description: "Fresh chicken meal",
            price: 120,
            image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500"
        },
        {
            id: 4,
            name: "Noodles",
            category: "Noodles",
            description: "Delicious noodles",
            price: 100,
            image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500"
        }
    ];

    // Add food to cart
    const addToCart = (food) => {

        setCartItems((previousItems) => {

            const existingItem = previousItems.find(
                (item) => item.id === food.id
            );

            if (existingItem) {
                return previousItems.map((item) =>
                    item.id === food.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...previousItems,
                { ...food, quantity: 1 }
            ];
        });
    };

    // Increase quantity
    const increaseQuantity = (id) => {
        setCartItems((previousItems) =>
            previousItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Decrease quantity
    const decreaseQuantity = (id) => {
        setCartItems((previousItems) =>
            previousItems
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // Remove food from cart
    const removeFromCart = (id) => {
        setCartItems((previousItems) =>
            previousItems.filter((item) => item.id !== id)
        );
    };
    // Place Order
const handlePlaceOrder = (order) => {

    const newOrder = {
        id: "CC" + Date.now(),
        items: order.cartItems.map((item) => ({ ...item })),
        total: order.total,
        payment: order.payment,
        delivery: order.delivery,
        date: new Date().toLocaleDateString("en-IN"),
        status: "Pending"
    };

    // Save order in history
    setOrderHistory((previousOrders) => [
        newOrder,
        ...previousOrders
    ]);

    // Clear cart after order
    setCartItems([]);
};

    // Total cart quantity
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const filteredFoods = foods.filter((food) => {

        const matchesCategory =
            category === "All" || food.category === category;

        const matchesSearch =
            food.name.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="home-container">

            <div className="home-screen">

                {/* Brand Header */}

                <div className="brand-header">

                    <div className="brand-name">
                        <span className="brand-logo">🍔</span>
                        <h2>CARVING-CATCH</h2>
                    </div>

                    <div className="user-profile">

                        <div className="profile-icon">
                            <User size={22} />
                        </div>

                        <div className="profile-details">
                            <small>Welcome back</small>
                            <h4>{userData?.name || "Your Name"}</h4>
                        </div>

                    </div>

                </div>

                {/* Location Header */}

                <div className="location-header">

                    <div className="location-info">

                        <MapPin size={22} color="#E87545" />

                        <div>
                            <small>Current Location</small>
                            <h4>Virudhachalam, Tamil Nadu</h4>
                        </div>

                    </div>

                    <div className="header-actions">

                        <button>
                            <Bell size={21} />
                        </button>

                        <button onClick={() => setActiveTab("Cart")}>
                            <ShoppingBag size={21} />

                            {cartCount > 0 && (
                                <span className="cart-badge">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                    </div>

                </div>

                {/* Page Content */}

                {activeTab === "Orders" ? (

                    <Orders
                    orders={orderHistory}
                        onBack={() => setActiveTab("Home")}
                    />

                ) : activeTab === "Profile" ? (

                    <Profile
                        userData={userData}
                        onBack={() => setActiveTab("Home")}
                        onLogout={onLogout}
                    />

                ) : activeTab === "Wishlist" ? (

                    <Wishlist
                        onBack={() => setActiveTab("Home")}
                    />
                    ) : activeTab === "Checkout" ? (

    <Checkout
        cartItems={cartItems}
        onBack={() => setActiveTab("Cart")}
        onPlaceOrder={(handlePlacedorder) => {
           
        }}
    />

                ) : activeTab === "Cart" ? (

                    <Cart
                        cartItems={cartItems}
                        onIncrease={increaseQuantity}
                        onDecrease={decreaseQuantity}
                        onRemove={removeFromCart}
                        onBack={() => setActiveTab("Home")}
                    onCheckout={() => setActiveTab("Checkout")}
                        />
                    

                ) : (

                    <>

                        {/* Heading */}

                        <h1 className="home-title">
                            Hungry? <span>Order & Eat.</span>
                        </h1>

                        {/* Search */}

                        <div className="search-row">

                            <input
                                type="text"
                                placeholder="⌕ Search for fast food..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button className="filter-button">
                                <SlidersHorizontal size={21} />
                            </button>

                        </div>

                        {/* Categories */}

                        <div className="category-list">

                            {categories.map((item) => (

                                <div
                                    className={`category-item ${
                                        category === item.name ? "active" : ""
                                    }`}
                                    key={item.name}
                                    onClick={() => setCategory(item.name)}
                                >

                                    <div className="category-image">
                                        {item.icon}
                                    </div>

                                    <p>{item.name}</p>

                                    {category === item.name && (
                                        <div className="active-line"></div>
                                    )}

                                </div>

                            ))}

                        </div>

                        {/* Food Cards */}

                        <div className="food-grid">

                            {filteredFoods.map((food) => (

                                <div className="food-card" key={food.id}>

                                    <img
                                        src={food.image}
                                        alt={food.name}
                                    />

                                    <h3>{food.name}</h3>

                                    <p>{food.description}</p>

                                    <div className="food-price">

                                        <strong>₹{food.price}</strong>

                                        <button
                                            onClick={() => addToCart(food)}
                                        >
                                            +
                                        </button>

                                    </div>

                                </div>

                            ))}

                            {filteredFoods.length === 0 && (
                                <p>No food found.</p>
                            )}

                        </div>

                    </>

                )}

                {/* Bottom Navigation */}

                <div className={`bottom-navigation ${
                    navOpen ? "expanded" : "collapsed"
                }`}>

                    {navOpen && (

                        <>

                            <button
                                className={activeTab === "Home" ? "selected" : ""}
                                onClick={() => setActiveTab("Home")}
                            >
                                <HomeIcon size={24} />
                                <span>Home</span>
                            </button>

                            <button
                                className={activeTab === "Orders" ? "selected" : ""}
                                onClick={() => setActiveTab("Orders")}
                            >
                                <ShoppingBag size={24} />
                                <span>Orders</span>
                            </button>

                            <button
                                className={activeTab === "Wishlist" ? "selected" : ""}
                                onClick={() => setActiveTab("Wishlist")}
                            >
                                <Heart size={24} />
                                <span>Wishlist</span>
                            </button>

                            <button
                                className={activeTab === "Profile" ? "selected" : ""}
                                onClick={() => setActiveTab("Profile")}
                            >
                                <User size={24} />
                                <span>Profile</span>
                            </button>

                        </>

                    )}

                    {/* Toggle Button */}

                    <button
                        className="nav-toggle"
                        onClick={() => setNavOpen(!navOpen)}
                    >
                        {navOpen ? (
                            <ChevronRight size={25} />
                        ) : (
                            <ChevronLeft size={25} />
                        )}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Home;
