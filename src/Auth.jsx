
import React, { useState } from "react";
import "./Auth.css";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    ArrowLeft,

} from "lucide-react";

function Auth({ onBack, onSuccess }) {
    const [mode, setMode] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agree, setAgree] = useState(false);
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "signup") {
            if (form.password !== form.confirmPassword) {
                setMessage("Passwords do not match.");
                return;
            }

            if (form.password.length < 6) {
                setMessage("Password must contain at least 6 characters.");
                return;
            }

            if (!agree) {
                setMessage("Please accept Terms & Privacy Policy.");
                return;
            }

            // Signup → Role Selection
            onSuccess?.();
            return;
        }

        if (!agree) {
            setMessage("Please accept Terms & Privacy Policy.");
            return;
        }

        // Login → Customer Dashboard (Test)
        onSuccess?.();
    };
    // Demo UI only. Real authentication will be connected later.
    onSuccess?.();


    const switchMode = (selectedMode) => {
        setMode(selectedMode);
        setMessage("");
        setAgree(false);
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* Orange Header */}
                <div className="auth-header">

                    <button className="auth-back" onClick={onBack}>
                        <ArrowLeft size={20} />
                    </button>

                    <div className="auth-status">
                        <span>9:41</span>
                        <span>▮▮▮ ◉ ▰</span>
                    </div>

                    <div className="auth-brand">
                        <div className="brand-icon">🍴</div>
                        <h1>
                            CARVING<span>-CATCH</span>
                        </h1>
                        <p>Fresh Food. Happy Moments.</p>
                    </div>

                    <div className="orange-circle circle-one"></div>
                    <div className="orange-circle circle-two"></div>

                </div>

                {/* White Form */}
                <div className="auth-form-section">

                    <div className="auth-tabs">
                        <button
                            className={mode === "login" ? "active" : ""}
                            onClick={() => switchMode("login")}
                        >
                            Sign In
                        </button>

                        <button
                            className={mode === "signup" ? "active" : ""}
                            onClick={() => switchMode("signup")}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="auth-heading">
                        <h2>
                            {mode === "login" ? "Welcome Back!" : "Create Account"}
                        </h2>

                        <p>
                            {mode === "login"
                                ? "Login to continue your food journey"
                                : "Join us and enjoy delicious food"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        {mode === "signup" && (
                            <>
                                <label>Full Name</label>
                                <div className="auth-input">
                                    <User size={18} />
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <label>Mobile Number</label>
                                <div className="auth-input">
                                    <Phone size={18} />
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <label>Email Address</label>
                        <div className="auth-input">
                            <Mail size={18} />
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <label>Password</label>
                        <div className="auth-input">
                            <Lock size={18} />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword
                                    ? <EyeOff size={18} />
                                    : <Eye size={18} />}
                            </button>
                        </div>

                        {mode === "signup" && (
                            <>
                                <label>Confirm Password</label>
                                <div className="auth-input">
                                    <Lock size={18} />
                                    <input
                                        name="confirmPassword"
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                    >
                                        {showConfirm
                                            ? <EyeOff size={18} />
                                            : <Eye size={18} />}
                                    </button>
                                </div>
                            </>
                        )}

                        {mode === "login" && (
                            <button
                                type="button"
                                className="forgot-password"
                                onClick={() =>
                                    setMessage("Password recovery will be connected later.")
                                }
                            >
                                Forgot Password?
                            </button>
                        )}

                        <label className="terms-row">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />

                            <span>
                                I agree to the <b>User Agreement</b> and
                                <b> Privacy Policy</b>
                            </span>
                        </label>

                        {message && (
                            <p className="auth-message">{message}</p>
                        )}

                        <button type="submit" className="auth-submit">
                            {mode === "login" ? "Sign In" : "Create Account"}
                        </button>

                    </form>

                    {/* Social Login */}
                    <div className="social-divider">
                        <span></span>
                        <p>Sign in with</p>
                        <span></span>
                    </div>

                    <div className="social-buttons">
                        <button type="button" aria-label="Facebook">
                            <span className="facebook-icon">f</span>
                        </button>

                        <button type="button" aria-label="Google">
                            <span className="google-icon">G</span>
                        </button>

                        <button type="button" aria-label="Twitter">
                            <span className="twitter-icon">♥</span>
                        </button>
                    </div>

                    <p className="auth-footer">
                        {mode === "login"
                            ? "Don't have an account?"
                            : "Already have an account?"}

                        <button
                            type="button"
                            onClick={() =>
                                switchMode(mode === "login" ? "signup" : "login")
                            }
                        >
                            {mode === "login" ? "Sign Up" : "Sign In"}
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Auth;
