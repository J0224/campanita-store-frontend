// Header.tsx
import React, { useState, ChangeEvent, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./header.css";
import MenuIcon from "../menu/menu";
import { useAuth } from "../auth/authProvider";

interface HeaderProps {
  onSelectedCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSelectedCategory }) => {
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoggedInLocal, setLoggedInLocal] = useState<boolean>(false);
  const [userFirstNameLocal, setUserFirstNameLocal] = useState<string | null>(
    null
  );

  const { isLoggedIn, logout, userFirstName } = useAuth();

  useEffect(() => {
    setLoggedInLocal(isLoggedIn);
    setUserFirstNameLocal(userFirstName);
  }, [isLoggedIn, userFirstName]);

  console.log("Is Logged In:", isLoggedInLocal);
  console.log("This is the userFirstName:", userFirstNameLocal);
  console.log("This is the :");

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedCategory(value);
    onSelectedCategory(value);

    if (value && value === "All-Category") {
      history.push("/products");
    } else {
      // Navigate to the selected category page
      history.push(`/by-category/${value}`);
    }
  };

  const handleLogout = () => {
    logout();
    // Redirect to login page after logout
    history.push("/login");
  };

  return (
    <header className="header">
      <div className="header-content">
        <MenuIcon
          selectedCategory={selectedCategory}
          categories={[
            "New-Arrival",
            "What-Customer-Love",
            "Deal-of-Week",
            "Shoes",
            "pants",
            "Snikers",
            "t-shirt",
            "Shirt",
            "Shorts",
          ]}
          toggleDropdown={() => {}}
          onSelectedCategory={onSelectedCategory}
        />

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </nav>

        {isLoggedIn ? (
          <div className="user-info">
            <span className="first-name-span">Hello, {userFirstName}!</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="logged-out-links">
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Login</Link>
          </div>
        )}

        <input
          type="text"
          className="search"
          placeholder="Search Products..."
        />

        <div className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="blue"
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </svg>
        </div>

        <button type="submit">Search</button>
      </div>
    </header>
  );
};

export default Header;
