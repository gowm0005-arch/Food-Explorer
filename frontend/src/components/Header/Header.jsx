import React, { useState, useEffect } from "react";
import "./Header.css";

const slides = [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600",
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1600",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=1600",
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1600",
];

const Header = ({ onRestaurantsClick }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider">
            <img src={slides[current]} alt="Food" />

            <div className="overlay"></div>

            <div className="slider-content">
                <h1>Order your favourite food here</h1>

                <p>
                    Choose from a diverse menu featuring a delectable array of dishes
                    crafted with the finest ingredients and culinary expertise.
                </p>

                <div className="header-actions">
                    <button
                        onClick={() =>
                            document
                                .getElementById("explore-menu")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        View Menu
                    </button>

                    <button
                        className="header-outline-btn"
                        onClick={onRestaurantsClick}
                    >
                        View Restaurants
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;