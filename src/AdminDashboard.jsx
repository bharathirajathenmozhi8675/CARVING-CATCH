
import React, { useState } from "react";
import "./AdminDashboard.css";
import {
    ArrowLeft, LayoutDashboard, Users, Store, Bike, ShoppingBag,
    Star, BarChart3, LogOut, Menu, X, Bell,
    Wallet, CheckCircle, Clock, Ban, Eye, AlertCircle,
    FileText, Search, IndianRupee
} from "lucide-react";

function AdminDashboard({ onLogout }) {
    const [activePage, setActivePage] = useState("Overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");

    const [customers, setCustomers] = useState([
        { id: 1, name: "Arun Kumar", email: "arun@gmail.com", phone: "9876543210", status: "Active" },
        { id: 2, name: "Priya", email: "priya@gmail.com", phone: "9876543211", status: "Active" },
        { id: 3, name: "Rahul", email: "rahul@gmail.com", phone: "9876543212", status: "Blocked" }
    ]);

    const [restaurants, setRestaurants] = useState([
        { id: 1, name: "Spice Village", owner: "Suresh", category: "South Indian", orders: 1245, status: "Approved" },
        { id: 2, name: "Urban Bites", owner: "Karthik", category: "Fast Food", orders: 987, status: "Pending" },
        { id: 3, name: "Burger Hub", owner: "Vijay", category: "Burgers", orders: 765, status: "Approved" }
    ]);

    const [partners, setPartners] = useState([
        { id: 1, name: "Manoj", phone: "9876543213", vehicle: "Bike", deliveries: 120, status: "Online" },
        { id: 2, name: "Kumar", phone: "9876543214", vehicle: "Bike", deliveries: 95, status: "Offline" },
        { id: 3, name: "Vignesh", phone: "9876543215", vehicle: "Scooter", deliveries: 150, status: "Online" }
    ]);

    const [orders] = useState([
        { id: "#CC2001", customer: "Arun Kumar", restaurant: "Spice Village", amount: 249, payment: "Paid", status: "Delivered" },
        { id: "#CC2002", customer: "Priya", restaurant: "Urban Bites", amount: 399, payment: "Paid", status: "Preparing" },
        { id: "#CC2003", customer: "Rahul", restaurant: "Burger Hub", amount: 299, payment: "Pending", status: "Cancelled" }
    ]);

    const [complaints, setComplaints] = useState([
        { id: "CMP1001", customer: "Arun Kumar", order: "#CC2001", reason: "Late Delivery", description: "Order was delivered very late.", status: "Pending", proof: "" },
        { id: "CMP1002", customer: "Priya", order: "#CC2002", reason: "Wrong Food Received", description: "Received a different food item.", status: "Reviewing", proof: "" }
    ]);

    const [payments, setPayments] = useState([
        { id: "PAY1001", customer: "Rahul", order: "#CC2003", amount: 299, issue: "Amount deducted but order failed", transaction: "UPI123456789", status: "Pending", proof: "" },
        { id: "PAY1002", customer: "Priya", order: "#CC2002", amount: 399, issue: "Refund not received", transaction: "UPI987654321", status: "Reviewing", proof: "" }
    ]);

    const [reviews] = useState([
        { id: 1, customer: "Arun Kumar", restaurant: "Spice Village", rating: 5, comment: "Excellent food and fast delivery." },
        { id: 2, customer: "Priya", restaurant: "Urban Bites", rating: 4, comment: "Good taste and packaging." },
        { id: 3, customer: "Rahul", restaurant: "Burger Hub", rating: 2, comment: "Delivery was too late." }
    ]);

    const menuItems = [
        { name: "Overview", icon: LayoutDashboard },
        { name: "Customers", icon: Users },
        { name: "Restaurants", icon: Store },
        { name: "Delivery Partners", icon: Bike },
        { name: "Orders", icon: ShoppingBag },
        { name: "Reviews & Feedback", icon: Star },
        { name: "Complaints & Payment Issues", icon: AlertCircle },
        { name: "Reports", icon: BarChart3 },
        { name: "Complaints & Payment Issues", icon: Eye }
    ];

    const paymentIssues = [
        {
            id: "PAY1001",
            customer: "Rahul",
            orderId: "#CC2003",
            amount: 299,
            issue: "Amount deducted but order failed",
            transactionId: "UPI123456789",
            proof: "",
            status: "Pending"
        },
        {
            id: "PAY1002",
            customer: "Priya",
            orderId: "#CC2002",
            amount: 399,
            issue: "Refund not received",
            transactionId: "UPI987654321",
            proof: "",
            status: "Reviewing"
        }
    ];


    const totalRevenue = orders
        .filter(order => order.payment === "Paid" && order.status !== "Cancelled")
        .reduce((sum, order) => sum + order.amount, 0);

    const statusClass = status => {
        if (["Active", "Approved", "Online", "Delivered", "Paid", "Resolved"].includes(status)) return "ad-green";
        if (["Pending", "Preparing", "Reviewing", "Offline"].includes(status)) return "ad-orange";
        return "ad-red";
    };

    const changeComplaintStatus = (id, status) => {
        setComplaints(previous => previous.map(item =>
            item.id === id ? { ...item, status } : item
        ));
    };

    const changePaymentStatus = (id, status) => {
        setPayments(previous => previous.map(item =>
            item.id === id ? { ...item, status } : item
        ));
    };

    const renderTable = (headers, rows) => (
        <div className="ad-table-wrap">
            <table className="ad-table">
                <thead>
                    <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );

    const renderContent = () => {
        if (activePage === "Customers") {
            const filtered = customers.filter(c =>
                `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(search.toLowerCase())
            );

            return (
                <section className="ad-panel">
                    <div className="ad-panel-heading">
                        <div><h3>Customer Management</h3><p>Manage customer accounts</p></div>
                        <span>{customers.length} Customers</span>
                    </div>
                    {renderTable(["Customer", "Email", "Phone", "Status", "Action"],
                        filtered.map(c => (
                            <tr key={c.id}>
                                <td><strong>{c.name}</strong></td>
                                <td>{c.email}</td>
                                <td>{c.phone}</td>
                                <td><span className={`ad-status ${statusClass(c.status)}`}>{c.status}</span></td>
                                <td>
                                    <button className="ad-small-btn" onClick={() => setCustomers(old => old.map(x => x.id === c.id ? { ...x, status: x.status === "Active" ? "Blocked" : "Active" } : x))}>
                                        {c.status === "Active" ? "Block" : "Activate"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </section>
            );
        }

        if (activePage === "Restaurants") {
            return (
                <section className="ad-panel">
                    <div className="ad-panel-heading">
                        <div><h3>Restaurant Management</h3><p>Approve and manage restaurants</p></div>
                        <span>{restaurants.length} Restaurants</span>
                    </div>
                    {renderTable(["Restaurant", "Owner", "Category", "Orders", "Status", "Action"],
                        restaurants.map(r => (
                            <tr key={r.id}>
                                <td><strong>{r.name}</strong></td>
                                <td>{r.owner}</td><td>{r.category}</td><td>{r.orders}</td>
                                <td><span className={`ad-status ${statusClass(r.status)}`}>{r.status}</span></td>
                                <td>
                                    <button className="ad-small-btn" onClick={() => setRestaurants(old => old.map(x => x.id === r.id ? { ...x, status: x.status === "Approved" ? "Blocked" : "Approved" } : x))}>
                                        {r.status === "Approved" ? "Block" : "Approve"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </section>
            );
        }

        if (activePage === "Delivery Partners") {
            return (
                <section className="ad-panel">
                    <div className="ad-panel-heading">
                        <div><h3>Delivery Partners</h3><p>Manage partner availability</p></div>
                        <span>{partners.length} Partners</span>
                    </div>
                    {renderTable(["Partner", "Phone", "Vehicle", "Deliveries", "Status", "Action"],
                        partners.map(p => (
                            <tr key={p.id}>
                                <td><strong>{p.name}</strong></td><td>{p.phone}</td>
                                <td>{p.vehicle}</td><td>{p.deliveries}</td>
                                <td><span className={`ad-status ${statusClass(p.status)}`}>{p.status}</span></td>
                                <td><button className="ad-small-btn" onClick={() => setPartners(old => old.map(x => x.id === p.id ? { ...x, status: x.status === "Online" ? "Offline" : "Online" } : x))}>{p.status === "Online" ? "Set Offline" : "Set Online"}</button></td>
                            </tr>
                        ))
                    )}
                </section>
            );
        }

        if (activePage === "Orders") {
            return (
                <section className="ad-panel">
                    <div className="ad-panel-heading">
                        <div><h3>Order Management</h3><p>All platform orders</p></div>
                        <span>{orders.length} Orders</span>
                    </div>
                    {renderTable(["Order ID", "Customer", "Restaurant", "Amount", "Payment", "Status"],
                        orders.map(o => (
                            <tr key={o.id}>
                                <td><strong>{o.id}</strong></td><td>{o.customer}</td><td>{o.restaurant}</td>
                                <td>₹{o.amount}</td>
                                <td><span className={`ad-status ${statusClass(o.payment)}`}>{o.payment}</span></td>
                                <td><span className={`ad-status ${statusClass(o.status)}`}>{o.status}</span></td>
                            </tr>
                        ))
                    )}
                </section>
            );
        }
        if (activePage === "Complaints & Payment Issues") {
            return (
                <div className="ad-complaints-page">

                    <section className="ad-panel">
                        <div className="ad-panel-heading">
                            <div>
                                <h3>Customer Complaints</h3>
                                <p>Review customer complaints and submitted proof</p>
                            </div>
                            <span>{complaints.length} Complaints</span>
                        </div>

                        {complaints.map(item => (
                            <div className="ad-issue-card" key={item.id}>
                                <div className="ad-issue-top">
                                    <strong>{item.id}</strong>
                                    <span className={`ad-status ${statusClass(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>

                                <h4>{item.reason}</h4>
                                <p>{item.description}</p>

                                <div className="ad-issue-details">
                                    <span>Customer: <b>{item.customer}</b></span>
                                    <span>Order: <b>{item.orderId}</b></span>
                                </div>

                                <div className="ad-proof">
                                    <strong>Complaint Proof</strong>
                                    {item.proof ? (
                                        <a href={item.proof} target="_blank" rel="noreferrer">
                                            View Proof
                                        </a>
                                    ) : (
                                        <span>No proof uploaded</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="ad-panel">
                        <div className="ad-panel-heading">
                            <div>
                                <h3>Payment Issues</h3>
                                <p>Verify transactions, payment proof and refunds</p>
                            </div>
                            <span>{paymentIssues.length} Issues</span>
                        </div>

                        {paymentIssues.map(item => (
                            <div className="ad-issue-card" key={item.id}>
                                <div className="ad-issue-top">
                                    <strong>{item.id}</strong>
                                    <span className={`ad-status ${statusClass(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>

                                <h4>{item.issue}</h4>

                                <div className="ad-issue-details">
                                    <span>Customer: <b>{item.customer}</b></span>
                                    <span>Order: <b>{item.orderId}</b></span>
                                    <span>Amount: <b>₹{item.amount}</b></span>
                                    <span>Transaction ID: <b>{item.transactionId}</b></span>
                                </div>

                                <div className="ad-proof">
                                    <strong>Payment Screenshot / Proof</strong>
                                    {item.proof ? (
                                        <a href={item.proof} target="_blank" rel="noreferrer">
                                            View Payment Proof
                                        </a>
                                    ) : (
                                        <span>No payment proof uploaded</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>

                </div>
            );
        }

        if (activePage === "Reviews & Feedback") {
            return (
                <section className="ad-panel">
                    <div className="ad-panel-heading">
                        <div><h3>Reviews & Feedback</h3><p>Customer ratings and comments</p></div>
                        <span>{reviews.length} Reviews</span>
                    </div>
                    {reviews.map(r => (
                        <div className="ad-review" key={r.id}>
                            <div className="ad-review-top">
                                <strong>{r.customer} – {r.restaurant}</strong>
                                <span>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                            </div>
                            <p>{r.comment}</p>
                        </div>
                    ))}
                </section>
            );
        }

        if (activePage === "Complaints & Payment Issues") {
            return (
                <div className="ad-issue-layout">
                    <section className="ad-panel">
                        <div className="ad-panel-heading">
                            <div><h3>Customer Complaints</h3><p>Review reported problems</p></div>
                            <span>{complaints.length} Complaints</span>
                        </div>
                        {complaints.map(item => (
                            <article className="ad-issue-card" key={item.id}>
                                <div className="ad-issue-top">
                                    <strong>{item.id}</strong>
                                    <span className={`ad-status ${statusClass(item.status)}`}>{item.status}</span>
                                </div>
                                <h4>{item.reason}</h4>
                                <p>{item.description}</p>
                                <div className="ad-issue-details">
                                    <span>Customer: <b>{item.customer}</b></span>
                                    <span>Order: <b>{item.order}</b></span>
                                </div>
                                <div className="ad-proof">
                                    <strong>Complaint Proof</strong>
                                    {item.proof ? <a href={item.proof} target="_blank" rel="noreferrer">View Proof</a> : <span>No proof uploaded (Demo)</span>}
                                </div>
                                <div className="ad-issue-actions">
                                    <button onClick={() => changeComplaintStatus(item.id, "Reviewing")}>Review</button>
                                    <button onClick={() => changeComplaintStatus(item.id, "Resolved")}>Resolve</button>
                                    <button onClick={() => changeComplaintStatus(item.id, "Rejected")}>Reject</button>
                                </div>
                            </article>
                        ))}
                    </section>

                    <section className="ad-panel">
                        <div className="ad-panel-heading">
                            <div><h3>Payment Issues & Refunds</h3><p>Check transaction details and refund requests</p></div>
                            <span>{payments.length} Issues</span>
                        </div>
                        {payments.map(item => (
                            <article className="ad-issue-card" key={item.id}>
                                <div className="ad-issue-top">
                                    <strong>{item.id}</strong>
                                    <span className={`ad-status ${statusClass(item.status)}`}>{item.status}</span>
                                </div>
                                <h4>{item.issue}</h4>
                                <div className="ad-issue-details">
                                    <span>Customer: <b>{item.customer}</b></span>
                                    <span>Order: <b>{item.order}</b></span>
                                    <span>Amount: <b>₹{item.amount}</b></span>
                                    <span>Transaction: <b>{item.transaction}</b></span>
                                </div>
                                <div className="ad-proof">
                                    <strong>Payment Proof</strong>
                                    {item.proof ? <a href={item.proof} target="_blank" rel="noreferrer">View Screenshot</a> : <span>No proof uploaded (Demo)</span>}
                                </div>
                                <div className="ad-issue-actions">
                                    <button onClick={() => changePaymentStatus(item.id, "Reviewing")}>Review</button>
                                    <button onClick={() => changePaymentStatus(item.id, "Resolved")}>Approve Refund</button>
                                    <button onClick={() => changePaymentStatus(item.id, "Rejected")}>Reject</button>
                                </div>
                            </article>
                        ))}
                    </section>
                </div>
            );
        }

        if (activePage === "Reports") {
            return (
                <section className="ad-panel">
                    <div className="ad-panel-heading">
                        <div><h3>Reports & Analytics</h3><p>Platform performance summary</p></div>
                    </div>
                    <div className="ad-report-grid">
                        <div><span>Total Orders</span><strong>{orders.length}</strong></div>
                        <div><span>Delivered Orders</span><strong>{orders.filter(o => o.status === "Delivered").length}</strong></div>
                        <div><span>Cancelled Orders</span><strong>{orders.filter(o => o.status === "Cancelled").length}</strong></div>
                        <div><span>Paid Revenue</span><strong>₹{totalRevenue}</strong></div>
                    </div>
                </section>
            );
        }

        return (
            <>
                <div className="ad-stats-grid">
                    <div className="ad-stat-card"><Users /><span>Total Customers</span><strong>{customers.length}</strong></div>
                    <div className="ad-stat-card"><Store /><span>Restaurants</span><strong>{restaurants.length}</strong></div>
                    <div className="ad-stat-card"><ShoppingBag /><span>Total Orders</span><strong>{orders.length}</strong></div>
                    <div className="ad-stat-card"><Wallet /><span>Total Revenue</span><strong>₹{totalRevenue}</strong></div>
                </div>

                <div className="ad-overview-grid">
                    <section className="ad-panel">
                        <div className="ad-panel-heading"><div><h3>Recent Orders</h3><p>Latest platform activity</p></div></div>
                        {renderTable(["Order", "Customer", "Amount", "Status"],
                            orders.map(o => (
                                <tr key={o.id}><td><strong>{o.id}</strong></td><td>{o.customer}</td><td>₹{o.amount}</td><td><span className={`ad-status ${statusClass(o.status)}`}>{o.status}</span></td></tr>
                            ))
                        )}
                    </section>

                    <section className="ad-panel ad-quick-panel">
                        <h3>Platform Summary</h3>
                        <p><Users size={17} /> {customers.length} Customers</p>
                        <p><Store size={17} /> {restaurants.length} Restaurants</p>
                        <p><Bike size={17} /> {partners.length} Delivery Partners</p>
                        <p><AlertCircle size={17} /> {complaints.filter(c => c.status === "Pending").length + payments.filter(p => p.status === "Pending").length} Pending Issues</p>
                    </section>
                </div>
            </>
        );
    };

    return (
        <div className="ad-layout">
            <aside className={`ad-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="ad-brand">
                    <div className="ad-brand-icon">🍴</div>
                    <div><strong>CARVING-CATCH</strong><small>Admin Panel</small></div>
                    <button className="ad-close-menu" onClick={() => setSidebarOpen(false)}><X /></button>
                </div>

                <div className="ad-profile">
                    <div className="ad-avatar">AD</div>
                    <div><strong>Administrator</strong><small>Super Admin</small></div>
                </div>

                <p className="ad-menu-label">MANAGEMENT</p>
                <nav className="ad-nav">
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button key={item.name} className={activePage === item.name ? "active" : ""}
                                onClick={() => { setActivePage(item.name); setSidebarOpen(false); setSearch(""); }}>
                                <Icon size={18} />{item.name}
                            </button>
                        );
                    })}
                </nav>

                <button className="ad-logout" onClick={onLogout}><LogOut size={18} /> Logout</button>
            </aside>

            {sidebarOpen && <button className="ad-overlay" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}

            <main className="ad-main">
                <header className="ad-topbar">
                    <button className="ad-back-btn" onClick={onLogout}>
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </button>
                    <button className="ad-menu-toggle" onClick={() => setSidebarOpen(true)}><Menu /></button>
                    <div className="ad-top-title"><h2>{activePage}</h2><p>CARVING-CATCH Administration</p></div>
                    <div className="ad-top-actions">
                        <div className="ad-search"><Search size={17} /><input placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                        <button className="ad-bell"><Bell /></button>
                        <div className="ad-top-avatar">AD</div>
                    </div>
                </header>

                <section className="ad-content">
                    <div className="ad-welcome">
                        <div><h1>{activePage === "Overview" ? "Admin Overview" : activePage}</h1><p>Manage your food ordering platform.</p></div>
                        <span className="ad-admin-tag">Administrator</span>
                    </div>
                    {renderContent()}
                </section>
            </main>
        </div>
    );
}

export default AdminDashboard;
