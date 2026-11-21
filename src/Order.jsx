
import React, { useState } from "react";
import "./Orders.css";
import {
    ArrowLeft,
    Package,
    Clock,
    CheckCircle
} from "lucide-react";

function Orders({ onBack, orders = [] }) {

    const [activeFilter, setActiveFilter] = useState("All");

    const filters = ["All", "Pending", "Preparing", "Delivered"];

    const filteredOrders =
        activeFilter === "All"
            ? orders
            : orders.filter(
                (order) => order.status === activeFilter
            );

    const getStatusClass = (status) => {
        if (status === "Delivered") return "delivered";
        if (status === "Preparing") return "preparing";
        return "pending";
    };

    const getStatusIcon = (status) => {
        if (status === "Delivered") return <CheckCircle size={16} />;
        if (status === "Preparing") return <Clock size={16} />;
        return <Package size={16} />;
    };

    return (
        <div className="orders-page">

            <div className="orders-header">
                <button onClick={onBack}>
                    <ArrowLeft />
                </button>

                <h2>My Orders</h2>
                <Package />
            </div>

            <div className="orders-title">
                <h1>Your Orders</h1>
                <p>Track and manage your food orders</p>
            </div>

            {/* Order Filters */}

            <div className="orders-tabs">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={
                            activeFilter === filter ? "active" : ""
                        }
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Order List */}

            {filteredOrders.length === 0 ? (

                <div className="empty-orders">
                    <Package size={55} />
                    <h2>No Orders Found</h2>
                    <p>Your orders will appear here.</p>

                    <button onClick={onBack}>
                        Order Food
                    </button>
                </div>

            ) : (

                filteredOrders.map((order) => (

                    <div className="order-card" key={order.id}>

                        <div className="order-top">

                            <div>
                                <small>Order ID</small>
                                <h3>{order.id}</h3>
                            </div>

                            <span className={getStatusClass(order.status)}>
                                {getStatusIcon(order.status)}
                                {order.status}
                            </span>

                        </div>

                        <div className="order-food">

                            <div className="order-food-icon">
                                <Package size={30} />
                            </div>

                            <div>
                                <h3>
                                    {order.items?.map((item) => item.name).join(", ")}
                                    {!order.items && order.name}
                                </h3>

                                <p>{order.date}</p>

                                <p>
                                    Payment: {order.payment || "Not specified"}
                                </p>
                            </div>

                        </div>

                        <div className="order-bottom">

                            <strong>₹{order.total}</strong>

                            <span>
                                {order.items?.reduce(
                                    (sum, item) => sum + item.quantity,
                                    0
                                ) || 1} Items
                            </span>

                        </div>

                    </div>

                ))

            )}

        </div>
    );
}

export default Orders;
