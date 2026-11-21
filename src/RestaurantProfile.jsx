
import React, { useRef, useState } from "react";
import "./RestaurantProfile.css";
import {
    ArrowLeft, Store, User, Mail, Phone, MapPin,
    Clock, Camera, Plus, Pencil, Trash2, Utensils,
    Leaf, Drumstick, X, Save
} from "lucide-react";

function RestaurantProfile({ onBack }) {
    const [restaurant, setRestaurant] = useState({
        name: "Spice Village",
        owner: "Restaurant Owner",
        email: "spicevillage@gmail.com",
        phone: "+91 98765 43210",
        address: "Chennai, Tamil Nadu",
        hours: "10:00 AM - 10:00 PM",
        description: "Fresh and delicious food for everyone."
    });

    const [restaurantPhoto, setRestaurantPhoto] = useState("");
    const [editingProfile, setEditingProfile] = useState(false);

    const [categories, setCategories] = useState([
        "Burgers", "Pizza", "Biryani", "South Indian", "Snacks", "Drinks"
    ]);

    const [categoryName, setCategoryName] = useState("");
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    const [foods, setFoods] = useState([
        {
            id: 1,
            name: "Chicken Burger",
            category: "Burgers",
            price: 249,
            type: "Non-Veg",
            description: "Delicious chicken burger.",
            photo: "",
            available: true
        },
        {
            id: 2,
            name: "Veg Pizza",
            category: "Pizza",
            price: 399,
            type: "Veg",
            description: "Fresh vegetable pizza.",
            photo: "",
            available: true
        },
        {
            id: 3,
            name: "Paneer Biryani",
            category: "Biryani",
            price: 299,
            type: "Veg",
            description: "Traditional paneer biryani.",
            photo: "",
            available: true
        }
    ]);

    const [showFoodForm, setShowFoodForm] = useState(false);
    const [editingFoodId, setEditingFoodId] = useState(null);
    const [foodForm, setFoodForm] = useState({
        name: "",
        category: "Burgers",
        price: "",
        type: "Veg",
        description: "",
        photo: ""
    });

    const restaurantPhotoRef = useRef(null);
    const foodPhotoRef = useRef(null);

    const readPhoto = (file, callback) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5 MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => callback(reader.result);
        reader.readAsDataURL(file);
    };

    const handleRestaurantPhoto = (e) => {
        readPhoto(e.target.files[0], setRestaurantPhoto);
        e.target.value = "";
    };

    const handleFoodPhoto = (e) => {
        readPhoto(e.target.files[0], photo => {
            setFoodForm(previous => ({ ...previous, photo }));
        });
        e.target.value = "";
    };

    const addCategory = (e) => {
        e.preventDefault();

        const cleaned = categoryName.trim();

        if (!cleaned) return;

        if (categories.some(
            category => category.toLowerCase() === cleaned.toLowerCase()
        )) {
            alert("Category already exists.");
            return;
        }

        setCategories(previous => [...previous, cleaned]);
        setCategoryName("");
        setShowCategoryForm(false);

        setFoodForm(previous => ({ ...previous, category: cleaned }));
    };

    const resetFoodForm = () => {
        setFoodForm({
            name: "",
            category: categories[0] || "",
            price: "",
            type: "Veg",
            description: "",
            photo: ""
        });
        setEditingFoodId(null);
        setShowFoodForm(false);
    };

    const saveFood = (e) => {
        e.preventDefault();

        if (!foodForm.name.trim() || !foodForm.price || Number(foodForm.price) <= 0) {
            alert("Enter a valid food name and price.");
            return;
        }

        if (!foodForm.photo) {
            alert("Please upload a food photo.");
            return;
        }

        const foodData = {
            ...foodForm,
            name: foodForm.name.trim(),
            price: Number(foodForm.price)
        };

        if (editingFoodId !== null) {
            setFoods(previous => previous.map(food =>
                food.id === editingFoodId
                    ? { ...food, ...foodData }
                    : food
            ));
        } else {
            setFoods(previous => [
                ...previous,
                { ...foodData, id: Date.now(), available: true }
            ]);
        }

        resetFoodForm();
    };

    const editFood = (food) => {
        setFoodForm({
            name: food.name,
            category: food.category,
            price: String(food.price),
            type: food.type,
            description: food.description,
            photo: food.photo
        });

        setEditingFoodId(food.id);
        setShowFoodForm(true);
    };

    const deleteFood = (id) => {
        if (window.confirm("Are you sure you want to delete this food?")) {
            setFoods(previous => previous.filter(food => food.id !== id));
        }
    };

    const toggleAvailability = (id) => {
        setFoods(previous => previous.map(food =>
            food.id === id
                ? { ...food, available: !food.available }
                : food
        ));
    };

    return (
        <div className="rp-page">

            {/* Header */}
            <div className="rp-header">
                <button className="rp-back-btn" onClick={onBack}>
                    <ArrowLeft size={20} />
                </button>

                <div>
                    <h2>Restaurant Profile</h2>
                    <p>Manage your restaurant and food menu</p>
                </div>

                <span className="rp-header-label">Owner Panel</span>
            </div>

            {/* Restaurant Profile */}
            <section className="rp-card">
                <div className="rp-section-heading">
                    <div>
                        <h3><Store size={20} /> Restaurant Information</h3>
                        <p>Your restaurant details and contact information</p>
                    </div>

                    <button
                        className="rp-outline-btn"
                        onClick={() => setEditingProfile(!editingProfile)}
                    >
                        <Pencil size={15} />
                        {editingProfile ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                <div className="rp-profile-content">
                    <div className="rp-restaurant-photo">
                        {restaurantPhoto ? (
                            <img src={restaurantPhoto} alt="Restaurant" />
                        ) : (
                            <Store size={45} />
                        )}

                        <button
                            type="button"
                            onClick={() => restaurantPhotoRef.current?.click()}
                            aria-label="Upload restaurant photo"
                        >
                            <Camera size={17} />
                        </button>

                        <input
                            ref={restaurantPhotoRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleRestaurantPhoto}
                        />
                    </div>

                    <div className="rp-restaurant-details">
                        {editingProfile ? (
                            <div className="rp-profile-edit-grid">
                                {Object.entries(restaurant).map(([key, value]) => (
                                    <label key={key}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                        <input
                                            value={value}
                                            onChange={e => setRestaurant(previous => ({
                                                ...previous,
                                                [key]: e.target.value
                                            }))}
                                        />
                                    </label>
                                ))}

                                <button
                                    className="rp-primary-btn"
                                    onClick={() => setEditingProfile(false)}
                                >
                                    <Save size={16} /> Save Profile
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2>{restaurant.name}</h2>
                                <p className="rp-description">{restaurant.description}</p>

                                <div className="rp-info-grid">
                                    <span><User /> {restaurant.owner}</span>
                                    <span><Mail /> {restaurant.email}</span>
                                    <span><Phone /> {restaurant.phone}</span>
                                    <span><MapPin /> {restaurant.address}</span>
                                    <span><Clock /> {restaurant.hours}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="rp-card">
                <div className="rp-section-heading">
                    <div>
                        <h3><Utensils size={20} /> Food Categories</h3>
                        <p>Create and manage your food categories</p>
                    </div>

                    <button
                        className="rp-primary-btn"
                        onClick={() => setShowCategoryForm(!showCategoryForm)}
                    >
                        <Plus size={16} /> Add Category
                    </button>
                </div>

                {showCategoryForm && (
                    <form className="rp-category-form" onSubmit={addCategory}>
                        <input
                            placeholder="Enter category name"
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                            required
                        />
                        <button className="rp-primary-btn" type="submit">Save</button>
                        <button
                            className="rp-cancel-btn"
                            type="button"
                            onClick={() => setShowCategoryForm(false)}
                        >
                            Cancel
                        </button>
                    </form>
                )}

                <div className="rp-category-list">
                    {categories.map(category => (
                        <div className="rp-category-chip" key={category}>
                            <Utensils size={16} />
                            <span>{category}</span>
                            <small>{foods.filter(food => food.category === category).length}</small>
                        </div>
                    ))}
                </div>
            </section>

            {/* Food Menu */}
            <section className="rp-card">
                <div className="rp-section-heading">
                    <div>
                        <h3><Utensils size={20} /> Food Menu</h3>
                        <p>Add food photos, price, category and food type</p>
                    </div>

                    <button
                        className="rp-primary-btn"
                        onClick={() => {
                            if (showFoodForm) {
                                resetFoodForm();
                            } else {
                                setEditingFoodId(null);
                                setFoodForm({
                                    name: "",
                                    category: categories[0] || "",
                                    price: "",
                                    type: "Veg",
                                    description: "",
                                    photo: ""
                                });
                                setShowFoodForm(true);
                            }
                        }}
                    >
                        <Plus size={16} /> Add Food
                    </button>
                </div>

                {showFoodForm && (
                    <form className="rp-food-form" onSubmit={saveFood}>
                        <div className="rp-form-title">
                            <h3>{editingFoodId !== null ? "Edit Food Item" : "Add New Food"}</h3>
                            <button type="button" onClick={resetFoodForm}>
                                <X size={19} />
                            </button>
                        </div>

                        <div className="rp-food-form-grid">
                            <label>
                                Food Name *
                                <input
                                    placeholder="Example: Chicken Burger"
                                    value={foodForm.name}
                                    onChange={e => setFoodForm({
                                        ...foodForm, name: e.target.value
                                    })}
                                    required
                                />
                            </label>

                            <label>
                                Category *
                                <select
                                    value={foodForm.category}
                                    onChange={e => setFoodForm({
                                        ...foodForm, category: e.target.value
                                    })}
                                    required
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Price (₹) *
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Enter price"
                                    value={foodForm.price}
                                    onChange={e => setFoodForm({
                                        ...foodForm, price: e.target.value
                                    })}
                                    required
                                />
                            </label>

                            <label>
                                Food Type *
                                <select
                                    value={foodForm.type}
                                    onChange={e => setFoodForm({
                                        ...foodForm, type: e.target.value
                                    })}
                                >
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                </select>
                            </label>

                            <label className="rp-full-width">
                                Food Description
                                <textarea
                                    placeholder="Describe your food item..."
                                    value={foodForm.description}
                                    onChange={e => setFoodForm({
                                        ...foodForm, description: e.target.value
                                    })}
                                />
                            </label>

                            <div className="rp-photo-upload rp-full-width">
                                <span>Food Photo *</span>

                                <input
                                    ref={foodPhotoRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleFoodPhoto}
                                />

                                <button
                                    type="button"
                                    className="rp-upload-box"
                                    onClick={() => foodPhotoRef.current?.click()}
                                >
                                    {foodForm.photo ? (
                                        <img src={foodForm.photo} alt="Food preview" />
                                    ) : (
                                        <>
                                            <Camera size={28} />
                                            <strong>Upload Food Photo</strong>
                                            <small>JPG, PNG – Max 5 MB</small>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="rp-form-actions">
                            <button className="rp-primary-btn" type="submit">
                                <Save size={16} />
                                {editingFoodId !== null ? "Update Food" : "Save Food"}
                            </button>

                            <button
                                className="rp-cancel-btn"
                                type="button"
                                onClick={resetFoodForm}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Food Cards */}
                <div className="rp-food-grid">
                    {foods.map(food => (
                        <article className="rp-food-card" key={food.id}>
                            <div className="rp-food-image">
                                {food.photo ? (
                                    <img src={food.photo} alt={food.name} />
                                ) : (
                                    <div className="rp-no-photo">
                                        <Utensils size={35} />
                                        <span>Sample Food Photo</span>
                                    </div>
                                )}

                                <span className={`rp-food-type ${food.type === "Veg" ? "veg" : "nonveg"}`}>
                                    <span />
                                    {food.type}
                                </span>
                            </div>

                            <div className="rp-food-card-content">
                                <small className="rp-food-category">{food.category}</small>
                                <h4>{food.name}</h4>
                                <p>{food.description}</p>

                                <div className="rp-food-price-row">
                                    <strong>₹{food.price}</strong>
                                    <label className="rp-available-toggle">
                                        <input
                                            type="checkbox"
                                            checked={food.available}
                                            onChange={() => toggleAvailability(food.id)}
                                        />
                                        {food.available ? "Available" : "Unavailable"}
                                    </label>
                                </div>

                                <div className="rp-food-actions">
                                    <button onClick={() => editFood(food)}>
                                        <Pencil size={15} /> Edit
                                    </button>
                                    <button onClick={() => deleteFood(food.id)}>
                                        <Trash2 size={15} /> Delete
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {foods.length === 0 && (
                    <div className="rp-empty">
                        <Utensils size={35} />
                        <p>No food items added yet.</p>
                    </div>
                )}
            </section>

            <p className="rp-footer">CARVING-CATCH Restaurant Management</p>
        </div>
    );
}

export default RestaurantProfile;
