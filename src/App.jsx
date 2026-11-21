import React, { useState } from "react";
import "./App.css";

import Auth from "./Auth";
import Home from "./Home";
import RoleSelection from "./RoleSelection";
import RestaurantDashboard from "./RestaurantDashboard.jsx";
import DeliveryDashboard from "./DeliveryDashboard.jsx";
import AdminDashboard from "./AdminDashboard.jsx";

function App() {
  const [page, setPage] = useState("welcome");
  const [selectedRole, setSelectedRole] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setSelectedRole("");
    setPage("auth");
  };

  // Authentication Page
  if (page === "auth") {
    return (
      <Auth
        onBack={() => setPage("welcome")}
        onSuccess={(role) => {
          setSelectedRole(role);
          setPage("role");
        }}
      />
    );
  }
  // Role Selection Page
  if (page === "role") {
    return (
      <RoleSelection
        onBack={() => setPage("auth")}
        onSelectRole={handleRoleSelect}
      />
    );
  }
  // Restaurant Owner & Kitchen Dashboard
  if (
    page === "dashboard" &&
    (selectedRole === "owner" || selectedRole === "kitchen")
  ) {
    return (
      <RestaurantDashboard
        role={selectedRole}
        onLogout={handleLogout}
      />
    );
  }
  //Delivery Partner Dashboard
  if (page === "dashboard" && selectedRole === "delivery") {
    return (
      <DeliveryDashboard
        onLogout={handleLogout}
      />
    );
  }

  // Customer Dashboard
  if (page === "dashboard" && selectedRole === "customer") {
    return (
      <Home
        userData={userData}
        onLogout={handleLogout}
      />
    );
  }
  // Admin Dashboard
  if (page === "dashboard" && selectedRole === "admin") {
    return (
      <AdminDashboard
        onLogout={handleLogout}
      />
    );
  }

  // Other Role Dashboards
  if (page === "dashboard") {
    const roleDetails = {
      owner: {
        title: "Restaurant Owner Dashboard",
        description: "Manage your restaurant, food menu and orders."
      },
      kitchen: {
        title: "Kitchen Dashboard",
        description: "Manage incoming orders and food preparation."
      },
      delivery: {
        title: "Delivery Partner Dashboard",
        description: "Manage assigned orders, pickups and deliveries."
      },
      admin: {
        title: "Admin Dashboard",
        description: "Manage customers, restaurants and platform activities."
      }
    };

    const details = roleDetails[selectedRole];

    return (
      <div className="role-dashboard">
        <div className="role-dashboard-card">
          <h1>CARVING-CATCH</h1>
          <h2>{details?.title}</h2>
          <p>{details?.description}</p>

          {selectedRole === "owner" || selectedRole === "kitchen" ? (
            <p className="shared-dashboard-note">
              Restaurant Owner & Kitchen use the same dashboard.
            </p>
          ) : null}

          <button onClick={() => setPage("role")}>
            Change Role
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Welcome Page
  return (
    <div className="app-container">
      <div className="mobile-screen">
        <div className="hero-section">

          <div className="status-bar">
            <span>9:41</span>
            <span>▮▮▮ ◉ ▰</span>
          </div>

          <div className="hero-content">
            <p className="tagline">Exceptional Food,</p>

            <h1>Delivered Fresh</h1>

            <p className="description">
              Thoughtfully prepared, freshly
              <br />
              delivered meals.
            </p>

            <div className="button-container">
              <button
                className="get-started"
                onClick={() => setPage("auth")}
              >
                Get Started
              </button>

              <button
                className="arrow-button"
                onClick={() => setPage("auth")}
              >
                ↗
              </button>
            </div>
          </div>

          <div className="home-indicator"></div>

        </div>
      </div>
    </div>
  );
}

export default App;