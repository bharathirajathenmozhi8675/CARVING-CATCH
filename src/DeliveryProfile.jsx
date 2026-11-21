
import React, { useRef, useState } from "react";
import "./DeliveryProfile.css";
import {
    User, Mail, Phone, MapPin, Camera, Pencil, Save,
    Bike, FileText, CreditCard, ShieldCheck, Upload
} from "lucide-react";

function DeliveryProfile() {
    const [profile, setProfile] = useState({
        name: "Arun Kumar",
        email: "arunkumar@gmail.com",
        phone: "+91 98765 43210",
        address: "Chennai, Tamil Nadu",
        partnerId: "DP1001",
        vehicle: "Honda Activa",
        vehicleNumber: "TN 09 AB 1234",
        licenseNumber: "TN0120200012345",
        bankName: "State Bank of India",
        accountHolder: "Arun Kumar",
        accountNumber: "XXXX XXXX 1234",
        ifsc: "SBIN0001234"
    });

    const [photo, setPhoto] = useState("");
    const [editing, setEditing] = useState(false);
    const [online, setOnline] = useState(true);
    const [documents, setDocuments] = useState({
        license: "",
        aadhaar: "",
        rc: ""
    });

    const photoRef = useRef(null);
    const documentRefs = {
        license: useRef(null),
        aadhaar: useRef(null),
        rc: useRef(null)
    };

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image must be below 5 MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => setPhoto(reader.result);
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const handleDocument = (e, key) => {
        const file = e.target.files[0];
        if (!file) return;

        setDocuments(previous => ({
            ...previous,
            [key]: file.name
        }));

        e.target.value = "";
    };

    const updateField = (key, value) => {
        setProfile(previous => ({
            ...previous,
            [key]: value
        }));
    };

    const renderField = (label, key, icon, type = "text") => {
        const Icon = icon;

        return (
            <label className="dp-profile-field" key={key}>
                <span>{label}</span>
                <div className="dp-profile-input">
                    <Icon size={17} />
                    <input
                        type={type}
                        value={profile[key]}
                        readOnly={!editing}
                        onChange={e => updateField(key, e.target.value)}
                    />
                </div>
            </label>
        );
    };

    const documentCard = (title, key) => (
        <div className="dp-document-card" key={key}>
            <div className="dp-document-icon">
                <FileText size={23} />
            </div>

            <div className="dp-document-info">
                <strong>{title}</strong>
                <small>
                    {documents[key] || "No document uploaded"}
                </small>
                {documents[key] && (
                    <span className="dp-document-status">
                        <ShieldCheck size={14} /> Uploaded
                    </span>
                )}
            </div>

            <input
                type="file"
                accept="image/*,.pdf"
                hidden
                ref={documentRefs[key]}
                onChange={e => handleDocument(e, key)}
            />

            <button
                className="dp-document-upload"
                type="button"
                onClick={() => documentRefs[key].current?.click()}
            >
                <Upload size={16} />
                Upload
            </button>
        </div>
    );

    return (
        <div className="dp-profile-page">

            <div className="dp-profile-heading">
                <div>
                    <h2>My Profile</h2>
                    <p>Manage your personal and delivery information</p>
                </div>

                <button
                    className="dp-profile-edit-btn"
                    onClick={() => setEditing(!editing)}
                >
                    <Pencil size={16} />
                    {editing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            {/* Personal Information */}
            <section className="dp-profile-card">
                <div className="dp-profile-section-title">
                    <User size={20} />
                    <div>
                        <h3>Personal Information</h3>
                        <p>Your personal and contact details</p>
                    </div>
                </div>

                <div className="dp-profile-person">
                    <div className="dp-profile-photo">
                        {photo ? (
                            <img src={photo} alt="Delivery Partner" />
                        ) : (
                            <User size={45} />
                        )}

                        <button
                            type="button"
                            onClick={() => photoRef.current?.click()}
                        >
                            <Camera size={16} />
                        </button>

                        <input
                            ref={photoRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handlePhoto}
                        />
                    </div>

                    <div>
                        <h3>{profile.name}</h3>
                        <p>Delivery Partner · {profile.partnerId}</p>
                        <span className={online ? "dp-profile-online" : "dp-profile-offline"}>
                            {online ? "Online" : "Offline"}
                        </span>
                    </div>
                </div>

                <div className="dp-profile-grid">
                    {renderField("Full Name", "name", User)}
                    {renderField("Email Address", "email", Mail, "email")}
                    {renderField("Mobile Number", "phone", Phone)}
                    {renderField("Address", "address", MapPin)}
                </div>
            </section>

            {/* Vehicle Information */}
            <section className="dp-profile-card">
                <div className="dp-profile-section-title">
                    <Bike size={20} />
                    <div>
                        <h3>Vehicle Information</h3>
                        <p>Your registered delivery vehicle details</p>
                    </div>
                </div>

                <div className="dp-profile-grid">
                    {renderField("Vehicle Model", "vehicle", Bike)}
                    {renderField("Vehicle Number", "vehicleNumber", Bike)}
                    {renderField("Driving Licence Number", "licenseNumber", FileText)}
                </div>
            </section>

            {/* Documents */}
            <section className="dp-profile-card">
                <div className="dp-profile-section-title">
                    <FileText size={20} />
                    <div>
                        <h3>Documents</h3>
                        <p>Upload your verification documents</p>
                    </div>
                </div>

                <div className="dp-document-list">
                    {documentCard("Driving Licence", "license")}
                    {documentCard("Aadhaar Card", "aadhaar")}
                    {documentCard("Vehicle RC Book", "rc")}
                </div>
                <small className="dp-document-note">
                    Accepted formats: JPG, PNG and PDF.
                </small>
            </section>

            {/* Bank Details */}
            <section className="dp-profile-card">
                <div className="dp-profile-section-title">
                    <CreditCard size={20} />
                    <div>
                        <h3>Bank Account Details</h3>
                        <p>Payment and earnings account information</p>
                    </div>
                </div>

                <div className="dp-profile-grid">
                    {renderField("Account Holder Name", "accountHolder", User)}
                    {renderField("Bank Name", "bankName", CreditCard)}
                    {renderField("Account Number", "accountNumber", CreditCard)}
                    {renderField("IFSC Code", "ifsc", FileText)}
                </div>
            </section>

            {/* Availability */}
            <section className="dp-profile-card dp-availability-card">
                <div className="dp-profile-section-title">
                    <ShieldCheck size={20} />
                    <div>
                        <h3>Delivery Availability</h3>
                        <p>Control your delivery partner status</p>
                    </div>
                </div>

                <div className="dp-availability-row">
                    <div>
                        <strong>{online ? "You are Online" : "You are Offline"}</strong>
                        <p>
                            {online
                                ? "You can receive new delivery orders."
                                : "You will not receive new delivery orders."}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={`dp-availability-toggle ${online ? "active" : ""}`}
                        onClick={() => setOnline(!online)}
                        aria-label="Toggle delivery availability"
                    >
                        <span />
                    </button>
                </div>
            </section>

            {editing && (
                <div className="dp-profile-save-row">
                    <button
                        className="dp-profile-save-btn"
                        onClick={() => {
                            setEditing(false);
                            alert("Profile updated successfully!");
                        }}
                    >
                        <Save size={17} /> Save Changes
                    </button>
                </div>
            )}

            <p className="dp-profile-footer">
                CARVING-CATCH · Delivery Partner Profile
            </p>
        </div>
    );
}

export default DeliveryProfile;
