import React, { useState } from "react";
import "./DeliveryDashboard.css";
import DeliveryProfile from "./DeliveryProfile.jsx";
import {
    LayoutDashboard,
    Package,
    MapPin,
    Bike,
    Wallet,
    Clock,
    CheckCircle,
    Phone,
    Navigation,
    LogOut,
    ArrowLeft,
    Menu,
    X,
    UserRound,
    IndianRupee,
    TrendingUp
} from "lucide-react";

function DeliveryDashboard({ onLogout }) {
    const [activePage, setActivePage] = useState("Overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [deliveries, setDeliveries] = useState([
        {
            id: "#CC2001",
            customer: "Arun Kumar",
            phone: "9876543210",
            food: "Chicken Burger",
            restaurant: "Spice Village",
            address: "Anna Nagar, Chennai",
            amount: 249,
            status: "Assigned",
            earning: 40
        },
        {
            id: "#CC2002",
            customer: "Priya",
            phone: "9876543211",
            food: "Veg Pizza",
            restaurant: "Urban Bites",
            address: "Tambaram, Chennai",
            amount: 399,
            status: "Picked Up",
            earning: 50
        },
        {
            id: "#CC2003",
            customer: "Rahul",
            phone: "9876543212",
            food: "Paneer Biryani",
            restaurant: "Spice Village",
            address: "Velachery, Chennai",
            amount: 299,
            status: "Delivered",
            earning: 45
        }
    ]);

    const menuItems = [
        { name: "Overview", icon: LayoutDashboard },
        { name: "Assigned Orders", icon: Package },
        { name: "Pickup", icon: Bike },
        { name: "Delivery Tracking", icon: Navigation },
        { name: "Earnings", icon: Wallet },
        { name: "My Profile", icon: UserRound }
    ];

    const updateStatus = (id, status) => {
        setDeliveries(previous =>
            previous.map(order =>
                order.id === id ? { ...order, status } : order
            )
        );
    };

    const assignedOrders = deliveries.filter(
        order => order.status === "Assigned"
    );

    const pickedOrders = deliveries.filter(
        order => order.status === "Picked Up" || order.status === "On The Way"
    );

    const completedOrders = deliveries.filter(
        order => order.status === "Delivered"
    );

    const totalEarnings = completedOrders.reduce(
        (total, order) => total + order.earning,
        0
    );

    const getStatusClass = status => {
        if (status === "Delivered") return "dp-delivered";
        if (status === "Picked Up") return "dp-picked";
        if (status === "On The Way") return "dp-way";
        return "dp-assigned";
    };

    const renderOrderCard = order => (
        <div className="dp-order-card" key={order.id}>
            <div className="dp-order-top">
                <strong>{order.id}</strong>
                <span className={`dp-status ${getStatusClass(order.status)}`}>
                    {order.status}
                </span>
            </div>

            <div className="dp-order-details">
                <div>
                    <small>Customer</small>
                    <strong>{order.customer}</strong>
                </div>
                <div>
                    <small>Food Item</small>
                    <strong>{order.food}</strong>
                </div>
                <div>
                    <small>Restaurant</small>
                    <strong>{order.restaurant}</strong>
                </div>
                <div>
                    <small>Order Amount</small>
                    <strong>₹{order.amount}</strong>
                </div>
            </div>

            <div className="dp-address">
                <MapPin size={18} />
                <div>
                    <small>Delivery Address</small>
                    <strong>{order.address}</strong>
                </div>
            </div>

            <div className="dp-order-footer">
                <a href={`tel:${order.phone}`} className="dp-call-btn">
                    <Phone size={16} /> Call Customer
                </a>

                {order.status === "Assigned" && (
                    <button
                        className="dp-action-btn"
                        onClick={() => updateStatus(order.id, "Picked Up")}
                    >
                        <Bike size={16} /> Confirm Pickup
                    </button>
                )}

                {order.status === "Picked Up" && (
                    <button
                        className="dp-action-btn"
                        onClick={() => updateStatus(order.id, "On The Way")}
                    >
                        <Navigation size={16} /> Start Delivery
                    </button>
                )}

                {order.status === "On The Way" && (
                    <button
                        className="dp-action-btn dp-success-btn"
                        onClick={() => updateStatus(order.id, "Delivered")}
                    >
                        <CheckCircle size={16} /> Mark Delivered
                    </button>
                )}

                {order.status === "Delivered" && (
                    <span className="dp-earned">
                        <IndianRupee size={15} /> {order.earning} Earned
                    </span>
                )}
            </div>
        </div>
    );

    const renderContent = () => {
        if (activePage === "Assigned Orders") {
            return (
                <div className="dp-panel">
                    <div className="dp-panel-heading">
                        <div>
                            <h3>Assigned Orders</h3>
                            <p>Orders waiting for pickup</p>
                        </div>
                        <span className="dp-count">
                            {assignedOrders.length} Orders
                        </span>
                    </div>

                    {assignedOrders.length > 0
                        ? assignedOrders.map(renderOrderCard)
                        : <p className="dp-empty">No assigned orders.</p>}
                </div>
            );
        }
        if (activePage === "My Profile") {
            return <DeliveryProfile />;
        }

        if (activePage === "Pickup") {
            return (
                <div className="dp-panel">
                    <div className="dp-panel-heading">
                        <div>
                            <h3>Restaurant Pickup</h3>
                            <p>Confirm pickup and move to delivery</p>
                        </div>
                    </div>

                    {assignedOrders.length > 0
                        ? assignedOrders.map(renderOrderCard)
                        : <p className="dp-empty">No orders waiting for pickup.</p>}
                </div>
            );
        }

        if (activePage === "Delivery Tracking") {
            return (
                <div className="dp-panel">
                    <h3>Delivery Tracking</h3>
                    <p className="dp-description">
                        Update your delivery progress.
                    </p>

                    {pickedOrders.length > 0
                        ? pickedOrders.map(renderOrderCard)
                        : <p className="dp-empty">No active deliveries.</p>}
                </div>
            );
        }

        if (activePage === "Earnings") {
            return (
                <div className="dp-panel">
                    <h3>My Earnings</h3>
                    <p className="dp-description">
                        Your completed delivery earnings
                    </p>

                    <div className="dp-earning-total">
                        <Wallet size={30} />
                        <div>
                            <small>Total Earnings</small>
                            <strong>₹{totalEarnings}</strong>
                        </div>
                    </div>

                    <h4 className="dp-history-title">Delivery History</h4>

                    {completedOrders.map(order => (
                        <div className="dp-earning-row" key={order.id}>
                            <div>
                                <strong>{order.id}</strong>
                                <small>{order.customer} · {order.food}</small>
                            </div>
                            <strong>+ ₹{order.earning}</strong>
                        </div>
                    ))}

                    {completedOrders.length === 0 && (
                        <p className="dp-empty">No completed deliveries yet.</p>
                    )}
                </div>
            );
        }

        return (
            <>
                <div className="dp-stats-grid">
                    <div className="dp-stat-card">
                        <Package />
                        <span>Total Orders</span>
                        <strong>{deliveries.length}</strong>
                    </div>

                    <div className="dp-stat-card">
                        <Clock />
                        <span>Assigned Orders</span>
                        <strong>{assignedOrders.length}</strong>
                    </div>

                    <div className="dp-stat-card">
                        <CheckCircle />
                        <span>Completed</span>
                        <strong>{completedOrders.length}</strong>
                    </div>

                    <div className="dp-stat-card">
                        <Wallet />
                        <span>Total Earnings</span>
                        <strong>₹{totalEarnings}</strong>
                    </div>
                </div>

                <div className="dp-panel">
                    <div className="dp-panel-heading">
                        <div>
                            <h3>My Delivery Orders</h3>
                            <p>Manage your current delivery tasks</p>
                        </div>
                        <span className="dp-count">
                            {deliveries.length} Orders
                        </span>
                    </div>

                    {deliveries.map(renderOrderCard)}
                </div>
            </>
        );
    };

    return (
        <div className="dp-layout">
            <aside className={`dp-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="dp-brand">
                    <div className="dp-brand-icon">🍴</div>
                    <div>
                        <strong>CARVING-CATCH</strong>
                        <small>Delivery Partner</small>
                    </div>
                    <button
                        className="dp-close-menu"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X />
                    </button>
                </div>

                <div className="dp-profile">
                    <div className="dp-avatar">DP</div>
                    <div>
                        <strong>Delivery Partner</strong>
                        <small>Partner ID: DP1001</small>
                    </div>
                </div>

                <p className="dp-menu-label">MAIN MENU</p>

                <nav className="dp-nav">
                    {menuItems.map(item => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.name}
                                className={activePage === item.name ? "active" : ""}
                                onClick={() => {
                                    setActivePage(item.name);
                                    setSidebarOpen(false);
                                }}
                            >
                                <Icon size={19} />
                                {item.name}
                            </button>
                        );
                    })}
                </nav>

                <button className="dp-logout" onClick={onLogout}>
                    <LogOut size={19} /> Logout
                </button>
            </aside>

            {sidebarOpen && (
                <button
                    className="dp-overlay"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close menu"
                />
            )}

            <main className="dp-main">
                <header className="dp-topbar">
                    <button
                        className="dp-menu-toggle"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu />
                    </button>

                    <div>
                        <h2>{activePage}</h2>
                        <p>Welcome to your delivery workspace</p>
                    </div>

                    <button className="dp-back-btn" onClick={onLogout}>
                        <ArrowLeft size={17} /> Back
                    </button>
                </header>

                <section className="dp-content">
                    <div className="dp-welcome">
                        <div>
                            <h1>
                                {activePage === "Overview"
                                    ? "Delivery Overview"
                                    : activePage}
                            </h1>
                            <p>Deliver orders safely and on time.</p>
                        </div>

                        <span className="dp-online">
                            <span /> Online
                        </span>
                    </div>

                    {renderContent()}
                </section>
            </main>
        </div>
    );
}

export default DeliveryDashboard;