
import React, { useState } from "react";
import "./RestaurantDashboard.css";
import RestaurantProfile from "./RestaurantProfile.jsx";
import {
    LayoutDashboard,
    ShoppingBag,
    Utensils,
    Tags,
    ChefHat,
    Boxes,
    Star,
    BarChart3,
    LogOut,
    Bell,
    Search,
    Plus,
    Check,
    Clock,
    X,
    Menu,
    Pencil,
    Trash2,
    Store,
    ArrowLeft
} from "lucide-react";


function RestaurantDashboard({ role = "owner", onLogout }) {
    const [activePage, setActivePage] = useState("Overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [orders, setOrders] = useState([
        { id: "#CC1001", customer: "Arun Kumar", item: "Chicken Burger", amount: 249, status: "New" },
        { id: "#CC1002", customer: "Priya", item: "Veg Pizza", amount: 399, status: "Preparing" },
        { id: "#CC1003", customer: "Rahul", item: "Paneer Biryani", amount: 299, status: "Ready" },
        { id: "#CC1004", customer: "Divya", item: "French Fries", amount: 149, status: "Completed" }
    ]);

    const [foods, setFoods] = useState([
        { id: 1, name: "Chicken Burger", category: "Burgers", price: 249, available: true },
        { id: 2, name: "Veg Pizza", category: "Pizza", price: 399, available: true },
        { id: 3, name: "Paneer Biryani", category: "Biryani", price: 299, available: false },
        { id: 4, name: "French Fries", category: "Snacks", price: 149, available: true }
    ]);

    const [newFood, setNewFood] = useState({ name: "", category: "Burgers", price: "" });
    const [showFoodForm, setShowFoodForm] = useState(false);
    const [search, setSearch] = useState("");

    const menuItems = [
        { name: "Overview", icon: LayoutDashboard },
        { name: "Orders", icon: ShoppingBag },
        { name: "Food Menu", icon: Utensils },
        { name: "Categories", icon: Tags },
        { name: "Kitchen Status", icon: ChefHat },
        { name: "Inventory", icon: Boxes },
        { name: "Reviews", icon: Star },
        { name: "Reports", icon: BarChart3 },
        { name: "Restaurant Profile", icon: Store },
    ];

    const updateOrder = (id, status) => {
        setOrders(previous =>
            previous.map(order =>
                order.id === id ? { ...order, status } : order
            )
        );
    };

    const addFood = (e) => {
        e.preventDefault();

        if (!newFood.name.trim() || !newFood.price || Number(newFood.price) <= 0) {
            alert("Enter valid food details.");
            return;
        }

        setFoods(previous => [
            ...previous,
            {
                id: Date.now(),
                name: newFood.name,
                category: newFood.category,
                price: Number(newFood.price),
                available: true
            }
        ]);

        setNewFood({ name: "", category: "Burgers", price: "" });
        setShowFoodForm(false);
    };

    const toggleFood = (id) => {
        setFoods(previous =>
            previous.map(food =>
                food.id === id ? { ...food, available: !food.available } : food
            )
        );
    };

    const deleteFood = (id) => {
        if (window.confirm("Delete this food item?")) {
            setFoods(previous => previous.filter(food => food.id !== id));
        }
    };

    const filteredOrders = orders.filter(order =>
        `${order.id} ${order.customer} ${order.item}`
            .toLowerCase().includes(search.toLowerCase())
    );

    const filteredFoods = foods.filter(food =>
        `${food.name} ${food.category}`
            .toLowerCase().includes(search.toLowerCase())
    );

    const renderOrders = () => (
        <div className="rd-panel">
            <div className="rd-panel-heading">
                <div>
                    <h3>Recent Orders</h3>
                    <p>Manage and update customer orders</p>
                </div>
                <span className="rd-count">{orders.length} Orders</span>
            </div>

            <div className="rd-table-wrap">
                <table className="rd-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Food Item</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td className="rd-order-id">{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.item}</td>
                                <td>₹{order.amount}</td>
                                <td>
                                    <span className={`rd-status ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={e => updateOrder(order.id, e.target.value)}
                                    >
                                        <option>New</option>
                                        <option>Preparing</option>
                                        <option>Ready</option>
                                        <option>Completed</option>
                                        <option>Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && <p className="rd-empty">No orders found.</p>}
            </div>
        </div>
    );

    const renderFoodMenu = () => (
        <div className="rd-panel">
            <div className="rd-panel-heading">
                <div>
                    <h3>Food Menu</h3>
                    <p>Manage your restaurant food items</p>
                </div>
                <button className="rd-primary-btn" onClick={() => setShowFoodForm(!showFoodForm)}>
                    <Plus size={17} /> Add Food
                </button>
            </div>

            {showFoodForm && (
                <form className="rd-food-form" onSubmit={addFood}>
                    <input
                        placeholder="Food name"
                        value={newFood.name}
                        onChange={e => setNewFood({ ...newFood, name: e.target.value })}
                        required
                    />
                    <select
                        value={newFood.category}
                        onChange={e => setNewFood({ ...newFood, category: e.target.value })}
                    >
                        <option>Burgers</option>
                        <option>Pizza</option>
                        <option>Biryani</option>
                        <option>Snacks</option>
                        <option>Drinks</option>
                    </select>
                    <input
                        type="number"
                        min="1"
                        placeholder="Price (₹)"
                        value={newFood.price}
                        onChange={e => setNewFood({ ...newFood, price: e.target.value })}
                        required
                    />
                    <button className="rd-primary-btn" type="submit">Save Food</button>
                </form>
            )}

            <div className="rd-food-list">
                {filteredFoods.map(food => (
                    <div className="rd-food-row" key={food.id}>
                        <div className="rd-food-icon"><Utensils size={21} /></div>
                        <div className="rd-food-info">
                            <strong>{food.name}</strong>
                            <small>{food.category}</small>
                        </div>
                        <strong>₹{food.price}</strong>
                        <label className="rd-availability">
                            <input
                                type="checkbox"
                                checked={food.available}
                                onChange={() => toggleFood(food.id)}
                            />
                            {food.available ? "Available" : "Unavailable"}
                        </label>
                        <button className="rd-delete-btn" onClick={() => deleteFood(food.id)}>
                            <Trash2 size={17} />
                        </button>
                    </div>
                ))}
                {filteredFoods.length === 0 && <p className="rd-empty">No food items found.</p>}
            </div>
        </div>
    );

    const renderContent = () => {
        if (activePage === "Restaurant Profile") {
            return (
               <RestaurantProfile
    onBack={onLogout}
/>
            );
        }
        if (activePage === "Orders") return renderOrders();
        if (activePage === "Food Menu") return renderFoodMenu();

        if (activePage === "Categories") {
            return (
                <div className="rd-panel">
                    <h3>Food Categories</h3>
                    <div className="rd-category-grid">
                        {["Burgers", "Pizza", "Biryani", "Snacks", "Drinks"].map(category => (
                            <div className="rd-category" key={category}>
                                <Tags size={22} />
                                <strong>{category}</strong>
                                <span>{foods.filter(food => food.category === category).length} items</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (activePage === "Kitchen Status") {
            return (
                <div className="rd-panel">
                    <h3>Kitchen Status</h3>
                    <p className="rd-muted">Update the current kitchen availability.</p>
                    <div className="rd-kitchen-status">
                        <ChefHat size={35} />
                        <div>
                            <strong>Kitchen is Open</strong>
                            <p>Orders can be prepared and accepted.</p>
                        </div>
                        <span className="rd-status completed">Active</span>
                    </div>
                    <div className="rd-kitchen-stats">
                        <div><Clock /><strong>{orders.filter(o => o.status === "Preparing").length}</strong><span>Preparing</span></div>
                        <div><Check /><strong>{orders.filter(o => o.status === "Ready").length}</strong><span>Ready</span></div>
                        <div><X /><strong>{orders.filter(o => o.status === "Cancelled").length}</strong><span>Cancelled</span></div>
                    </div>
                </div>
            );
        }

        if (activePage === "Inventory") {
            return (
                <div className="rd-panel">
                    <h3>Inventory</h3>
                    <p className="rd-muted">Sample stock overview</p>
                    {["Chicken", "Cheese", "Vegetables", "Buns", "Potatoes"].map((item, index) => (
                        <div className="rd-inventory-row" key={item}>
                            <strong>{item}</strong>
                            <span>{[12, 8, 25, 30, 18][index]} units</span>
                            <span className={index === 1 ? "rd-low-stock" : "rd-stock-ok"}>
                                {index === 1 ? "Low Stock" : "In Stock"}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }

        if (activePage === "Reviews") {
            return (
                <div className="rd-panel">
                    <h3>Reviews & Feedback</h3>
                    {[
                        ["Arun Kumar", "Great food and quick service!", "5.0"],
                        ["Priya", "The pizza was delicious.", "4.5"],
                        ["Rahul", "Good taste, nice packaging.", "4.0"]
                    ].map(review => (
                        <div className="rd-review" key={review[0]}>
                            <div><strong>{review[0]}</strong><p>{review[1]}</p></div>
                            <span><Star size={15} fill="currentColor" /> {review[2]}</span>
                        </div>
                    ))}
                </div>
            );
        }

        if (activePage === "Reports") {
            return (
                <div className="rd-panel">
                    <h3>Reports & Analytics</h3>
                    <div className="rd-report-grid">
                        <div><span>Total Orders</span><strong>{orders.length}</strong></div>
                        <div><span>Completed Orders</span><strong>{orders.filter(o => o.status === "Completed").length}</strong></div>
                        <div><span>Menu Items</span><strong>{foods.length}</strong></div>
                        <div><span>Available Items</span><strong>{foods.filter(f => f.available).length}</strong></div>
                    </div>
                </div>
            );
        }

        return (
            <>
                <div className="rd-stats-grid">
                    <div className="rd-stat-card">
                        <span>Total Orders</span><ShoppingBag />
                        <strong>{orders.length + 124}</strong>
                        <small>Today's orders</small>
                    </div>
                    <div className="rd-stat-card">
                        <span>Total Revenue</span><BarChart3 />
                        <strong>₹24,580</strong>
                        <small>Today's revenue</small>
                    </div>
                    <div className="rd-stat-card">
                        <span>Food Items</span><Utensils />
                        <strong>{foods.length}</strong>
                        <small>Menu items</small>
                    </div>
                    <div className="rd-stat-card">
                        <span>Average Rating</span><Star />
                        <strong>4.8</strong>
                        <small>Customer rating</small>
                    </div>
                </div>
                {renderOrders()}
            </>
        );
    };

    return (
        <div className="rd-layout">
            <aside className={`rd-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="rd-brand">
                    <div className="rd-brand-icon">🍴</div>
                    <div><strong>CARVING-CATCH</strong><small>Restaurant Panel</small></div>
                    <button className="rd-close-menu" onClick={() => setSidebarOpen(false)}><X /></button>
                </div>

                <div className="rd-restaurant-info">
                    <div className="rd-restaurant-avatar">🍽️</div>
                    <div><strong>Spice Village</strong><small>{role === "kitchen" ? "Kitchen Dashboard" : "Restaurant Owner"}</small></div>
                </div>

                <p className="rd-menu-label">MAIN MENU</p>
                <nav className="rd-nav">
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.name}
                                className={activePage === item.name ? "active" : ""}
                                onClick={() => {
                                    setActivePage(item.name);
                                    setSidebarOpen(false);
                                    setSearch("");
                                }}
                            >
                                <Icon size={19} /> {item.name}

                            </button>

                        );

                    })}
                </nav>

                <button className="rd-logout" onClick={onLogout}>
                    <LogOut size={19} /> Logout
                </button>
            </aside>

            {sidebarOpen && <button className="rd-overlay" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}

            <main className="rd-main">
                <header className="rd-topbar">

    <button
        className="rd-menu-toggle"
        onClick={() => setSidebarOpen(true)}
    >
        <Menu />
    </button>

    <div className="rd-page-title">
        <h2>{activePage}</h2>
        <p>Welcome back to your restaurant workspace</p>
    </div>

    <div className="rd-top-actions">

        <div className="rd-search">
            <Search size={17} />
            <input
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>

        <button className="rd-bell">
            <Bell size={20} />
        </button>

        <div className="rd-user-avatar">SV</div>

        <button
            className="rd-back-btn"
            onClick={onLogout}
            title="Back to Login"
        >
            <ArrowLeft size={19} />
            <span>Back</span>
        </button>

    </div>

</header>

                <section className="rd-content">
                    <div className="rd-welcome">
                        <div>
                            <h1>{activePage === "Overview" ? "Restaurant Overview" : activePage}</h1>
                            <p>Manage your restaurant operations in one place.</p>
                        </div>
                        <span className="rd-open-label"><span /> Restaurant Open</span>
                    </div>
                    {renderContent()}
                </section>
            </main>
        </div>
    );
}

export default RestaurantDashboard;
