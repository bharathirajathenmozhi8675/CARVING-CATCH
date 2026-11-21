import React from "react";
import {
    UserRound,
    Store,
    ChefHat,
    Bike,
    ShieldCheck,
    ArrowLeft,
    ArrowRight
} from "lucide-react";
import "./RoleSelection.css";

function RoleSelection({ onBack, onSelectRole }) {
    const roles = [
        {
            id: "customer",
            title: "Customer",
            description: "Discover restaurants, order food and track your orders.",
            icon: UserRound,
            color: "green"
        },
        {
            id: "owner",
            title: "Restaurant Owner",
            description: "Manage restaurant, food menu, orders and business.",
            icon: Store,
            color: "orange"
        },
        {
            id: "kitchen",
            title: "Kitchen",
            description: "Manage incoming orders and food preparation.",
            icon: ChefHat,
            color: "red"
        },
        {
            id: "delivery",
            title: "Delivery Partner",
            description: "Accept deliveries, pick up and deliver customer orders.",
            icon: Bike,
            color: "blue"
        },
        {
            id: "admin",
            title: "Admin",
            description: "Manage users, restaurants, orders and platform reports.",
            icon: ShieldCheck,
            color: "purple"
        }
    ];

    return (
        <div className="role-page">
            <div className="role-container">

                <button className="role-back" onClick={onBack}>
                    <ArrowLeft size={19} />
                    <span>Back</span>
                </button>

                <div className="role-header">
                    <div className="role-logo">🍴</div>
                    <h1>CARVING<span>-CATCH</span></h1>
                    <p>Fresh Food. Happy Moments.</p>
                </div>

                <div className="role-heading">
                    <h2>Choose Your Role</h2>
                    <p>Select how you want to continue</p>
                </div>

                <div className="role-grid">
                    {roles.map((role) => {
                        const Icon = role.icon;

                        return (
                            <button
                                type="button"
                                className="role-card"
                                key={role.id}
                                onClick={() => onSelectRole(role.id)}
                            >
                                <div className={`role-icon ${role.color}`}>
                                    <Icon size={28} />
                                </div>

                                <div className="role-card-content">
                                    <h3>{role.title}</h3>
                                    <p>{role.description}</p>
                                </div>

                                <div className="role-arrow">
                                    <ArrowRight size={19} />
                                </div>
                            </button>
                        );
                    })}
                </div>

                <p className="role-footer">
                    Choose your role to access your dashboard
                </p>

            </div>
        </div>
    );
}

export default RoleSelection;