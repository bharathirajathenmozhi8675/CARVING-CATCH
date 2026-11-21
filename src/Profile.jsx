
import React, { useState } from "react";
import "./Profile.css";

import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Package,
    Heart,
    Settings,
    HelpCircle,
    LogOut,
    Edit,
    ChevronRight,
    ShieldCheck
} from "lucide-react";

function Profile({ onBack, onLogout, userData }) {

    const [name, setName] = useState(userData?.name || "User");
    const [editing, setEditing] = useState(false);

    return (
        <div className="profile-page">

            {/* Header */}
            <div className="profile-header">
                <button onClick={onBack}>
                    <ArrowLeft size={22} />
                </button>

                <h2>My Profile</h2>

                <Settings size={22} />
            </div>

            {/* Profile Card */}
            <div className="profile-user-card">

                <div className="profile-avatar">
                    <User size={42} />
                </div>

                <h2>{name}</h2>
                <p>Welcome to CARVING-CATCH</p>

                <button
                    className="edit-profile-btn"
                    onClick={() => setEditing(!editing)}
                >
                    <Edit size={15} />
                    Edit Profile
                </button>

                {editing && (
                    <div className="edit-name">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />

                        <button onClick={() => setEditing(false)}>
                            Save
                        </button>
                    </div>
                )}

            </div>

            {/* Personal Information */}
            <div className="profile-section">

                <h3>Personal Information</h3>

                <div className="profile-info-item">
                    <Mail size={20} />
                    <div>
                        <small>Email Address</small>
                        <p>yourmail@gmail.com</p>
                    </div>
                </div>

                <div className="profile-info-item">
                    <Phone size={20} />
                    <div>
                        <small>Mobile Number</small>
                        <p>+91 XXXXX XXXXX</p>
                    </div>
                </div>

                <div className="profile-info-item">
                    <MapPin size={20} />
                    <div>
                        <small>Delivery Address</small>
                        <p>Virudhachalam, Tamil Nadu</p>
                    </div>
                </div>

            </div>

            {/* Account Options */}
            <div className="profile-section">

                <h3>My Account</h3>

                <div className="profile-menu-item">
                    <Package />
                    <span>My Orders</span>
                    <ChevronRight />
                </div>

                <div className="profile-menu-item">
                    <Heart />
                    <span>My Wishlist</span>
                    <ChevronRight />
                </div>

                <div className="profile-menu-item">
                    <ShieldCheck />
                    <span>Privacy & Security</span>
                    <ChevronRight />
                </div>

                <div className="profile-menu-item">
                    <HelpCircle />
                    <span>Help & Support</span>
                    <ChevronRight />
                </div>

            </div>

            {/* Logout */}
            <button
                className="profile-logout-btn"
                onClick={() => {
                    if (window.confirm("Are you sure you want to logout?")) {
                        onLogout?.();
                    }
                }}
            >
                <LogOut size={20} />
                Logout
            </button>

            <p className="profile-version">
                CARVING-CATCH v1.0.0
            </p>

        </div>
    );
}

export default Profile;
